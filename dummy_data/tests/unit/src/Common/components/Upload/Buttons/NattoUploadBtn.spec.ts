import NattoUploadBtn from '@/Common/components/Upload/Buttons/NattoUploadBtn.vue'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { VueWrapper } from '@vue/test-utils'
const ElUpload = {
  template: '<div><slot></slot></div>',
  name: 'ElUpload',
  props: ['httpRequest', 'onChange', 'fileList', 'showFileList']
}

const createWrapper = () =>
  wrapperFactory(NattoUploadBtn, {
    global: {
      stubs: {
        ElUpload
      }
    }
  })

describe('natto-upload-btn', () => {
  describe('binding', () => {
    it('shoud have the same httpRequest property', () => {
      const wrapper = createWrapper()
      const ElUploadWrapper: VueWrapper<any> = wrapper.findComponent(ElUpload)

      expect(ElUploadWrapper.vm.httpRequest).toBe(wrapper.vm.emitFilesEvent)
    })
    it('shoud have the same fileList property', () => {
      const wrapper = createWrapper()
      const ElUploadWrapper: VueWrapper<any> = wrapper.findComponent(ElUpload)

      expect(ElUploadWrapper.vm.fileList).toBe(wrapper.vm.fileList)
    })
    it('shoud have showFileList as false', () => {
      const wrapper = createWrapper()
      const ElUploadWrapper: VueWrapper<any> = wrapper.findComponent(ElUpload)

      expect(ElUploadWrapper.vm.showFileList).toEqual(false)
    })
  })
})
