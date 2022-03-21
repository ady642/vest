import NattoTree from '@/Common/components/Tree/NattoTree.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'
import useElementStubs from 'tests/unit/utils/useElementStubs'

/****
 * Wrapper types
 */

export type NattoTreeWrapper = VueWrapper<ComponentPublicInstance>

/****
 * Wrapper creation
 */

const { ElTree } = useElementStubs()

const createWrapper = ({
  slots = {
    item: '<div id="test" />'
  }
} = {}): NattoTreeWrapper =>
  wrapperFactory(NattoTree, {
    global: {
      renderStubDefaultSlot: true,
      stubs: { ElTree }
    },
    slots
  })

let wrapper = createWrapper()

describe('NattoTree', () => {
  beforeEach(() => {
    wrapper = createWrapper()
  })

  describe('bindings with ElTree', () => {
    describe('rendering', () => {
      it('should render the item and pass the props', () => {
        expect(wrapper.find('#test').exists()).toBe(true)
      })
    })
  })
})
