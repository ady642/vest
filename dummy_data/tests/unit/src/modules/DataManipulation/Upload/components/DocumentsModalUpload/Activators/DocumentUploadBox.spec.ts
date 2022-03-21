import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import DocumentsUploadBox from '@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Activators/DocumentsUploadBox.vue'
import NattoUploadBox from '@/Common/components/Upload/Box/NattoUploadBox.vue'

const createWrapper = (supportedTypes: string[], disabled: boolean) =>
  wrapperFactory(DocumentsUploadBox, {
    propsData: {
      supportedTypes,
      disabled
    },
    global: {
      stubs: {
        NattoUploadBox
      }
    }
  })

describe('document-upload-box', () => {
  describe('binding', () => {
    it('Should pass the correct values', async () => {
      const wrapper = createWrapper(['ext1', 'ext2'], false)
      const NattoUploadBtnWrapper = wrapper.findComponent(NattoUploadBox)

      expect(NattoUploadBtnWrapper.vm.disabled).toEqual(
        NattoUploadBtnWrapper.vm.disabled
      )
      expect(NattoUploadBtnWrapper.vm.supportedTypes).toHaveLength(2)
    })
  })
})
