import DocumentServices from '@/modules/Search/services'
import Documents from '@/modules/Search/models/Documents/Inputs/Documents'
import Document from '@/modules/Search/models/Documents/Inputs/Document'
import DocumentsQuery from '@/modules/Search/models/Documents/Query/DocumentsQuery'
import { SearchStateInterface } from '@/modules/Search/store/types'
import { ActionContext } from 'vuex'
import RootSearchStateInterface from '@/store/types/rootState'
import {
  PUSH_DOCUMENTS,
  SET_VISUALIZATION,
  SET_DOCUMENTS,
  SET_DOCUMENTS_TOTAL_COUNT,
  SET_FILTERS,
  SET_IS_DOWNLOADING,
  SET_MULTIPLE_DOWNLOAD_LOADING,
  SET_PAGINATOR,
  SET_PREVIEW,
  SET_PREVIEW_LOADING,
  SET_SORT_OPTIONS
} from '@/modules/Search/store/mutations'
import Account from '@/modules/Account/models/Account'
import DownloadQuery from '@/modules/Search/models/Documents/Query/DownloadQuery'
import DocumentsFilters from '@/modules/Search/models/Documents/Query/DocumentsFilters'
import useDownload from '@/Common/hooks/useDownload'
import DocumentsPaginator from '@/modules/Search/models/Documents/Query/DocumentsPaginator'
import DocumentsSortOptions from '@/modules/Search/models/Documents/Query/DocumentsSortOptions'
import { axios } from '@kpmg/mypulse-shared-dependencies'
import { createBase64Image } from '@/Common/helpers/file'
import PatchQuery from '@/modules/Search/models/Documents/Query/PatchQuery'
import PatchCommentQuery from '@/modules/Search/models/Documents/Query/PatchCommentQuery'

