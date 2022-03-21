import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'

import CancelButton from '@/modules/DataManipulation/Create/CreateFolder/components/CancelButton.vue'
import NattoButton from '@/Common/components/Buttons/NattoButton.vue'

import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import useElementStubs from 'tests/unit/utils/useElementStubs'

/****
 * Wrapper types
 */
type CancelButtonProps = {
  disabled?: boolean
}

type CancelButtonSetup = unknown

export type CancelButtonWrapper = VueWrapper<
  ComponentPublicInstance<CancelButtonProps, CancelButtonSetup>
>
/****
 * Wrapper finders
 */

const findNattoButton = (wrapper: CancelButtonWrapper) =>
  wrapper.findComponent(NattoButton)

/****
 * Wrapper creation
 */
const defaultProps: CancelButtonProps = {
  disabled: false
}

const { ElButton } = useElementStubs()

const createWrapper = (props = defaultProps): CancelButtonWrapper =>
  wrapperFactory(CancelButton, {
    props,
    global: {
      stubs: {
        NattoButton,
        ElButton
      }
    }
  })

let wrapper = createWrapper()
let nattoButtonWrapper = findNattoButton(wrapper)

describe('CancelButton', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    nattoButtonWrapper = findNattoButton(wrapper)
  })

  describe('bindings with NattoButton', () => {
    test('props bindings', () => {
      expect(nattoButtonWrapper.props('disabled')).toBe(false)
    })
    it('should render the Create translation key', () => {
      expect(wrapper.text()).toContain('ged.dataManipulation.label.cancel')
    })
  })
})
