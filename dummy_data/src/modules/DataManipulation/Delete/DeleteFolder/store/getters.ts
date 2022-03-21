import { DeleteFoldersStateInterface } from '@/modules/DataManipulation/Delete/DeleteFolder/store/state'
import RootStateInterface from '@/store/types/rootState'
import { uploadModule } from '@/modules/DataManipulation/Upload/store'
import { searchModule } from '@/modules/Search/store'
import useArrayHelpers from '@/Common/hooks/useArrayHelpers'
import constants from '@/Common/constants'

const { hasFileUploading, hasFileUploadingInIt } = useArrayHelpers()

type deleteFoldersGetters = {
  hasPermissionToDeleteFolder: (
    state: DeleteFoldersStateInterface,
    getters: deleteFoldersGetters,
    rootState: RootStateInterface,
    rootGetters: any
  ) => (folderId: number) => boolean
  isFolderDeletable: (
    state: DeleteFoldersStateInterface,
    getters: deleteFoldersGetters,
    rootState: RootStateInterface,
    rootGetters: any
  ) => (folderId: number) => boolean
}

const isFolderDeletable =
  (
    state: DeleteFoldersStateInterface,
    getters: deleteFoldersGetters,
    rootState: RootStateInterface,
    rootGetters: any
  ) =>
  (folderIdToDelete: number): boolean => {
    if (!folderIdToDelete) {
      return false
    }

    const children =
      rootGetters[searchModule('folders')].getFolderById(
        folderIdToDelete
      )?.children

    if (children === undefined) {
      return false
    }

    const files = rootGetters[uploadModule('files')]

    const hasFileIn = hasFileUploadingInIt({
      folderId: folderIdToDelete,
      files
    })

    const hasFileDeep = hasFileUploading({
      folders: children,
      files
    })

    return !(hasFileIn || hasFileDeep)
  }

const hasPermissionToDeleteFolder =
  (
    state: DeleteFoldersStateInterface,
    getters: deleteFoldersGetters,
    rootState: RootStateInterface,
    rootGetters: any
  ) =>
  (folderId: number): boolean => {
    if (!folderId) {
      return false
    }

    return rootGetters['GED/DataManipulation/hasPermissionToManipulateFolder']({
      folderId,
      permissionName: constants.CAN_DELETE_FOLDER
    })
  }

const isFolderDeleting = (state: DeleteFoldersStateInterface): boolean =>
  state.isFolderDeleting

export default {
  isFolderDeletable,
  hasPermissionToDeleteFolder,
  isFolderDeleting
}
