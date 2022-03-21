import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { VueWrapper } from '@vue/test-utils'
import SecondaryCtaButton from '@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Content/Buttons/SecondaryCtaButton.vue'
import useStyleguide from 'tests/unit/utils/useStyleguideStubs'

const { MpButton } = useStyleguide()

const createWrapper = (folderName: string, disabled?: boolean) =>
  wrapperFactory(SecondaryCtaButton, {
    propsData: {
      folderName,
      disabled
    },
    global: {
      stubs: {
        MpButton
      }
    }
  })

describe('SecondaryCtaButton', () => {
  describe('bindings', () => {
    describe('props', () => {
      it('Should pass label props when folderName props is passed', () => {
        const wrapper = createWrapper('Achats')
        const bWrapper: VueWrapper<any> = wrapper.findComponent(MpButton)

        expect(bWrapper.text()).toStrictEqual(
          'ged.upload.uploadModal.uploadAll “Achats”'
        )
        expect(bWrapper.props('disabled')).toBeFalsy()
      })

      it('Should pass disabled props when disabled props is passed', () => {
        const wrapper = createWrapper('Achats', true)
        const bWrapper: VueWrapper<any> = wrapper.findComponent(MpButton)

        expect(bWrapper.props('disabled')).toBeTruthy()
      })
    })
  })
  describe('events', () => {
    it("Should fire 'clicked' when click-button is emitted", () => {
      const wrapper = createWrapper('Achats')
      const bWrapper: VueWrapper<any> = wrapper.findComponent(MpButton)

      bWrapper.trigger('click')

      expect(wrapper.emitted()['click'].length).toBe(1)
    })
  })
})
