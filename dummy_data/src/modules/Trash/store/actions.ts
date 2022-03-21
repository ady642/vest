import { ActionContext } from 'vuex'
import RootStateInterface from '@/store/types/rootState'
import { TrashStateInterface } from './state'
import TrashServices from '@/modules/Trash/services'
import TrashDocumentsQuery from '../models/Query/TrashDocumentsQueryAPI'
import TrashDocuments from '../models/Inputs/TrashDocuments'
import {
  SET_IS_FILE_RESTORING,
  SET_TRASH_DOCUMENTS,
  SET_TRASH_DOCUMENTS_TOTAL_COUNT,
  SET_TRASH_PAGINATOR,
  SET_DOCUMENT_STATUS,
  REMOVE_DOCUMENT_IN_PENDING_LIST
} from './mutations'
import TrashDocumentsPaginator from '../models/Query/TrashDocumentsPaginator'
import TrashSortOptions from '../models/Query/TrashSortOptions'
import TrashDocument from '../models/Inputs/TrashDocument'
import { INotificationComponent } from '@/Common/helpers/NotificationComponent'
import RootSearchStateInterface from '@/store/types/rootState'
import { searchModule } from '@/modules/Search/store'
import constants from '@/Common/constants'
import useRestoreNotificationHelper from '@/modules/Trash/helpers/RestoreNotificationHelper'
import { axios } from '@kpmg/mypulse-shared-dependencies'
import useSearchNavigator from '@/modules/Search/navigator/useSearchNavigator'

