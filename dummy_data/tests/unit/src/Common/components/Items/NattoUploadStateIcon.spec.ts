import NattoUploadStateIcon from '@/Common/components/Items/NattoUploadStateIcon.vue'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { DOMWrapper } from '@vue/test-utils'
import { StateUpload } from '@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload'
import WarningIcon from '@/Common/components/Icons/WarningIcon.vue'
import LoadedIcon from '@/Common/components/Icons/LoadedIcon.vue'
import LoadingIcon from '@/Common/components/Icons/LoadingIcon.vue'
import PendingIcon from '@/Common/components/Icons/PendingIcon.vue'
import FileIcon from '@/Common/components/Icons/FileIcon.vue'

const createWrapper = (statusIcon?: StateUpload) =>
  wrapperFactory(NattoUploadStateIcon, {
    global: {
      stubs: {
        WarningIcon,
        LoadedIcon,
        LoadingIcon,
        PendingIcon
      }
    },
    propsData: {
      statusIcon
    }
  })

describe('NattoUploadStateIcon', () => {
  describe('binding', () => {
    it('Should display warning icon when state is canceled', () => {
      const wrapper = createWrapper(StateUpload.CANCELED)
      const NattoUploadStateIconWrapper: DOMWrapper<any> =
        wrapper.find('.warning')

      expect(NattoUploadStateIconWrapper.classes().length).toBeGreaterThan(0)
    })
    it('Should display warning icon when state is errored', () => {
      const wrapper = createWrapper(StateUpload.ERROR)
      const NattoUploadStateIconWrapper: DOMWrapper<any> =
        wrapper.find('.warning')

      expect(NattoUploadStateIconWrapper.classes().length).toBeGreaterThan(0)
    })
    it('Should display loading icon when state is loading', () => {
      const wrapper = createWrapper(StateUpload.UPLOADING)
      const NattoUploadStateIconWrapper: DOMWrapper<any> =
        wrapper.find('.loader')

      expect(NattoUploadStateIconWrapper.classes().length).toBeGreaterThan(0)
    })

    it('Should display loading icon when state is pending', () => {
      const wrapper = createWrapper(StateUpload.PENDING)
      const NattoUploadStateIconWrapper: DOMWrapper<any> =
        wrapper.find('.pending')

      expect(NattoUploadStateIconWrapper.classes().length).toBeGreaterThan(0)
    })

    it('Should display loaded icon when state is loaded', () => {
      const wrapper = createWrapper(StateUpload.UPLOADED)
      const NattoUploadStateIconWrapper: DOMWrapper<any> =
        wrapper.find('.success')

      expect(NattoUploadStateIconWrapper.classes().length).toBeGreaterThan(0)
    })

    it('Should display file icon when state is not set', () => {
      const wrapper = createWrapper()
      const fileIconWrapper = wrapper.findComponent(FileIcon)

      expect(fileIconWrapper.exists()).toBe(true)
    })
  })
})
