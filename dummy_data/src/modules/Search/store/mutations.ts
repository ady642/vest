import Paginator from '@/Common/models/List/Paginator'
import Documents from '@/modules/Search/models/Documents/Inputs/Documents'
import { SearchStateInterface } from '@/modules/Search/store/types'
import DocumentsFilters from '@/modules/Search/models/Documents/Query/DocumentsFilters'
import Folders from '@/modules/Search/models/Folders/Inputs/Folders'
import Folder from '../models/Folders/Inputs/Folder'
import useArrayHelpers from '@/Common/hooks/useArrayHelpers'
import DocumentsSortOptions from '../models/Documents/Query/DocumentsSortOptions'

export const SET_DOCUMENTS = 'SET_DOCUMENTS'
export const PUSH_DOCUMENTS = 'PUSH_DOCUMENTS'
export const SET_DOCUMENTS_TOTAL_COUNT = 'SET_DOCUMENTS_TOTAL_COUNT'
export const SET_FOLDERS = 'SET_FOLDERS'
export const SET_FILTERS = 'SET_FILTERS'
export const SET_PAGINATOR = 'SET_PAGINATOR'
export const REMOVE_FOLDER = 'REMOVE_FOLDER'
export const SET_SORT_OPTIONS = 'SET_SORT_OPTIONS'
export const PUSH_FOLDER = 'PUSH_FOLDER'
export const SET_PREVIEW = 'SET_PREVIEW'
export const SET_PREVIEW_LOADING = 'SET_PREVIEW_LOADING'
export const SET_DOCUMENT_COMMENT = 'SET_DOCUMENT_COMMENT'
export const SET_MULTIPLE_DOWNLOAD_LOADING = 'SET_MULTIPLE_DOWNLOAD_LOADING'
export const SET_IS_DOWNLOADING = 'SET_IS_DOWNLOADING'
export const SET_VISUALIZATION = 'SET_VISUALIZATION'

const { sortArrayByAlphabeticalOrder } = useArrayHelpers()

export default {
  [SET_DOCUMENTS]: (
    state: SearchStateInterface,
    documents: Documents
  ): void => {
    if (documents.isLoading) {
      state.documents.cancelToken = documents.cancelToken
    }
    state.documents.state = documents.state
    state.documents.collection = documents.collection
  },
  [SET_DOCUMENT_COMMENT]: (
    state: SearchStateInterface,
    data: {
      documentId: string
      comment: string
    }
  ): void => {
    state.documents.updateDocumentComment(data.documentId, data.comment)
  },
  [PUSH_DOCUMENTS]: (
    state: SearchStateInterface,
    documents: Documents
  ): void => {
    if (documents.isLoading) {
      state.documents.cancelToken = documents.cancelToken
    }
    state.documents.state = documents.state
    state.documents.collection = [
      ...state.documents.collection,
      ...documents.collection
    ]
  },
  [SET_DOCUMENTS_TOTAL_COUNT]: (
    state: SearchStateInterface,
    documentsTotalCount: number
  ): void => {
    state.documentsTotalCount = documentsTotalCount
  },
  [SET_FOLDERS]: (state: SearchStateInterface, folders: Folders): void => {
    state.folders = folders
  },
  [SET_FILTERS]: (
    state: SearchStateInterface,
    filters: DocumentsFilters
  ): void => {
    state.filters = filters
  },
  [SET_PAGINATOR]: (
    state: SearchStateInterface,
    paginator: Paginator
  ): void => {
    state.paginator = paginator
  },
  [SET_SORT_OPTIONS]: (
    state: SearchStateInterface,
    sortOptions: DocumentsSortOptions
  ) => {
    state.sortOptions = sortOptions
  },
  [PUSH_FOLDER]: (state: SearchStateInterface, folder: Folder): void => {
    let children =
      state.folders.getFolderById(folder.parentId ?? 0)?.children || []

    if (!children.some((child) => child.id === folder.id)) {
      children.push(folder)
      children =
        children.length > 0
          ? sortArrayByAlphabeticalOrder(children, 'name')
          : []

      state.folders.getFolderById(folder.parentId ?? 0)?.setChildren(children)
    }
  },
  [REMOVE_FOLDER]: (
    state: SearchStateInterface,
    folderIdToDelete: number
  ): void => {
    state.folders.removeFolder(folderIdToDelete)
  },
  [SET_PREVIEW]: (state: SearchStateInterface, preview: Blob): void => {
    state.previewDocumentImage = preview
  },
  [SET_PREVIEW_LOADING]: (
    state: SearchStateInterface,
    payload: boolean
  ): void => {
    state.isPreviewLoading = payload
  },
  [SET_MULTIPLE_DOWNLOAD_LOADING]: (
    state: SearchStateInterface,
    payload: boolean
  ): void => {
    state.multipleDownloadLoading = payload
  },
  [SET_IS_DOWNLOADING]: (
    state: SearchStateInterface,
    payload: boolean
  ): void => {
    state.isDownloading = payload
  },
  [SET_VISUALIZATION]: (state: SearchStateInterface, payload: Blob): void => {
    state.visualization = payload
  }
}
