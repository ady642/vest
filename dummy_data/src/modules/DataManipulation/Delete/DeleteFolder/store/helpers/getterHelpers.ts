import { Store } from 'vuex'
import { DeleteFoldersStateInterface } from '@/modules/DataManipulation/Delete/DeleteFolder/store/state'

const gettersHelpers = (
  store: Store<DeleteFoldersStateInterface>
): gettersHelpersType => ({
  hasPermissionToDeleteFolder: (folderId: number) =>
    store.getters[
      'GED/DataManipulation/DeleteFolders/hasPermissionToDeleteFolder'
    ](folderId),

  isFolderDeletable: (folderId: number) =>
    store.getters['GED/DataManipulation/DeleteFolders/isFolderDeletable'](
      folderId
    ),
  isFolderDeleting: () =>
    store.getters['GED/DataManipulation/DeleteFolders/isFolderDeleting']
})

export type gettersHelpersType = {
  hasPermissionToDeleteFolder: (folderId: number) => boolean
  isFolderDeletable: (folderId: number) => boolean
  isFolderDeleting: () => boolean
}

export default gettersHelpers
