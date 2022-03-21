import FileUpload from '@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload'
import { INotificationComponent } from '@/Common/helpers/NotificationComponent'

export interface UploadStateInterface {
  files: FileUpload[]
  selectedFolderToUpload: number
  gedNotification: INotificationComponent
}

const state: UploadStateInterface = {
  files: [] as FileUpload[],
  selectedFolderToUpload: 0,
  gedNotification: {} as INotificationComponent
}

export default state
