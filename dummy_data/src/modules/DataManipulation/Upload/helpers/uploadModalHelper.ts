import { INotificationComponent } from '@/Common/helpers/NotificationComponent'
import renderHelper from '@/Common/helpers/renderHelper'
import FileUpload from '../models/Files/Inputs/FileUpload'
import MainUploadPopup from '@/modules/DataManipulation/Upload/components/Notification/MainUploadPopup.vue'
import { ComputedRef } from 'vue'
import { trackEventFactory } from '@/Common/helpers/analyticsLog'
import analyticsCode from '@/Common/constants/analyticsCode'
import { useTranslation } from '@/Common/hooks/useTranslation'

const { t } = useTranslation()

const getUploadNotification = (
  loading: boolean | undefined,
  files: ComputedRef<FileUpload[]>,
  onCancelUpload: () => void,
  onClose: () => void,
  onOpenUploadModal: () => void
): INotificationComponent => {
  return window.ElNotification({
    position: 'bottom-right',
    showClose: false,
    customClass: 'mfe-upload-main',
    message: renderHelper.render(MainUploadPopup, {
      files: files.value,
      loading: loading,
      duration: 5000,
      onCancelUpload: onCancelUpload,
      onClose: onClose,
      onOpenUploadModal: onOpenUploadModal
    }),
    duration: 0,
    dangerouslyUseHTMLString: true
  })
}

const cancelFileUploadNotification = (callback: (action: string) => void) => {
  trackEventFactory(analyticsCode['upt-upload-cancel-click'])
  window.ElMessageBox.confirm(
    '',
    t('ged.dataManipulation.upload.notification.cancelUploadModal.title'),
    {
      showClose: false,
      closeOnClickModal: false,
      closeOnPressEscape: false,
      closeOnHashChange: false,
      confirmButtonText: t(
        'ged.dataManipulation.upload.notification.cancelUploadModal.CTA.interrupt'
      ),
      cancelButtonText: t(
        'ged.dataManipulation.upload.notification.cancelUploadModal.CTA.cancel'
      ),
      customClass: 'warning-ged-confirm',
      confirmButtonClass: 'confirm-button',
      callback: callback
    }
  )
}

export default () => ({
  cancelFileUploadNotification,
  getUploadNotification
})
