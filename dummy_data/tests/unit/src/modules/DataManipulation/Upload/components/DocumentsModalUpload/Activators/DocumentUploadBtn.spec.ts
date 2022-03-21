import DocumentsUploadBtn from '@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Activators/DocumentsUploadBtn.vue'
import NattoUploadDropdown from '@/Common/components/Upload/Dropdown/NattoUploadDropDown.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import NattoUploadFilesBtn from '@/Common/components/Upload/Buttons/NattoUploadFilesBtn.vue'

const createWrapper = (
  supportedTypes: string[],
  disabled: boolean,
  canUploadFiles: boolean,
  hasAccessDs: boolean,
  isMainViewBtn: boolean
) =>
  wrapperFactory(DocumentsUploadBtn, {
    propsData: {
      supportedTypes,
      disabled,
      canUploadFiles,
      hasAccessDs,
      isMainViewBtn
    },
    global: {
      stubs: {
        NattoUploadDropdown,
        NattoUploadFilesBtn
      },
      mocks: {
        $tc: (key: string, params: Record<string, any>) =>
          params ? `${key} with ${JSON.stringify(params)}` : key
      }
    }
  })
let wrapper = createWrapper(['ext1', 'ext2'], false, true, true, true)

describe('document-upload-btn', () => {
  beforeEach(() => {
    wrapper = createWrapper(['ext1', 'ext2'], false, true, true, true)
  })
  describe('binding', () => {
    it('Should have the correct values passed', async () => {
      const NattoUploadFilesBtnWrapper =
        wrapper.findComponent(NattoUploadFilesBtn)

      expect(wrapper.props('disabled')).toEqual(
        NattoUploadFilesBtnWrapper.props('disabled')
      )
    })
    it('Should have the correct  canUploadFiles value passed', async () => {
      const NattoUploadFilesBtnWrapper =
        wrapper.findComponent(NattoUploadFilesBtn)

      expect(wrapper.props('canUploadFiles')).toEqual(
        NattoUploadFilesBtnWrapper.props('canUploadFiles')
      )
    })
    it('Should have the correct  hasAccessDs value passed', async () => {
      const NattoUploadFilesBtnWrapper =
        wrapper.findComponent(NattoUploadFilesBtn)

      expect(wrapper.props('hasAccessDs')).toEqual(
        NattoUploadFilesBtnWrapper.props('hasAccessDs')
      )
    })
    it('Should have the correct  hasAccessDs value passed', async () => {
      const NattoUploadFilesBtnWrapper =
        wrapper.findComponent(NattoUploadFilesBtn)

      expect(wrapper.props('isMainViewBtn')).toEqual(
        NattoUploadFilesBtnWrapper.props('isMainViewBtn')
      )
    })
  })
})
