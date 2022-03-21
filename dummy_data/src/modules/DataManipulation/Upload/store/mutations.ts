import { UploadStateInterface } from '@/modules/DataManipulation/Upload/store/state'
import FileUpload from '@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload'
import { StateUpload } from '@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload'

import { ErrorDescription } from '@/Common/types/common'
import { isAcceptedFile } from '@/Common/helpers/file'
import getErrorMapping from '@/Common/consts/uploadErrorMapping'

export const SET_SELECTED_FOLDER_TO_UPLOAD = 'SET_SELECTED_FOLDER_TO_UPLOAD'
export const SET_FILES = 'SET_FILES'
export const SET_FILE_STATE = 'SET_FILE_STATE'
export const SET_FILE_DESTINATION = 'SET_FILE_DESTINATION'

export default {
  [SET_SELECTED_FOLDER_TO_UPLOAD]: (
    state: UploadStateInterface,
    selectedFolderToUpload: number
  ): void => {
    state.selectedFolderToUpload = selectedFolderToUpload
  },
  [SET_FILES]: (state: UploadStateInterface, files: FileUpload[]): void => {
    state.files = files.map((fileUpload) => {
      if (!isAcceptedFile(fileUpload.file)) {
        fileUpload.state = StateUpload.ERROR
        fileUpload.errorDescription.description = getErrorMapping(
          'UnauthorizedFileType'
        ).description
        fileUpload.errorDescription.libelle = getErrorMapping(
          'UnauthorizedFileType'
        ).libelle
      }

      return fileUpload
    })
  },
  [SET_FILE_STATE]: (
    state: UploadStateInterface,
    {
      index,
      fileState,
      error
    }: { index: number; fileState: StateUpload; error: ErrorDescription }
  ): void => {
    if (error !== null && error !== undefined) {
      state.files[index].errorDescription = error
    }
    state.files[index].state = fileState
  },
  [SET_FILE_DESTINATION]: (
    state: UploadStateInterface,
    { index, destinationId }: { index: number; destinationId: number }
  ): void => {
    state.files[index].destination = destinationId
  }
}
