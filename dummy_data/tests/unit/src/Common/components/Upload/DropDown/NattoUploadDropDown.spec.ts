import NattoUploadDropDown from '@/Common/components/Upload/Dropdown/NattoUploadDropDown.vue'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { VueWrapper } from '@vue/test-utils'

const NattoUploadBtn = {
  template: '<div><slot></slot></div>',
  name: 'ElUpload',
  props: ['isDrag', 'targetInput']
}

const createWrapper = () =>
  wrapperFactory(NattoUploadDropDown, {
    global: {
      stubs: {
        NattoUploadBtn
      }
    }
  })

describe('natto-upload-dropdown', () => {
  describe('events', () => {
    it('Should emit on-change-files event on NattoUploadBtn click', async () => {
      const wrapper = createWrapper()
      const NattoUploadBtnWrapper = wrapper.findComponent(NattoUploadBtn)
      await NattoUploadBtnWrapper.vm.$emit('on-files-change')
      expect(wrapper.emitted('on-files-change')).toBeTruthy()
    })
  })
  describe('binding', () => {
    it('isDrag shoud be false', () => {
      const wrapper = createWrapper()
      const NattoUploadBtnWrapper: VueWrapper<any> =
        wrapper.findComponent(NattoUploadBtn)

      expect(NattoUploadBtnWrapper.vm.isDrag).toEqual(false)
    })
    it('target input should be .natto-upload-box input[type=file]', () => {
      const wrapper = createWrapper()
      const NattoUploadBtnWrapper: VueWrapper<any> =
        wrapper.findComponent(NattoUploadBtn)

      expect(NattoUploadBtnWrapper.vm.targetInput).toEqual(
        '.dropdown-upload-btn input[type=file]'
      )
    })
  })
})
