import NattoTag from '@/Common/components/Tags/NattoTag.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'
import useElement from 'tests/unit/utils/useElementStubs'

/****
 * Wrapper types
 */
type NattoTagProps = {
  closable?: boolean
}

type NattoTagSetup = unknown

export type NattoTagWrapper = VueWrapper<
  ComponentPublicInstance<NattoTagProps, NattoTagSetup>
>
/****
 * Wrapper finders
 */

const { ElTag } = useElement()

const findElTag = (wrapper: NattoTagWrapper) =>
  wrapper.findComponent({ name: 'el-tag' })

/****
 * Wrapper creation
 */
const defaultProps: NattoTagProps = {
  closable: false
}

const createWrapper = ({
  props = defaultProps,
  defaultSlot = '<div/>'
} = {}): NattoTagWrapper =>
  wrapperFactory(NattoTag, {
    props,
    global: {
      stubs: { ElTag }
    },
    slots: {
      default: defaultSlot
    }
  })

let wrapper = createWrapper()
let elTagWrapper = findElTag(wrapper)

describe('NattoTag', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    elTagWrapper = findElTag(wrapper)
  })

  describe('bindings with ElTag', () => {
    test('props bindings', () => {
      expect(elTagWrapper.attributes('closable')).toBe('false')
    })
    test('slot default rendering', () => {
      wrapper = createWrapper({ defaultSlot: '<div>Columbo</div>' })

      elTagWrapper = findElTag(wrapper)
      expect(elTagWrapper.text()).toBe('Columbo')
    })
  })
})
