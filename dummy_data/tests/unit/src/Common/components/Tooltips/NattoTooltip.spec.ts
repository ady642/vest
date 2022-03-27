import NattoTooltip from '@/Common/components/Tooltips/NattoTooltip.vue'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'
import useElementStubs from 'dummy_data/tests/unit/utils/useElementStubs'

/****
 * Wrapper types
 */
type NattoTooltipProps = {
  disabled?: boolean
  placement?: string
  content?: string
}

type NattoTooltipSetup = unknown

export type NattoTooltipWrapper = VueWrapper<
  ComponentPublicInstance<NattoTooltipProps, NattoTooltipSetup>
>

/****
 * Wrapper finders
 */
const { ElTooltip } = useElementStubs()
const findElTooltip = (wrapper: NattoTooltipWrapper) =>
  wrapper.findComponent(ElTooltip)

/****
 * Wrapper creation
 */
const defaultProps: NattoTooltipProps = {
  disabled: false,
  placement: 'right',
  content: 'columbo'
}
const createWrapper = ({
  props = defaultProps,
  defaultSlot = '<div/>',
  contentSlot = '<div/>'
} = {}): NattoTooltipWrapper =>
  wrapperFactory(NattoTooltip, {
    props,
    slots: {
      default: defaultSlot,
      content: contentSlot
    },
    global: {
      stubs: {
        ElTooltip
      }
    }
  })

let wrapper = createWrapper()
let elTooltipWrapper = findElTooltip(wrapper)

describe('NattoTooltip', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    elTooltipWrapper = findElTooltip(wrapper)
  })
  describe('bindings with NattoDialogPopup', () => {
    test('props bindings', () => {
      expect(elTooltipWrapper.attributes('disabled')).toBe('false')
      expect(elTooltipWrapper.attributes('placement')).toBe('right')
      expect(elTooltipWrapper.attributes('content')).toBe('columbo')
    })

    describe('rendering', () => {
      it('should render the default slot', () => {
        wrapper = createWrapper({
          defaultSlot: '<div>columbo</div>'
        })

        expect(wrapper.text()).toContain('columbo')
      })
      it('should not render the content slot if the content prop is set', () => {
        wrapper = createWrapper({
          props: {
            content: 'test'
          },
          contentSlot: 'je ne dois pas apparaitre'
        })

        expect(wrapper.text()).not.toContain('je ne dois pas apparaitre')
      })
      it('should render the content slot if the content prop is not set', () => {
        wrapper = createWrapper({
          props: {
            content: ''
          },
          contentSlot: 'je dois apparaitre'
        })

        expect(wrapper.text()).toContain('je dois apparaitre')
      })
    })
  })
})
