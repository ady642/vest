import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'

import SaveButton from '@/modules/DataManipulation/Create/CreateFolder/components/SaveButton.vue'
import NattoButton from '@/Common/components/Buttons/NattoButton.vue'

import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import useElementStubs from 'tests/unit/utils/useElementStubs'

/****
 * Wrapper types
 */
type SaveButtonProps = {
  loading?: boolean
  disabled?: boolean
}

type SaveButtonSetup = unknown

export type SaveButtonWrapper = VueWrapper<
  ComponentPublicInstance<SaveButtonProps, SaveButtonSetup>
>
/****
 * Wrapper finders
 */

const findNattoButton = (wrapper: SaveButtonWrapper) =>
  wrapper.findComponent(NattoButton)

/****
 * Wrapper creation
 */
const defaultProps: SaveButtonProps = {
  loading: false,
  disabled: false
}

const { ElButton } = useElementStubs()

const createWrapper = (props = defaultProps): SaveButtonWrapper =>
  wrapperFactory(SaveButton, {
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

describe('SaveButton', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    nattoButtonWrapper = findNattoButton(wrapper)
  })

  describe('bindings with NattoButton', () => {
    test('props bindings', () => {
      expect(nattoButtonWrapper.props('nativeType')).toBe('submit')
      expect(nattoButtonWrapper.props('loading')).toBe(false)
      expect(nattoButtonWrapper.props('disabled')).toBe(false)
    })
    it('should render the Create translation key', () => {
      expect(wrapper.text()).toContain('ged.dataManipulation.label.create')
    })
  })
})
