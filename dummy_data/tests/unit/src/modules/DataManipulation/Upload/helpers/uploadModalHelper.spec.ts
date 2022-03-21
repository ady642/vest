import uploadModalHelper from '@/modules/DataManipulation/Upload/helpers/uploadModalHelper'
import { computed } from 'vue'
import { filesFailedCase } from '../__mocks__/FileUploadMock'
import { trackEventFactory } from '@/Common/helpers/analyticsLog'

jest.mock('@/Common/helpers/analyticsLog', () => ({
  trackEventFactory: jest.fn(),
  pageViewFactory: jest.fn()
}))
const { cancelFileUploadNotification, getUploadNotification } =
  uploadModalHelper()

const description = ''

const title = 'ged.dataManipulation.upload.notification.cancelUploadModal.title'

describe('uploadModalHelper', () => {
  test('cancelFileUploadNotification', () => {
    const callbackfn = () => {}

    cancelFileUploadNotification(callbackfn)

    const args = global.ElMessageBox.confirm.mock.calls[0]

    expect(trackEventFactory).toBeCalledWith('upt-upload-cancel-click')
    expect(args[0]).toBe(description)
    expect(args[1]).toBe(title)
    expect(args[2].callback).toStrictEqual(callbackfn)
    expect(args[2].cancelButtonText).toBe(
      'ged.dataManipulation.upload.notification.cancelUploadModal.CTA.cancel'
    )
    expect(args[2].confirmButtonText).toBe(
      'ged.dataManipulation.upload.notification.cancelUploadModal.CTA.interrupt'
    )
    expect(args[2].customClass).toBe('warning-ged-confirm')
    expect(args[2].showClose).toBe(false)
    expect(args[2].closeOnClickModal).toBe(false)
    expect(args[2].closeOnHashChange).toBe(false)
    expect(args[2].showClose).toBe(false)
  })
  test('getUploadNotification', () => {
    const cancelfn = () => {}
    const closefn = () => {}
    const openfn = () => {}

    const notification = getUploadNotification(
      true,
      computed(() => filesFailedCase),
      cancelfn,
      closefn,
      openfn
    )
    const args = global.ElNotification.mock.calls[0][0]

    expect(args.customClass).toBe('mfe-upload-main')
    expect(args.dangerouslyUseHTMLString).toBe(true)
    expect(args.duration).toBe(0)
    expect(args.message.props.duration).toBe(5000)
    expect(args.message.props.files).toBe(filesFailedCase)
    expect(args.message.props.loading).toBe(true)
    expect(args.message.props.onCancelUpload).toStrictEqual(cancelfn)
    expect(args.message.props.onClose).toStrictEqual(closefn)
    expect(args.message.props.onOpenUploadModal).toStrictEqual(openfn)
    expect(args.position).toBe('bottom-right')
    expect(args.showClose).toBe(false)
    expect(notification).toBe('the notification')
  })
})
