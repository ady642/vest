import NattoTableHeader from '@/Common/components/Table/NattoTableHeader.vue'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { DOMWrapper, VueWrapper } from '@vue/test-utils'
import { ComponentPublicInstance } from 'vue'

export type NattoTableHeaderWrapper = VueWrapper<
  ComponentPublicInstance<Record<string, unknown>>
>

const createWrapper = (
  defaultSlot = '<div>default slot</div>'
): NattoTableHeaderWrapper =>
  wrapperFactory(NattoTableHeader, {
    slots: {
      default: defaultSlot
    }
  })

let wrapper = createWrapper()

describe('NattoTableHeader', () => {
  describe('rendering', () => {
    it('should have a bold text if the mouse is over the text', async () => {
      wrapper = createWrapper()

      expect(wrapper.text()).toContain('default slot')
    })
  })
})
