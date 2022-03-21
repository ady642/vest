import NattoBadge from '@/Common/components/Badges/NattoBadge.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import useElement from 'tests/unit/utils/useElementStubs'
import { VueWrapper } from '@vue/test-utils'
const { ElBadge } = useElement()

const createWrapper = (
  defaultSlot = '<div>I fill the default slot</div>',
  value: number
) =>
  wrapperFactory(NattoBadge, {
    slots: {
      default: defaultSlot
    },
    global: {
      stubs: { ElBadge }
    },
    props: {
      value
    }
  })

let wrapper = createWrapper('<div>I fill the default slot</div>', 2)

describe('NattoBadge', () => {
  beforeEach(() => {
    wrapper = createWrapper('<div>I fill the default slot</div>', 2)
  })

  describe('binding', () => {
    it('props', () => {
      const badgeWrapper: VueWrapper<any> = wrapper.findComponent(ElBadge)

      expect(badgeWrapper.attributes('value')).toBe('2')
    })
  })

  describe('rendering', () => {
    it('should render the default slot', () => {
      expect(wrapper.html()).toContain('I fill the default slot')
    })
  })
})
