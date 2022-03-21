import useRestoreNotificationHelper from '@/modules/Trash/helpers/RestoreNotificationHelper'
import { TrashDocumentAPILightMockList } from '../mocks/TrashDocumentAPIMock'
import TrashDocuments from '@/modules/Trash/models/Inputs/TrashDocuments'

const documentsData = TrashDocuments.loaded(TrashDocumentAPILightMockList)

describe('RestoreNotificationHelper', () => {
  test('getPendingRestoreNotification', () => {
    const { getPendingRestoreNotification } = useRestoreNotificationHelper()
    const redirectfn = () => {}

    const closefn = () => {}

    const notification = getPendingRestoreNotification(
      documentsData,
      documentsData.collection[0],
      redirectfn,
      closefn
    )

    const args = global.ElNotification.mock.calls[0][0]

    expect(args.customClass).toBe('mfe-restore-main')
    expect(args.dangerouslyUseHTMLString).toBe(true)
    expect(args.duration).toBe(0)
    expect(args.message.props.duration).toBe(5000)
    expect(args.message.props.pending).toBe(true)
    expect(args.message.props.success).toBe(false)
    expect(args.message.props.failed).toBe(false)
    expect(args.message.props.documents).toBe(documentsData)
    expect(args.message.props.restoredDocument).toBe(
      documentsData.collection[0]
    )
    expect(args.message.props.onRedirectToLocation).toStrictEqual(redirectfn)
    expect(args.message.props.onClose).toStrictEqual(closefn)
    expect(args.position).toBe('bottom-right')
    expect(args.showClose).toBe(false)
  })
})
