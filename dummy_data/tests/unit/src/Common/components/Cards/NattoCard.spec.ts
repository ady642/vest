import NattoCard from '@/Common/components/Cards/NattoCard.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import useStyleguideStubs from 'tests/unit/utils/useStyleguideStubs'

const { MpInCard } = useStyleguideStubs()

const createWrapper = (defaultSlot = '<div>I fill the default slot</div>') =>
  wrapperFactory(NattoCard, {
    slots: {
      default: defaultSlot
    },
    global: {
      stubs: { MpInCard }
    }
  })

let wrapper = createWrapper()

describe('NattoCard', () => {
  beforeEach(() => {
    wrapper = createWrapper()
  })

  describe('rendering', () => {
    it('should render the default slot', () => {
      wrapper = createWrapper('<div>Je suis le default slot</div>')

      expect(wrapper.html()).toContain('Je suis le default slot')
    })
  })
})
