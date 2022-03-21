import { INotificationComponent } from '@/Common/helpers/NotificationComponent'
import renderHelper from '@/Common/helpers/renderHelper'
import TrashViewRestorePopup from '@/modules/Trash/components/Notification/TrashViewRestorePopup.vue'
import TrashDocuments from '../models/Inputs/TrashDocuments'
import TrashDocument from '../models/Inputs/TrashDocument'

const getPendingRestoreNotification = (
  documents: TrashDocuments,
  restoredDocument: TrashDocument,
  onRedirectToLocation: () => void,
  onClose: () => void
): INotificationComponent => {
  return window.ElNotification({
    position: 'bottom-right',
    showClose: false,
    customClass: 'mfe-restore-main',
    message: renderHelper.render(TrashViewRestorePopup, {
      pending: true,
      success: false,
      failed: false,
      documents,
      restoredDocument,
      duration: 5000,
      onRedirectToLocation,
      onClose
    }),
    duration: 0,
    dangerouslyUseHTMLString: true
  })
}

const getSuccessRestoreNotification = (
  documents: TrashDocuments,
  restoredDocument: TrashDocument,
  onRedirectToLocation: () => void,
  onClose: () => void
): INotificationComponent => {
  return window.ElNotification({
    position: 'bottom-right',
    showClose: false,
    customClass: 'mfe-restore-main',
    message: renderHelper.render(TrashViewRestorePopup, {
      pending: false,
      success: true,
      failed: false,
      documents,
      restoredDocument,
      duration: 5000,
      onRedirectToLocation,
      onClose
    }),
    duration: 0,
    dangerouslyUseHTMLString: true
  })
}

const getFailedRestoreNotification = (
  documents: TrashDocuments,
  restoredDocument: TrashDocument,
  onRedirectToLocation: () => void,
  onClose: () => void
): INotificationComponent => {
  return window.ElNotification({
    position: 'bottom-right',
    showClose: false,
    customClass: 'mfe-restore-main',
    message: renderHelper.render(TrashViewRestorePopup, {
      pending: false,
      success: false,
      failed: true,
      documents,
      restoredDocument,
      duration: 5000,
      onRedirectToLocation,
      onClose: onClose
    }),
    duration: 0,
    dangerouslyUseHTMLString: true
  })
}

export default () => ({
  getPendingRestoreNotification,
  getSuccessRestoreNotification,
  getFailedRestoreNotification
})
