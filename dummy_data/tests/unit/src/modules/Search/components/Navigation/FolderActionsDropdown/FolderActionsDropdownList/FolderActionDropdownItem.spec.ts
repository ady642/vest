import FolderActionDropdownItem from '@/modules/Search/components/Navigation/FolderActionsDropdown/FolderActionsDropdownList/FolderActionDropdownItem.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'
import useElementStubs from 'tests/unit/utils/useElementStubs'
import NattoDropdownItem from '@/Common/components/Dropdown/NattoDropdownItem.vue'
import { NattoDropdownItemWrapper } from 'tests/unit/src/Common/components/Dropdowns/NattoDropdownItem.spec'
import constants from '@/Common/constants'

const { ElDropdownItem } = useElementStubs()

export type FolderActionDropdownItemProps = {
  icon?: string
  label: string
  disabled?: boolean
}

type FolderActionDropdownItemSetup = unknown

export type FolderActionDropdownItemWrapper = VueWrapper<
  ComponentPublicInstance<
    FolderActionDropdownItemProps,
    FolderActionDropdownItemSetup
  >
>

const defaultProps: FolderActionDropdownItemProps = {
  label: 'test'
}

const createWrapper = (props = defaultProps): FolderActionDropdownItemWrapper =>
  wrapperFactory(FolderActionDropdownItem, {
    props,
    global: {
      stubs: { ElDropdownItem, NattoDropdownItem }
    }
  })

let wrapper = createWrapper()
const findNattoDropdownItem = (
  wrapper: FolderActionDropdownItemWrapper
): NattoDropdownItemWrapper => wrapper.findComponent(NattoDropdownItem)

describe('FolderActionDropdownItem', () => {
  beforeEach(() => {
    wrapper = createWrapper()
  })
  describe('bindings with ElDropdownItem', () => {
    it('props <=> :props', () => {
      // Given FolderActionDropdownItem receive props
      wrapper = createWrapper({
        icon: 'delete',
        label: 'Supprimer',
        disabled: false
      })

      // Then ElDropdownItem must receive those props
      const nattoDropdownItemWrapper = findNattoDropdownItem(wrapper)

      expect(nattoDropdownItemWrapper.props('icon')).toBe('delete')
      expect(nattoDropdownItemWrapper.props('disabled')).toBe(false)
      expect(nattoDropdownItemWrapper.props('label')).toBe('Supprimer')
      expect(nattoDropdownItemWrapper.props('tooltipContent')).toBe(
        constants.messages.folders.delete.error
      )
    })
  })
})
