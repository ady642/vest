import DocumentActionDropdownItem from '@/modules/Search/components/DocumentsTable/DocumentsTableItems/DocumentActionDropdownItem.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'
import { NattoDropdownItemWrapper } from 'tests/unit/src/Common/components/Dropdowns/NattoDropdownItem.spec'
import NattoDropdownItem from '@/Common/components/Dropdown/NattoDropdownItem.vue'

/****
 * Wrapper types
 */
type DocumentActionDropdownItemProps = {
  label: string
  icon: string
  disabled: boolean
  tooltipContent?: string
}

export type DocumentActionDropdownItemWrapper = VueWrapper<
  ComponentPublicInstance<DocumentActionDropdownItemProps>
>
/****
 * Wrapper finders
 */

const findNattoDropdownItem = (
  wrapper: DocumentActionDropdownItemWrapper
): NattoDropdownItemWrapper => wrapper.findComponent(NattoDropdownItem)

/****
 * Wrapper creation
 */
const defaultProps: DocumentActionDropdownItemProps = {
  label: 'test',
  icon: 'delete',
  disabled: false,
  tooltipContent: 'je suis le tooltipContent'
}

const createWrapper = (
  props = defaultProps
): DocumentActionDropdownItemWrapper =>
  wrapperFactory(DocumentActionDropdownItem, {
    props
  })

let wrapper = createWrapper()
let nattoDropdownItemWrapper = findNattoDropdownItem(wrapper)

describe('DocumentActionDropdownItem', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    nattoDropdownItemWrapper = findNattoDropdownItem(wrapper)
  })

  describe('bindings with NattoDialogPopup', () => {
    test('props bindings', () => {
      expect(nattoDropdownItemWrapper.props('label')).toBe('test')
      expect(nattoDropdownItemWrapper.props('icon')).toBe('delete')
      expect(nattoDropdownItemWrapper.props('disabled')).toBe(false)
      expect(nattoDropdownItemWrapper.props('tooltipContent')).toBe(
        'je suis le tooltipContent'
      )
    })
  })
})
