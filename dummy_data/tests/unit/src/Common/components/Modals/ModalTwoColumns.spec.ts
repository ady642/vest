import ModalTwoColumns from '@/Common/components/Modals/ModalTwoColumns.vue'
import NattoDialog from '@/Common/components/Modals/NattoDialog.vue'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { DOMWrapper, VueWrapper } from '@vue/test-utils'
import useElement from 'dummy_data/tests/unit/utils/useElementStubs'
import { ComponentPublicInstance } from 'vue'

const { ElDialog } = useElement()

const createWrapper = (modelValue = false, noPadding = false) =>
  wrapperFactory(ModalTwoColumns, {
    propsData: {
      modelValue,
      noPadding
    },
    global: {
      stubs: { NattoDialog, ElDialog }
    }
  })

const findNattoDialog = (wrapper: VueWrapper<ComponentPublicInstance>) =>
  wrapper.findComponent(NattoDialog)

let wrapper: VueWrapper<any> = createWrapper()

describe('ModalTwoColumns', () => {
  beforeEach(() => {
    wrapper = createWrapper()
  })
  describe('bindings', () => {
    describe('props', () => {
      it('Should pass modelValue props without changes', () => {
        // Construct a component with a value different than default false
        wrapper = createWrapper(true)

        // Check if ElDialog prop modelValue is true
        expect(findNattoDialog(wrapper).props().modelValue).toBe(true)
      })
    })
  })
  describe('rendering', () => {
    describe('noPadding prop', () => {
      it('modal should not had any padding', () => {
        const wrappper = createWrapper(true, true)

        const divSectionModal: DOMWrapper<HTMLDivElement> =
          wrappper.find('.modal-two-columns')

        expect(divSectionModal.classes('noPadding')).toBeTruthy()
      })
      it('modal should had a default padding', () => {
        const wrappper = createWrapper(false)

        const divSectionModal: DOMWrapper<HTMLDivElement> =
          wrappper.find('.modal-two-columns')

        expect(divSectionModal.classes('noPadding')).toBeFalsy()
      })
    })
  })
  describe('events', () => {
    test('ModalTwoColumns should trigger an update:modelValue event when ElDialog emits an update:modelValue event', () => {
      // When ElDialog emit an update:modelValue event (ModalTwoColumns <= ElDialog)
      const ElDialogWrapper = findNattoDialog(wrapper)

      ElDialogWrapper.vm.$emit('update:modelValue', true)

      // Then ModalTwoColumns should trigger an update:modelValue with same payload
      expect(wrapper.emitted('update:modelValue')).toEqual([[true]])
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    })
    it('ModalTwoColumns should trigger an on-modal-close event when ElDialog emits an close event', () => {
      // When ElDialog emit an update:modelValue event (ModalTwoColumns <= ElDialog)
      const ElDialogWrapper = findNattoDialog(wrapper)

      ElDialogWrapper.vm.$emit('close')

      // Then ModalTwoColumns should trigger an update:modelValue with same payload
      expect(wrapper.emitted('on-modal-close')).toBeTruthy()
    })
  })
})
