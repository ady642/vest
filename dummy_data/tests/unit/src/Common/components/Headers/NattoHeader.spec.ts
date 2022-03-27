import NattoHeader from '@/Common/components/Header/NattoHeader.vue'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import useStyleguideStubs from 'dummy_data/tests/unit/utils/useStyleguideStubs'

const { MpTitle } = useStyleguideStubs()

const createWrapper = ({
  slots = {
    subHeader: '<div>Je suis le subHeader</div>',
    cta: '<div>Je suis les CTAs</div>'
  }
} = {}) =>
  wrapperFactory(NattoHeader, {
    slots,
    global: {
      stubs: {
        MpTitle
      }
    }
  })

const wrapper = createWrapper()

describe('NattoHeader', () => {
  describe('rendering', () => {
    it('should fill the slots', () => {
      console.log(wrapper.text())
      expect(wrapper.text()).toContain('Je suis le subHeader')
      expect(wrapper.text()).toContain('Je suis les CTAs')
    })
  })
})
