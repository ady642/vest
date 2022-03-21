import TrashDocuments from '../models/Inputs/TrashDocuments'
import { TrashStateInterface } from '@/modules/Trash/store/state'
import TrashDocumentsPaginator from '../models/Query/TrashDocumentsPaginator'

export const SET_TRASH_DOCUMENTS = 'SET_TRASH_DOCUMENTS'
export const SET_TRASH_DOCUMENTS_TOTAL_COUNT = 'SET_TRASH_DOCUMENTS_TOTAL_COUNT'
export const SET_TRASH_PAGINATOR = 'SET_TRASH_PAGINATOR'
export const SET_TOTAL_LOADING = 'SET_TOTAL_LOADING'
export const SET_IS_FILE_RESTORING = 'SET_IS_FILE_RESTORING'
export const SET_DOCUMENT_STATUS = 'SET_DOCUMENT_STATUS'
export const REMOVE_DOCUMENT = 'REMOVE_DOCUMENT'
export const REMOVE_DOCUMENT_IN_PENDING_LIST = 'REMOVE_DOCUMENT_IN_PENDING_LIST'

export default {
  [SET_TRASH_DOCUMENTS]: (
    state: TrashStateInterface,
    documents: TrashDocuments
  ): void => {
    if (documents.isLoading) {
      state.documents.cancelToken = documents.cancelToken
    }
    state.documents.state = documents.state
    state.documents.collection = documents.collection
  },
  [SET_TRASH_DOCUMENTS_TOTAL_COUNT]: (
    state: TrashStateInterface,
    documentsTotalCount: number
  ): void => {
    state.documentsTotalCount = documentsTotalCount
  },
  [SET_TRASH_PAGINATOR]: (
    state: TrashStateInterface,
    paginator: TrashDocumentsPaginator
  ): void => {
    state.paginator = paginator
  },
  [SET_TOTAL_LOADING]: (
    state: TrashStateInterface,
    isLoading: boolean
  ): void => {
    state.totalLoading = isLoading
  },
  [SET_IS_FILE_RESTORING](state: TrashStateInterface, payload: boolean): void {
    state.isFileRestoring = payload
  },
  [SET_DOCUMENT_STATUS](
    state: TrashStateInterface,
    payload: { status: string; documentId: string }
  ): void {
    const document = state.pendingList.collection.find(
      (x) => x.id === payload.documentId
    )

    if (document) {
      document.restorationStatus = payload.status
    }
  },
  [REMOVE_DOCUMENT_IN_PENDING_LIST](
    state: TrashStateInterface,
    documentId: string
  ): void {
    if (!documentId) {
      console.error('Document Id cant be empty')

      return
    }

    state.pendingList.collection = state.pendingList.collection.filter(
      (document) => document.id !== documentId
    )
  }
}
