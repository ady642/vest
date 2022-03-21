import Paginator from '@/Common/models/List/Paginator'
import { TrashStateInterface } from './state'
import TrashDocuments from '../models/Inputs/TrashDocuments'
import constants from '@/Common/constants'

const documents = (state: TrashStateInterface): TrashDocuments =>
  state.documents
const documentsTotalCount = (state: TrashStateInterface): number =>
  state.documentsTotalCount
const totalLoading = (state: TrashStateInterface): boolean => state.totalLoading
const areAllDocumentsLoaded = (state: TrashStateInterface): boolean =>
  state.documents.collection.length === state.paginator.totalItems
const paginator = (state: TrashStateInterface): Paginator => state.paginator
const isFileRestoring = (state: TrashStateInterface): boolean =>
  state.isFileRestoring
const pendingList = (state: TrashStateInterface): TrashDocuments =>
  state.pendingList
const totalPendingRestoration = (state: TrashStateInterface): number =>
  state.pendingList.collection.filter(
    (doc) => doc.restorationStatus === constants.RESTORE_IN_PROGRESS
  ).length
const isInPendingList =
  (state: TrashStateInterface) =>
  (trashDocumentId: string): boolean => {
    const trashDocumentInPendingList = state.pendingList.collection.find(
      (doc) => doc.id === trashDocumentId
    )

    if (!trashDocumentInPendingList) {
      return false
    }

    return (
      trashDocumentInPendingList.restorationStatus ===
      constants.RESTORE_IN_PROGRESS
    )
  }

export default {
  documents,
  documentsTotalCount,
  totalLoading,
  areAllDocumentsLoaded,
  paginator,
  isFileRestoring,
  pendingList,
  totalPendingRestoration,
  isInPendingList
}
