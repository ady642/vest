import { Store } from 'vuex'
import Folder from '@/modules/Search/models/Folders/Inputs/Folder'
import Paginator from '@/Common/models/List/Paginator'
import { searchModule } from '@/modules/Search/store'
import DocumentsFilters from '@/modules/Search/models/Documents/Query/DocumentsFilters'
import DocumentsPaginator from '@/modules/Search/models/Documents/Query/DocumentsPaginator'
import RootStateInterface from '@/store/types/rootState'
import Period from '@/Common/models/List/Period'
import DocumentsSortOptions from '@/modules/Search/models/Documents/Query/DocumentsSortOptions'
import PatchCommentQuery from '@/modules/Search/models/Documents/Query/PatchCommentQuery'

const fetchDocuments = async (
  store: Store<RootStateInterface>
): Promise<void> => {
  await store.dispatch(searchModule('fetchDocuments'))
}

const fetchAndPushDocuments = async (store: Store<RootStateInterface>) => {
  await store.dispatch(searchModule('fetchAndPushDocuments'))
}

const fetchDocumentsTotalCount = (store: Store<RootStateInterface>): void => {
  store.dispatch(searchModule('fetchDocumentsTotalCount'))
}

const setFilters = async (
  store: Store<RootStateInterface>,
  filters: DocumentsFilters
) => {
  await store.dispatch(searchModule('setFilters'), filters)
}

const resetFilters = (store: Store<RootStateInterface>) =>
  setFilters(
    store,
    new DocumentsFilters({
      search: '',
      folderId: store.state.GED.Search.filters.folderId,
      findInChildFolders: false,
      period: new Period(),
      certified: 'all'
    })
  )

const setSearchFolderId = (
  store: Store<RootStateInterface>,
  {
    searchFolderId,
    findInChildFolders
  }: { searchFolderId: number; findInChildFolders?: boolean }
) => {
  const newFilters = new DocumentsFilters({
    ...store.state.GED.Search.filters,
    folderId: searchFolderId,
    findInChildFolders:
      findInChildFolders ?? store.state.GED.Search.filters.findInChildFolders
  })

  setFilters(store, newFilters)
}

const setSearch = (store: Store<RootStateInterface>, search: string) => {
  const newFilters = new DocumentsFilters({
    ...store.state.GED.Search.filters,
    search
  })

  setFilters(store, newFilters)
}

const setPeriod = (store: Store<RootStateInterface>, period: Period) => {
  const newFilters = new DocumentsFilters({
    ...store.state.GED.Search.filters,
    period
  })

  setFilters(store, newFilters)
}

const setCertified = async (
  store: Store<RootStateInterface>,
  certified: 'all' | boolean
) => {
  const newFilters = new DocumentsFilters(store.state.GED.Search.filters)

  newFilters.certified = certified

  await setFilters(store, newFilters)
}

const setPaginator = (
  store: Store<RootStateInterface>,
  paginator: DocumentsPaginator
): void => {
  store.dispatch(searchModule('setPaginator'), paginator)
}

const setSortOptions = (
  store: Store<RootStateInterface>,
  sortOptions: DocumentsSortOptions
): void => {
  store.dispatch(searchModule('setSortOptions'), sortOptions)
}

const setPage = (
  store: Store<RootStateInterface>,
  pageNumber: number
): void => {
  const newPaginator = new DocumentsPaginator({
    pageNumber,
    totalItems: store.getters[searchModule('paginator')].totalItems,
    itemsPerPage: store.getters[searchModule('paginator')].itemsPerPage
  })

  setPaginator(store, newPaginator)
}

const fetchFolders = (store: Store<RootStateInterface>): void => {
  store.dispatch(searchModule('fetchFolders'))
}

const pushFolder = (store: Store<RootStateInterface>, folder: Folder): void => {
  store.dispatch(searchModule('pushFolder'), folder)
}

const dispatchDownloadDocument = async (
  store: Store<RootStateInterface>,
  documentId: string,
  callDownloadService = true
) => {
  await store.dispatch(searchModule('downloadDocument'), {
    documentId,
    callDownloadService
  })
}