const fetchDocuments = async (
  {
    commit,
    dispatch,
    state: { paginator, filters, sortOptions },
    rootState
  }: Omit<
    ActionContext<SearchStateInterface, RootSearchStateInterface>,
    'getters' | 'rootGetters'
  >,
  cleanDocuments = true
): Promise<void> => {
  const cancelToken = axios.CancelToken.source()

  if (cleanDocuments) {
    commit(SET_DOCUMENTS, Documents.loading(cancelToken))
  } else {
    commit(PUSH_DOCUMENTS, Documents.loading(cancelToken))
  }

  try {
    const documentsQuery = new DocumentsQuery({
      account: new Account({ id: rootState.app.account.AccountId }),
      filters,
      sortOptions,
      paginator
    })

    const { data, headers } = await DocumentServices.fetchDocuments(
      documentsQuery.transformForAPI(),
      cancelToken
    )

    const total = headers['content-range'].split(/\//)[1]

    paginator.setTotalItems(total)
    await dispatch('setPaginator', paginator)
    if (cleanDocuments) {
      commit(SET_DOCUMENTS, Documents.loaded(data))
    } else {
      commit(PUSH_DOCUMENTS, Documents.loaded(data))
    }
  } catch (e) {
    if (e.message) {
      commit(SET_DOCUMENTS, Documents.errored())
    }
  }
}

const fetchAndPushDocuments = ({
  dispatch
}: Omit<
  ActionContext<SearchStateInterface, RootSearchStateInterface>,
  'getters' | 'rootGetters' | 'commit' | 'rootState' | 'state'
>): void => {
  dispatch('fetchDocuments', false)
}

const fetchDocumentsTotalCount = async ({
  commit,
  rootState,
  state
}: Omit<
  ActionContext<SearchStateInterface, RootSearchStateInterface>,
  'getters' | 'rootGetters'
>): Promise<void> => {
  const documentsQuery = new DocumentsQuery({
    account: new Account({ id: rootState.app.account.AccountId }),
    filters: DocumentsFilters.TotalFilters(
      state.filters.search,
      state.filters.period
    ),
    sortOptions: new DocumentsSortOptions({
      sortBy: 'updated',
      sortDirection: 'descending'
    }),
    paginator: new DocumentsPaginator({
      itemsPerPage: 1,
      pageNumber: 1,
      totalItems: 1
    })
  })

  const { headers } = await DocumentServices.fetchDocuments(
    documentsQuery.transformForAPI()
  )

  const total = headers['content-range'].split(/\//)[1]

  commit(SET_DOCUMENTS_TOTAL_COUNT, Number(total))
}

const setFilters = (
  {
    commit
  }: Omit<
    ActionContext<SearchStateInterface, RootSearchStateInterface>,
    'dispatch' | 'getters' | 'rootGetters' | 'rootState'
  >,
  filters: DocumentsFilters
): void => {
  commit(SET_FILTERS, filters)
}

const downloadPreview = async (
  {
    commit,
    rootState
  }: Omit<
    ActionContext<SearchStateInterface, RootSearchStateInterface>,
    'dispatch' | 'getters' | 'rootGetters' | 'state'
  >,
  documentId: string
): Promise<void> => {
  try {
    commit(SET_PREVIEW_LOADING, true)

    const response = await DocumentServices.downloadPreview(
      new DownloadQuery({
        documentId,
        accountId: rootState.app.account.AccountId
      })
    )

    commit(SET_PREVIEW, createBase64Image(response))
  } catch (e) {
    commit(SET_PREVIEW, null)
  } finally {
    commit(SET_PREVIEW_LOADING, false)
  }
}

const setPaginator = (
  {
    commit
  }: Omit<
    ActionContext<SearchStateInterface, RootSearchStateInterface>,
    'state' | 'rootState' | 'dispatch' | 'getters' | 'rootGetters'
  >,
  paginatorNewValue: DocumentsPaginator
): void => {
  commit(SET_PAGINATOR, paginatorNewValue)
}

const setSortOptions = (
  {
    commit
  }: Omit<
    ActionContext<SearchStateInterface, RootSearchStateInterface>,
    'state' | 'rootState' | 'dispatch' | 'getters' | 'rootGetters'
  >,
  documentsSortOptions: DocumentsSortOptions
): void => {
  commit(SET_SORT_OPTIONS, documentsSortOptions)
}

const downloadVisualization = async (
  {
    rootState,
    commit
  }: Omit<
    ActionContext<SearchStateInterface, RootSearchStateInterface>,
    'dispatch' | 'rootGetters' | 'getters'
  >,
  documentId: string
): Promise<void> => {
  try {
    commit(SET_IS_DOWNLOADING, true)
    const { data } = await DocumentServices.downloadDocument(
      new DownloadQuery({
        documentId,
        accountId: rootState.app.account.AccountId
      })
    )

    commit(SET_VISUALIZATION, data)
  } finally {
    commit(SET_IS_DOWNLOADING, false)
  }
}

const resetVisualization = async ({
  commit
}: Omit<
  ActionContext<SearchStateInterface, RootSearchStateInterface>,
  'dispatch' | 'rootGetters' | 'getters'
>): Promise<void> => {
  commit(SET_VISUALIZATION, new Blob([]))
}

const downloadDocument = async (
  {
    rootState,
    state,
    commit
  }: Omit<
    ActionContext<SearchStateInterface, RootSearchStateInterface>,
    'dispatch' | 'rootGetters' | 'getters'
  >,
  {
    documentId,
    callDownloadService
  }: { documentId: string; callDownloadService?: boolean }
): Promise<void> => {
  try {
    commit(SET_IS_DOWNLOADING, true)

    const document: Document | undefined = state.documents.collection.find(
      (document: Document) => document.id === documentId
    )

    let data = state.visualization

    if (callDownloadService) {
      const response = await DocumentServices.downloadDocument(
        new DownloadQuery({
          documentId,
          accountId: rootState.app.account.AccountId
        })
      )

      data = response.data
    }

    const { downloadFile } = useDownload()

    if (document) {
      downloadFile({ data, fileName: document.name })
    }
  } finally {
    commit(SET_IS_DOWNLOADING, false)
  }
}

const downloadDocuments = async (
  {
    rootState,
    commit
  }: Omit<
    ActionContext<SearchStateInterface, RootSearchStateInterface>,
    'dispatch' | 'rootGetters' | 'getters' | 'state'
  >,
  documentIds: string[]
): Promise<void> => {
  try {
    commit(SET_MULTIPLE_DOWNLOAD_LOADING, true)

    await DocumentServices.downloadDocuments(
      rootState.app.account.AccountId,
      documentIds
    )
  } finally {
    commit(SET_MULTIPLE_DOWNLOAD_LOADING, false)
  }
}

const patchDocumentComment = async (
  {
    rootState,
    commit
  }: Omit<
    ActionContext<SearchStateInterface, RootSearchStateInterface>,
    'dispatch' | 'rootGetters' | 'getters' | 'state'
  >,
  query: PatchCommentQuery
): Promise<void> => {
  await DocumentServices.patchDocument(
    new PatchQuery({
      accountId: rootState.app.account.AccountId,
      documentId: query.documentId,
      operation: 'replace',
      path: '/comments',
      value: query.value
    })
  )
  commit('SET_DOCUMENT_COMMENT', {
    documentId: query.documentId,
    comment: query.value
  })
}

export default {
  setFilters,
  setPaginator,
  setSortOptions,
  downloadDocument,
  fetchDocuments,
  fetchAndPushDocuments,
  fetchDocumentsTotalCount,
  downloadPreview,
  patchDocumentComment,
  downloadDocuments,
  downloadVisualization,
  resetVisualization
}
