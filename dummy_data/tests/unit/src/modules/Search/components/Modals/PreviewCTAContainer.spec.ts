import PreviewCTAContainer from '@/modules/Search/components/Modals/PreviewModal/PreviewModalHeader/CTAs/PreviewCTAContainer.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'
import NattoTooltip from '@/Common/components/Tooltips/NattoTooltip.vue'

/****
 * Wrapper types
 */
type PreviewCTAContainerProps = {
  tooltipContent?: string
  disabled?: boolean
}

export type PreviewCTAContainerWrapper = VueWrapper<
  ComponentPublicInstance<PreviewCTAContainerProps>
>
/****
 * Wrapper finders
 */

const findNattoTooltip = (wrapper: PreviewCTAContainerWrapper) =>
  wrapper.findComponent(NattoTooltip)

/****
 * Wrapper creation
 */
const defaultProps: PreviewCTAContainerProps = {
  tooltipContent: 'test',
  disabled: false
}

const createWrapper = (
  props = defaultProps,
  defaultSlot = '<div>test slot</div>'
): PreviewCTAContainerWrapper =>
  wrapperFactory(PreviewCTAContainer, {
    props,
    slots: {
      default: defaultSlot
    },
    global: {
      renderStubDefaultSlot: true
    }
  })

let wrapper = createWrapper()
let nattoTooltipWrapper = findNattoTooltip(wrapper)

describe('PreviewCTAContainer', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    nattoTooltipWrapper = findNattoTooltip(wrapper)
  })

  describe('bindings with NattoTooltip', () => {
    test('props bindings', () => {
      expect(nattoTooltipWrapper.props('content')).toBe('test')
      expect(nattoTooltipWrapper.props('disabled')).toBe(false)
    })
    it('should render the default slot', () => {
      expect(wrapper.text()).toContain('test slot')
    })
    describe('events', () => {
      it('should emit click when container is clicked', () => {})
    })
  })
})