const fetchTrashDocuments = async ({
  commit,
  dispatch,
  state: { paginator, sortOptions },
  rootState
}: Omit<
  ActionContext<TrashStateInterface, RootStateInterface>,
  'getters' | 'rootGetters'
>): Promise<void> => {
  const cancelToken = axios.CancelToken.source()

  commit(SET_TRASH_DOCUMENTS, TrashDocuments.loading(cancelToken))

  try {
    const documentsQuery = new TrashDocumentsQuery({
      paginator,
      sortOptions
    })

    const { data, headers } = await TrashServices.fetchTrashDocuments(
      rootState.app.account.AccountId,
      documentsQuery.transformForAPI(),
      cancelToken
    )

    const total = headers['content-range'].split(/\//)[1]

    paginator.setTotalItems(total)
    await dispatch('setTrashPaginator', paginator)
    commit(SET_TRASH_DOCUMENTS, TrashDocuments.loaded(data))
  } catch (e) {
    if (e.message) {
      commit(SET_TRASH_DOCUMENTS, TrashDocuments.errored())
    }
  }
}

const fetchTrashDocumentsTotalCount = async ({
  commit,
  rootState
}: Omit<
  ActionContext<TrashStateInterface, RootStateInterface>,
  'getters' | 'rootGetters' | 'dispatch' | 'state'
>): Promise<void> => {
  try {
    commit('SET_TOTAL_LOADING', true)
    const documentsQuery = new TrashDocumentsQuery({
      paginator: new TrashDocumentsPaginator({
        itemsPerPage: 1,
        pageNumber: 1,
        totalItems: 1
      }),
      sortOptions: new TrashSortOptions()
    })
    const { headers } = await TrashServices.fetchTrashDocuments(
      rootState.app.account.AccountId,
      documentsQuery.transformForAPI()
    )
    const total = headers['content-range'].split(/\//)[1]

    commit(SET_TRASH_DOCUMENTS_TOTAL_COUNT, Number(total))
  } catch (e) {
    throw new Error(e)
  } finally {
    commit('SET_TOTAL_LOADING', false)
  }
}

const setTrashPaginator = (
  {
    commit
  }: Omit<
    ActionContext<TrashStateInterface, RootStateInterface>,
    'state' | 'rootState' | 'dispatch' | 'getters' | 'rootGetters'
  >,
  paginatorNewValue: TrashDocumentsPaginator
): void => {
  commit(SET_TRASH_PAGINATOR, paginatorNewValue)
}

const setRestoreNotification = (
  {
    state
  }: Omit<
    ActionContext<TrashStateInterface, RootStateInterface>,
    'getters' | 'rootGetters'
  >,
  notification: INotificationComponent
) => {
  state.restoreNotification = notification
}

const closeRestoreNotification = ({
  state
}: Omit<
  ActionContext<TrashStateInterface, RootStateInterface>,
  'getters' | 'rootGetters'
>) => {
  if (state.restoreNotification.close) state.restoreNotification.close()
}

const restoreFileByModal = async (
  {
    state,
    commit,
    dispatch,
    rootState
  }: Omit<
    ActionContext<TrashStateInterface, RootSearchStateInterface>,
    'rootGetters' | 'getters'
  >,
  documentId: string
): Promise<void> => {
  try {
    while (state.documents.isLoading) {
      await new Promise((resolve) => setTimeout(resolve, 500))
    }

    commit(SET_IS_FILE_RESTORING, true)
    const document = state.documents.collection.find(
      (documents) => documents.id === documentId
    )

    await dispatch('pushInRestorePendingList', document)

    const {
      getPendingRestoreNotification,
      getSuccessRestoreNotification,
      getFailedRestoreNotification
    } = useRestoreNotificationHelper()

    let folderId = 0

    const { goToArboView } = useSearchNavigator()

    if (!state.restoreNotification.close) {
      state.restoreNotification = getPendingRestoreNotification(
        state.pendingList,
        document as TrashDocument,
        () => {
          goToArboView({ folderId })
        },
        () => {
          dispatch('closeRestoreNotification')
        }
      )
    }
    try {
      const restoredDocument = (
        await TrashServices.restoreFile(
          rootState.app.account.AccountId,
          documentId
        )
      ).data[0] as TrashDocument

      folderId = restoredDocument.folderId

      if (state.pendingList.collection.length === 1) {
        if (state.restoreNotification.close) {
          state.restoreNotification.close()
          state.restoreNotification = {} as INotificationComponent
        }
      }

      const success = getSuccessRestoreNotification(
        state.pendingList,
        document as TrashDocument,
        () => goToArboView({ folderId }),
        () => {
          success.close()
        }
      )

      await dispatch(searchModule('fetchFolders'), null, { root: true })
      commit(REMOVE_DOCUMENT_IN_PENDING_LIST, documentId)
    } catch (x) {
      await dispatch('setPendingListDocumentStatus', {
        documentId: documentId,
        status: constants.RESTORE_FAILED
      })
      const failed = getFailedRestoreNotification(
        state.pendingList,
        document as TrashDocument,
        () => goToArboView({ folderId }),
        () => {
          failed.close()
        }
      )
    }
  } finally {
    commit(SET_IS_FILE_RESTORING, false)
  }
}

const pushInRestorePendingList = (
  {
    state,
    commit
  }: Omit<
    ActionContext<TrashStateInterface, RootStateInterface>,
    'getters' | 'rootGetters' | 'dispatch' | 'rootState'
  >,
  document: TrashDocument
): void => {
  if (!state.pendingList.collection.find((x) => x.id === document.id))
    state.pendingList.collection.push(document)

  commit(SET_DOCUMENT_STATUS, {
    status: constants.RESTORE_IN_PROGRESS,
    documentId: document.id
  })
}

const removeFromPendingList = (
  {
    commit
  }: Omit<
    ActionContext<TrashStateInterface, RootStateInterface>,
    'getters' | 'rootGetters' | 'dispatch' | 'rootState' | 'state'
  >,
  documentId: string
): void => {
  commit(REMOVE_DOCUMENT_IN_PENDING_LIST, documentId)
}

const setPendingListDocumentStatus = (
  {
    state,
    commit
  }: Omit<
    ActionContext<TrashStateInterface, RootStateInterface>,
    'getters' | 'rootGetters' | 'dispatch' | 'rootState'
  >,
  documentId: string,
  status: string
): void => {
  if (state.pendingList.collection.find((x) => x.id === documentId))
    commit(SET_DOCUMENT_STATUS, {
      status: status,
      documentId: documentId
    })
}

export default {
  fetchTrashDocuments,
  fetchTrashDocumentsTotalCount,
  setTrashPaginator,
  setRestoreNotification,
  closeRestoreNotification,
  restoreFileByModal,
  pushInRestorePendingList,
  setPendingListDocumentStatus,
  removeFromPendingList
}
