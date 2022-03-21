import Folders from '../../../Search/models/Folders/Inputs/Folders'
import { UploadStateInterface } from '@/modules/DataManipulation/Upload/store/state'
import FileUpload from '@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload'
import RootStateInterface from '@/store/types/rootState'
import constants from '@/Common/constants'

const files = (state: UploadStateInterface): FileUpload[] => state.files
const selectedFolderToUpload = (state: UploadStateInterface): number =>
  state.selectedFolderToUpload
const isUploading = (state: UploadStateInterface): boolean =>
  state.files.some((f) => f.running()) || state.files.some((f) => f.pending())

type UploadGettersType = {
  state: UploadStateInterface
  getters: any
  rootState: RootStateInterface
  rootGetters: any
}

const hasPermissionToUploadFile =
  (
    state: UploadStateInterface,
    getters: UploadGettersType,
    rootState: RootStateInterface,
    rootGetters: any
  ) =>
  (folderId: number): boolean => {
    return rootGetters['GED/DataManipulation/hasPermissionToManipulateFolder']({
      folderId,
      permissionName: constants.CAN_UPLOAD_FILES
    })
  }
const hasAccessDs = (
  state: UploadStateInterface,
  getters: UploadGettersType,
  rootState: RootStateInterface,
  rootGetters: any
): boolean => {
  const folders = rootGetters['GED/Search/folders'] as Folders

  return folders.collection.length > 0
}

export default {
  files,
  selectedFolderToUpload,
  isUploading,
  hasPermissionToUploadFile,
  hasAccessDs
}