const dispatchDownloadDocuments = async (
  store: Store<RootStateInterface>,
  documentsIds: string[]
) => {
  await store.dispatch(searchModule('downloadDocuments'), documentsIds)
}

const flushDocumentsPromises = async (store: Store<RootStateInterface>) => {
  const promises: [Promise<void> | void] = [fetchDocuments(store)]

  if (store.state.GED.Search.filters.search) {
    promises.push(fetchDocumentsTotalCount(store))
  }
  await Promise.all(promises)
}

const downloadPreview = async (
  store: Store<RootStateInterface>,
  documentId: string
) => {
  await store.dispatch(searchModule('downloadPreview'), documentId)
}

const downloadVisualization = async (
  store: Store<RootStateInterface>,
  documentId: string
) => {
  await store.dispatch(searchModule('downloadVisualization'), documentId)
}

const dispatchPatchDocumentComment = async (
  store: Store<RootStateInterface>,
  documentId: string,
  value: string
) => {
  await store.dispatch(
    searchModule('patchDocumentComment'),
    new PatchCommentQuery({ documentId, value })
  )
}

const resetVisualization = async (store: Store<RootStateInterface>) => {
  await store.dispatch(searchModule('resetVisualization'))
}

const dispatchHelpers = (): dispatchHelpersType => ({
  fetchDocuments,
  fetchAndPushDocuments,
  fetchDocumentsTotalCount,
  flushDocumentsPromises,
  fetchFolders,
  dispatchDownloadDocument,
  setFilters,
  resetFilters,
  setSearch,
  setSearchFolderId,
  setCertified,
  setPaginator,
  setPage,
  setPeriod,
  pushFolder,
  setSortOptions,
  dispatchDownloadDocuments,
  dispatchPatchDocumentComment,
  downloadPreview,
  downloadVisualization,
  resetVisualization
})

export type dispatchHelpersType = {
  fetchDocuments: (store: Store<RootStateInterface>) => Promise<void>
  fetchAndPushDocuments: (store: Store<RootStateInterface>) => void
  fetchDocumentsTotalCount: (store: Store<RootStateInterface>) => void
  flushDocumentsPromises: (store: Store<RootStateInterface>) => void
  fetchFolders: (store: Store<RootStateInterface>) => void
  pushFolder: (store: Store<RootStateInterface>, folder: Folder) => void
  dispatchDownloadDocument: (
    store: Store<RootStateInterface>,
    documentId: string,
    callDownloadService?: boolean
  ) => void
  setFilters: (
    store: Store<RootStateInterface>,
    filters: DocumentsFilters
  ) => void
  resetFilters: (store: Store<RootStateInterface>) => void
  setSearch: (store: Store<RootStateInterface>, search: string) => void
  setSearchFolderId: (
    store: Store<RootStateInterface>,
    payload: { searchFolderId: number; findInChildFolders?: boolean }
  ) => void
  setCertified: (
    store: Store<RootStateInterface>,
    certified: 'all' | boolean
  ) => void
  setPaginator: (store: Store<RootStateInterface>, filters: Paginator) => void
  setSortOptions: (
    store: Store<RootStateInterface>,
    sortOptions: DocumentsSortOptions
  ) => void
  setPage: (store: Store<RootStateInterface>, pageNumber: number) => void
  setPeriod: (store: Store<RootStateInterface>, period: Period) => void
  downloadPreview: (
    store: Store<RootStateInterface>,
    documentId: string
  ) => void
  downloadVisualization: (
    store: Store<RootStateInterface>,
    documentId: string
  ) => void
  dispatchPatchDocumentComment: (
    store: Store<RootStateInterface>,
    documentId: string,
    value: string
  ) => Promise<void>
  dispatchDownloadDocuments: (
    store: Store<RootStateInterface>,
    documentsIds: string[]
  ) => Promise<void>
  resetVisualization: (store: Store<RootStateInterface>) => Promise<void>
}

export default dispatchHelpers
