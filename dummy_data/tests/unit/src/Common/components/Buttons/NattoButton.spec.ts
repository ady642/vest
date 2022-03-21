import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'

import NattoButton from '@/Common/components/Buttons/NattoButton.vue'

import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import useElementStubs from 'tests/unit/utils/useElementStubs'

/****
 * Wrapper types
 */
type NattoButtonProps = {
  nativeType?: string
  type?: string
  loading?: boolean
  disabled?: boolean
}

type NattoButtonSetup = unknown

export type NattoButtonWrapper = VueWrapper<
  ComponentPublicInstance<NattoButtonProps, NattoButtonSetup>
>
/****
 * Wrapper finders
 */

const { ElButton } = useElementStubs()

const findElButton = (wrapper: NattoButtonWrapper) =>
  wrapper.findComponent(ElButton)

/****
 * Wrapper creation
 */
const defaultProps: NattoButtonProps = {
  nativeType: 'button',
  disabled: false,
  loading: false,
  type: 'button'
}

const createWrapper = (props = defaultProps): NattoButtonWrapper =>
  wrapperFactory(NattoButton, {
    props,
    global: {
      stubs: {
        ElButton
      }
    }
  })

let wrapper = createWrapper()
let elButtonWrapper = findElButton(wrapper)

describe('NattoButton', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    elButtonWrapper = findElButton(wrapper)
  })

  describe('bindings with ElButton', () => {
    test('props bindings', () => {
      expect(elButtonWrapper.attributes('native-type')).toBe('button')
      expect(elButtonWrapper.attributes('type')).toBe('button')
      expect(elButtonWrapper.attributes('disabled')).toBe('false')
      expect(elButtonWrapper.attributes('loading')).toBe('false')
    })
  })
})
