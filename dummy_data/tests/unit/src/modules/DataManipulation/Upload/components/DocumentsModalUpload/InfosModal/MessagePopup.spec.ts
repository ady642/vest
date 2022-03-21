import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { VueWrapper } from '@vue/test-utils'
import MessagePopup from '@/modules/DataManipulation/Upload/components/InfosModal/MessagePopup.vue'
import NattoDialogPopup from '@/Common/components/Modals/NattoDialogPopup.vue'
import useElement from 'tests/unit/utils/useElementStubs'

const { ElButton, ElDialog } = useElement()

const createWrapper = (title: string, description: string, popupType: string) =>
  wrapperFactory(MessagePopup, {
    propsData: {
      title,
      description,
      popupType
    },
    global: {
      stubs: { NattoDialogPopup, ElButton, ElDialog }
    }
  })

describe('MessagePopup', () => {
  describe('bindings', () => {
    describe('props', () => {
      it('Should pass title props without changes', () => {
        const wrapper = createWrapper(
          "I'am a title",
          "I'am a description",
          'error'
        )
        const nattoDialogPopupWrapper: VueWrapper<any> =
          wrapper.findComponent(NattoDialogPopup)

        expect(nattoDialogPopupWrapper.props().title).toBe("I'am a title")
      })

      it('Should pass description props without changes', () => {
        const wrapper = createWrapper(
          "I'am a title",
          "I'am a description",
          'error'
        )
        const nattoDialogPopupWrapper: VueWrapper<any> =
          wrapper.findComponent(NattoDialogPopup)

        expect(nattoDialogPopupWrapper.props().description).toBe(
          "I'am a description"
        )
      })

      it('Should pass popupType props without changes', () => {
        const wrapper = createWrapper(
          "I'am a title",
          "I'am a description",
          'error'
        )
        const nattoDialogPopupWrapper: VueWrapper<any> =
          wrapper.findComponent(NattoDialogPopup)

        expect(nattoDialogPopupWrapper.props().popupType).toBe('error')
      })
    })
  })
  describe('events', () => {
    it("Should fire 'cancel-clicked' when cancel button is clicked", () => {
      const wrapper = createWrapper(
        "I'am a title",
        "I'am a description",
        'error'
      )
      const nattoDialogPopupWrapper: VueWrapper<any> =
        wrapper.findComponent(NattoDialogPopup)

      nattoDialogPopupWrapper.vm.$emit('cancel-clicked')

      expect(wrapper.emitted('cancel-clicked')).toBeTruthy()
      expect(wrapper.emitted('cancel-clicked')).toHaveLength(1)
    })

    it("Should fire 'confirm-clicked' when confirm button is clicked", () => {
      const wrapper = createWrapper(
        "I'am a title",
        "I'am a description",
        'error'
      )
      const nattoDialogPopupWrapper: VueWrapper<any> =
        wrapper.findComponent(NattoDialogPopup)

      nattoDialogPopupWrapper.vm.$emit('confirm-clicked')

      expect(wrapper.emitted('confirm-clicked')).toBeTruthy()
      expect(wrapper.emitted('confirm-clicked')).toHaveLength(1)
    })
  })
})
