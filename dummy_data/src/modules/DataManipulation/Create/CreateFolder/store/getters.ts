import { CreateFolderStateInterface } from '@/modules/DataManipulation/Create/CreateFolder/store/state'
import RootStateInterface from '@/store/types/rootState'
import constants from '@/Common/constants'
type createFolderGettersType = {
  hasPermissionToAddFolder: (
    state: CreateFolderStateInterface,
    getters: createFolderGettersType,
    rootState: RootStateInterface,
    rootGetters: any
  ) => (folderId: number) => boolean
}

const hasPermissionToAddFolder =
  (
    state: CreateFolderStateInterface,
    getters: createFolderGettersType,
    rootState: RootStateInterface,
    rootGetters: any
  ) =>
  (folderId: number): boolean => {
    return rootGetters['GED/DataManipulation/hasPermissionToManipulateFolder']({
      folderId,
      permissionName: constants.CAN_CREATE_FOLDER
    })
  }

const isCreatingFolder = (state: CreateFolderStateInterface): boolean =>
  state.isCreatingFolder

export default {
  hasPermissionToAddFolder,
  isCreatingFolder
}
