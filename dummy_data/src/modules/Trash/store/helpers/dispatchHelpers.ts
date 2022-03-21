import { Store } from 'vuex'
import { TrashStateInterface } from '../state'
import TrashDocument from '../../models/Inputs/TrashDocument'
import Paginator from '@/Common/models/List/Paginator'
import { trashModule } from '@/modules/Trash/store'
import RootStateInterface from '@/store/types/rootState'
import TrashDocumentsPaginator from '@/modules/Trash/models/Query/TrashDocumentsPaginator'
import { INotificationComponent } from '@/Common/helpers/NotificationComponent'

const fetchTrashDocuments = async (store: Store<RootStateInterface>) => {
  await store.dispatch(trashModule('fetchTrashDocuments'))
}

const fetchAndPushTrashDocuments = (store: Store<RootStateInterface>): void => {
  store.dispatch(trashModule('fetchAndPushTrashDocuments'))
}

const fetchTrashDocumentsTotalCount = (
  store: Store<RootStateInterface>
): void => {
  store.dispatch(trashModule('fetchTrashDocumentsTotalCount'))
}

const removeFromPendingList = (
  store: Store<RootStateInterface>,
  documentId: string
): void => {
  store.dispatch(trashModule('removeFromPendingList'), documentId)
}

const setTrashPaginator = (
  store: Store<RootStateInterface>,
  paginator: TrashDocumentsPaginator
): void => {
  store.dispatch(trashModule('setTrashPaginator'), paginator)
}

const setPage = (
  store: Store<RootStateInterface>,
  pageNumber: number
): void => {
  const newPaginator = new TrashDocumentsPaginator({
    pageNumber,
    totalItems: store.getters[trashModule('paginator')].totalItems,
    itemsPerPage: store.getters[trashModule('paginator')].itemsPerPage
  })

  setTrashPaginator(store, newPaginator)
}

const flushTrashDocumentsPromises = async (
  store: Store<RootStateInterface>
) => {
  const promises = [fetchTrashDocuments(store)]

  await Promise.all(promises)
}
const setRestoreNotification = (
  store: Store<TrashStateInterface>,
  notification: any
): void => {
  store.dispatch(trashModule('setRestoreNotification'), notification)
}

const closeRestoreNotification = (store: Store<TrashStateInterface>): void => {
  store.dispatch(trashModule('closeRestoreNotification'))
}

const cancelFilesRestore = (store: Store<TrashStateInterface>): void => {
  store.dispatch(trashModule('cancelFilesRestore'))
}

const restoreFileByModal = async (
  store: Store<RootStateInterface>,
  documentId: string
) => {
  await store.dispatch(trashModule('restoreFileByModal'), documentId)
}

const pushInPendingList = (
  store: Store<TrashStateInterface>,
  document: TrashDocument
) => {
  store.dispatch(trashModule('pushInRestorePendingList'), document)
}

const setPendingListDocumentStatus = (
  store: Store<TrashStateInterface>,
  documentId: string,
  status: string
) => {
  store.dispatch(trashModule('setPendingListDocumentStatus'), {
    documentId,
    status
  })
}

const dispatchHelpers = (
  store: Store<RootStateInterface>
): dispatchHelpersType => ({
  fetchTrashDocuments: () => fetchTrashDocuments(store),
  fetchAndPushTrashDocuments: () => fetchAndPushTrashDocuments(store),
  fetchTrashDocumentsTotalCount: () => fetchTrashDocumentsTotalCount(store),
  setTrashPaginator: (paginator: TrashDocumentsPaginator) =>
    setTrashPaginator(store, paginator),
  flushTrashDocumentsPromises: () => flushTrashDocumentsPromises(store),
  setPage: (pageNumber: number) => setPage(store, pageNumber),
  restoreFileByModal: (documentId: string) =>
    restoreFileByModal(store, documentId),
  setRestoreNotification,
  closeRestoreNotification,
  cancelFilesRestore,
  pushInPendingList,
  setPendingListDocumentStatus,
  removeFromPendingList: (documentId) =>
    removeFromPendingList(store, documentId)
})

export type dispatchHelpersType = {
  fetchTrashDocuments: () => void
  fetchAndPushTrashDocuments: () => void
  fetchTrashDocumentsTotalCount: () => void
  setTrashPaginator: (filters: Paginator) => void
  flushTrashDocumentsPromises: () => void
  setPage: (pageNumber: number) => void
  setRestoreNotification: (
    store: Store<TrashStateInterface>,
    notification: INotificationComponent
  ) => void
  closeRestoreNotification: (store: Store<TrashStateInterface>) => void
  cancelFilesRestore: (store: Store<TrashStateInterface>) => void
  restoreFileByModal: (documentId: string) => void
  pushInPendingList: (
    store: Store<TrashStateInterface>,
    document: TrashDocument
  ) => void
  setPendingListDocumentStatus: (
    store: Store<TrashStateInterface>,
    documentId: string,
    status: string
  ) => void
  removeFromPendingList: (documentId: string) => void
}

export default dispatchHelpers
