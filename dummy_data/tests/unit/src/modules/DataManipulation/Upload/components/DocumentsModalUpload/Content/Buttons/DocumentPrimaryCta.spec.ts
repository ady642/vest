import DocumentPrimaryCta from '@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Content/Buttons/DocumentPrimaryCta.vue'
import NattoPrimaryCta from '@/Common/components/Buttons/NattoPrimaryCta.vue'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'

const createWrapper = (action: string, disabled: boolean) =>
  wrapperFactory(DocumentPrimaryCta, {
    propsData: {
      action,
      disabled
    },
    global: {
      stubs: {
        NattoPrimaryCta
      }
    }
  })

describe('document-primary-cta', () => {
  describe('events', () => {
    describe('validate', () => {
      // it('Should emit validate event', async () => {
      //   const wrapper = createWrapper('validateNext', false)
      //   const button: DOMWrapper<any> = wrapper.find('.natto-primary-cta')
      //   await button.trigger('click')
      //   expect(wrapper.emitted('validate')).toBeTruthy()
      // })
    })
  })
  describe('binding', () => {
    describe('validate', () => {
      it('Should have teh same value ', () => {
        const wrapper = createWrapper('validateNext', false)

        expect(wrapper.vm.action).toEqual('validateNext')
        expect(wrapper.vm.disabled).toEqual(false)
      })
    })
  })
})
