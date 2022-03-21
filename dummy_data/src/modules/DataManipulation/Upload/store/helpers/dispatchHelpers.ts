import { Store } from 'vuex'
import { uploadModule } from '@/modules/DataManipulation/Upload/store'
import FileUpload, {
  StateUpload
} from '@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload'
import { UploadStateInterface } from '@/modules/DataManipulation/Upload/store/state'
import { ErrorDescription } from '@/Common/types/common'
import { INotificationComponent } from '@/Common/helpers/NotificationComponent'

const uploadDocument = async (
  store: Store<UploadStateInterface>,
  fileIndex: number
): Promise<void> => {
  await store.dispatch(uploadModule('uploadDocument'), fileIndex)
}

const uploadDocuments = async (
  store: Store<UploadStateInterface>,
  indexes: number[]
): Promise<void> => {
  await store.dispatch(uploadModule('uploadDocuments'), indexes)
}

const setFiles = async (
  store: Store<UploadStateInterface>,
  files: FileUpload[]
) => {
  await store.dispatch(uploadModule('setFiles'), files)
}

const sortFiles = (store: Store<UploadStateInterface>): void => {
  store.dispatch(uploadModule('sortFiles'))
}

const setFileState = (
  store: Store<UploadStateInterface>,
  {
    index,
    fileState,
    error
  }: { index: number; fileState: StateUpload; error?: ErrorDescription }
): void => {
  store.dispatch(uploadModule('setFileState'), { index, fileState, error })
}

const setFileDestination = (
  store: Store<UploadStateInterface>,
  { index, destinationId }: { index: number; destinationId: number }
): void => {
  store.dispatch(uploadModule('setFileDestination'), {
    index,
    destinationId
  })
}

const setSelectedFolderToUpload = (
  store: Store<UploadStateInterface>,
  selectedFolderToUpload: number
): void => {
  store.dispatch(
    uploadModule('setSelectedFolderToUpload'),
    selectedFolderToUpload
  )
}

const setGedNotification = (
  store: Store<UploadStateInterface>,
  notification: any
): void => {
  store.dispatch(uploadModule('setGedNotification'), notification)
}

const closeGedNotification = (store: Store<UploadStateInterface>): void => {
  store.dispatch(uploadModule('closeGedNotification'))
}

const cancelFilesUpload = (store: Store<UploadStateInterface>): void => {
  store.dispatch(uploadModule('cancelFilesUpload'))
}

const dispatchHelpers = (): dispatchHelpersType => ({
  uploadDocument,
  uploadDocuments,
  setFiles,
  sortFiles,
  setFileState,
  setFileDestination,
  setSelectedFolderToUpload,
  setGedNotification,
  closeGedNotification,
  cancelFilesUpload
})

export type dispatchHelpersType = {
  setSelectedFolderToUpload: (
    store: Store<UploadStateInterface>,
    selectedFolderToUpload: number
  ) => void
  uploadDocument: (
    store: Store<UploadStateInterface>,
    fileIndex: number
  ) => Promise<void>

  uploadDocuments: (
    store: Store<UploadStateInterface>,
    indexes: number[]
  ) => Promise<void>
  setFiles: (store: Store<UploadStateInterface>, files: FileUpload[]) => void
  sortFiles: (store: Store<UploadStateInterface>) => void
  setFileState: (
    store: Store<UploadStateInterface>,
    {
      index,
      fileState
    }: { index: number; fileState: StateUpload; error?: ErrorDescription }
  ) => void
  setFileDestination: (
    store: Store<UploadStateInterface>,
    { index, destinationId }: { index: number; destinationId: number }
  ) => void
  setGedNotification: (
    store: Store<UploadStateInterface>,
    notification: INotificationComponent
  ) => void
  closeGedNotification: (store: Store<UploadStateInterface>) => void
  cancelFilesUpload: (store: Store<UploadStateInterface>) => void
}

export default dispatchHelpers
