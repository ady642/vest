import { ActionContext } from 'vuex'
import UploadServices from '@/modules/DataManipulation/Upload/services'
import { UploadStateInterface } from '@/modules/DataManipulation/Upload/store/state'

import FileUpload, {
  StateUpload
} from '@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload'
import RootStateInterface from '@/store/types/rootState'
import { ErrorDescription } from '@/Common/types/common'
import {
  SET_FILE_DESTINATION,
  SET_FILE_STATE,
  SET_FILES,
  SET_SELECTED_FOLDER_TO_UPLOAD
} from '@/modules/DataManipulation/Upload/store/mutations'
import getErrorMapping from '@/Common/consts/uploadErrorMapping'
import { INotificationComponent } from '@/Common/helpers/NotificationComponent'
import { trackEventFactory } from '@/Common/helpers/analyticsLog'
import analyticsCode from '@/Common/constants/analyticsCode'

const setGedNotification = (
  {
    state
  }: Omit<
    ActionContext<UploadStateInterface, RootStateInterface>,
    'getters' | 'rootGetters'
  >,
  notification: INotificationComponent
) => {
  state.gedNotification = notification
}

const closeGedNotification = ({
  state
}: Omit<
  ActionContext<UploadStateInterface, RootStateInterface>,
  'getters' | 'rootGetters'
>) => {
  if (state.gedNotification.close) {
    state.gedNotification.close()
  }
}

const uploadDocuments = async (
  {
    dispatch
  }: Omit<
    ActionContext<UploadStateInterface, RootStateInterface>,
    'getters' | 'rootGetters' | 'commit' | 'rootState' | 'state'
  >,
  indexes: number[]
): Promise<void> => {
  let i = 0
  let fileIndexesToUpload: number[] = []
  const MAX_UPLOAD = 5

  do {
    fileIndexesToUpload.push(indexes[i])

    if (fileIndexesToUpload.length === MAX_UPLOAD || i === indexes.length - 1) {
      // Send dispatches every 5 index OR dispatch the rest
      await Promise.all(
        fileIndexesToUpload.map((index) => dispatch('uploadDocument', index))
      )

      fileIndexesToUpload = []
    }

    i++
  } while (i < indexes.length)
}

const uploadDocument = async (
  {
    rootState,
    state,
    commit
  }: Omit<
    ActionContext<UploadStateInterface, RootStateInterface>,
    'getters' | 'rootGetters' | 'dispatch'
  >,
  fileIndex: number
): Promise<void> => {
  if (state.files[fileIndex].canceled()) {
    return
  }
  const targetFolderId = state.files[fileIndex].destination

  try {
    commit(SET_FILE_STATE, {
      index: fileIndex,
      fileState: StateUpload.UPLOADING
    })
    if (!targetFolderId !== null && targetFolderId !== 0) {
      await UploadServices.uploadDocument({
        accountNumberOrId: rootState.app.account.AccountId,
        folderId: targetFolderId ?? 0,
        file: state.files[fileIndex].file
      })
    }

    commit(SET_FILE_STATE, {
      index: fileIndex,
      fileState: StateUpload.UPLOADED
    })
    trackEventFactory(analyticsCode['updm-upload-success'])
  } catch (error: any) {
    commit(SET_FILE_STATE, {
      index: fileIndex,
      fileState: StateUpload.ERROR,
      error: getErrorMapping(error?.response?.data?.code)
    })
    trackEventFactory(
      analyticsCode['updm-upload-failure'],
      error?.response?.data?.code
    )
  }
}

const cancelFilesUpload = async ({
  state,
  commit
}: Omit<
  ActionContext<UploadStateInterface, RootStateInterface>,
  'getters' | 'rootGetters' | 'dispatch' | 'rootState'
>): Promise<void> => {
  for (let i = 0; i < state.files.length; i++) {
    if (state.files[i].pending()) {
      commit(SET_FILE_STATE, {
        index: i,
        fileState: StateUpload.CANCELED,
        error: getErrorMapping('CanceledUpload')
      })
    }
  }
}

const sortFiles = ({
  state,
  commit
}: Omit<
  ActionContext<UploadStateInterface, RootStateInterface>,
  'rootState' | 'dispatch' | 'getters' | 'rootGetters'
>): void => {
  const files = state.files.sort((a, b) => (a.error() && !b.error() ? -1 : 1))

  commit(SET_FILES, files)
}

const setFiles = (
  {
    commit
  }: Omit<
    ActionContext<UploadStateInterface, RootStateInterface>,
    'state' | 'rootState' | 'dispatch' | 'getters' | 'rootGetters'
  >,
  files: FileUpload[]
): void => {
  commit(SET_FILES, files)
}

const setFileState = (
  {
    commit
  }: Omit<
    ActionContext<UploadStateInterface, RootStateInterface>,
    'state' | 'rootState' | 'dispatch' | 'getters' | 'rootGetters'
  >,
  {
    index,
    fileState,
    error
  }: { index: number; fileState: StateUpload; error: ErrorDescription }
): void => {
  commit(SET_FILE_STATE, { index, fileState, error })
}

const setFileDestination = (
  {
    commit
  }: Omit<
    ActionContext<UploadStateInterface, RootStateInterface>,
    'state' | 'rootState' | 'dispatch' | 'getters' | 'rootGetters'
  >,
  { index, destinationId }: { index: number; destinationId: number }
): void => {
  commit(SET_FILE_DESTINATION, { index, destinationId })
}

const setSelectedFolderToUpload = (
  {
    commit
  }: Omit<
    ActionContext<UploadStateInterface, RootStateInterface>,
    'dispatch' | 'getters' | 'rootGetters' | 'state' | 'rootState'
  >,
  setSelectedFolderToUpload: number
): void => {
  commit(SET_SELECTED_FOLDER_TO_UPLOAD, setSelectedFolderToUpload)
}

export default {
  uploadDocument,
  uploadDocuments,
  closeGedNotification,
  setGedNotification,
  cancelFilesUpload,
  setFiles,
  setFileState,
  setFileDestination,
  setSelectedFolderToUpload,
  sortFiles
}
