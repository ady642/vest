import NattoError from '@/Common/components/Inputs/NattoError.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'

/****
 * Wrapper types
 */
type NattoErrorProps = {
  errorMessage?: string
}

type NattoErrorSetup = unknown

export type NattoErrorWrapper = VueWrapper<
  ComponentPublicInstance<NattoErrorProps, NattoErrorSetup>
>

/****
 * Wrapper creation
 */
const defaultProps: NattoErrorProps = {
  errorMessage: ''
}

const createWrapper = (props = defaultProps): NattoErrorWrapper =>
  wrapperFactory(NattoError, {
    props
  })

let wrapper = createWrapper()

describe('NattoError', () => {
  beforeEach(() => {
    wrapper = createWrapper()
  })

  describe('rendering', () => {
    test('should render the error', () => {
      wrapper = createWrapper({ errorMessage: 'error' })

      expect(wrapper.text()).toContain('error')
    })
  })
})
