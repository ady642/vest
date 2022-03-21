import { PermissionsNames } from '@/modules/Search/types'
import RootStateInterface from '@/store/types/rootState'
import Folder from '@/modules/Search/models/Folders/Inputs/Folder'

const hasPermissionToManipulateFolder =
  (
    state: unknown,
    getters: any,
    rootState: RootStateInterface,
    rootGetters: any
  ) =>
  ({
    folderId,
    permissionName
  }: {
    folderId: number
    permissionName: PermissionsNames
  }): boolean => {
    if (!folderId) {
      return false
    }

    const folder: Folder =
      rootGetters['GED/Search/folders'].getFolderById(folderId)

    const hasPermission = folder?.permissions.includes(permissionName)

    return hasPermission ?? false
  }

export default {
  hasPermissionToManipulateFolder
}
