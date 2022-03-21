import { DeleteFileStateInterface } from '@/modules/DataManipulation/Delete/DeleteFile/store/state'
import RootStateInterface from '@/store/types/rootState'
import { searchModule } from '@/modules/Search/store'
import constants from '@/Common/constants'
import Document from '@/modules/Search/models/Documents/Inputs/Document'
import { isString } from 'lodash'

const isFileDeleting = (state: DeleteFileStateInterface): boolean =>
  state.isFileDeleting

const isFileDeletable =
  (
    state: DeleteFileStateInterface,
    getters: Record<string, any>,
    rootState: RootStateInterface,
    rootGetters: Record<string, any>
  ) =>
  (documentIdToDelete: string): boolean => {
    if (!documentIdToDelete && !isString(documentIdToDelete)) {
      return false
    }

    const document = rootGetters[searchModule('documents')].collection.find(
      (doc: Document) => doc.id === documentIdToDelete
    )

    if (document) {
      const syncStatus = document.properties.syncStatus
      const folder = rootGetters[searchModule('folders')].getFolderById(
        document.folderId
      )

      if (folder) {
        const isPiaFolder = folder.properties.isPIAFolder

        return (
          !(
            (isPiaFolder && syncStatus == constants.SUCCESS_SYNC) ||
            syncStatus == constants.PENDING_SYNC
          ) &&
          rootGetters['GED/DataManipulation/hasPermissionToManipulateFolder']({
            folderId: folder.id,
            permissionName: constants.CAN_DELETE_FILES
          })
        )
      }
    }

    return false
  }

const areDocumentsDeletable =
  (state: DeleteFileStateInterface, getters: Record<string, any>) =>
  (documentIds: string[]): boolean =>
    documentIds.every((documentId) => getters.isFileDeletable(documentId))

export default {
  isFileDeletable,
  isFileDeleting,
  areDocumentsDeletable
}
