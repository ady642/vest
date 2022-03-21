import FolderActionsDropdownList from '@/modules/Search/components/Navigation/FolderActionsDropdown/FolderActionsDropdownList/FolderActionsDropdownList.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { NattoDropdownItemProps } from 'tests/unit/src/Common/components/Dropdowns/NattoDropdownItem.spec'
import { VueWrapper } from '@vue/test-utils'
import { ComponentPublicInstance } from 'vue'
import FolderActionDropdownItem from '@/modules/Search/components/Navigation/FolderActionsDropdown/FolderActionsDropdownList/FolderActionDropdownItem.vue'
import { createDeleteFolderStoreMocked } from 'tests/unit/__mocks__/storeMock'

/*******
 Wrapper types
 *******/
type FolderActionsDropdownListProps = {
  folderId: number
}

type FolderActionsDropdownListSetup = {
  folderActions: NattoDropdownItemProps[]
}

export type FolderActionsDropdownListWrapper = VueWrapper<
  ComponentPublicInstance<
    FolderActionsDropdownListProps,
    FolderActionsDropdownListSetup
  >
>

/*******
 Wrapper Creation
 *******/
const defaultProps: FolderActionsDropdownListProps = {
  folderId: 4521
}
const storeMock = createDeleteFolderStoreMocked()

const createWrapper = (
  props = defaultProps,
  store = storeMock
): FolderActionsDropdownListWrapper =>
  wrapperFactory(FolderActionsDropdownList, {
    props,
    global: {
      plugins: [store],
      stubs: {
        FolderActionDropdownItem
      }
    }
  })

const findFolderActionsDropdownItemWrappers = (
  wrapper: FolderActionsDropdownListWrapper
): VueWrapper<ComponentPublicInstance>[] =>
  wrapper.findAllComponents(FolderActionDropdownItem)

let wrapper = createWrapper()

/*******
 Tests
 *******/
describe('FolderActionsDropdownList', () => {
  beforeEach(() => {
    wrapper = createWrapper()
  })

  describe('bindings with FolderActionsDropdownItem', () => {
    it('should render 1 FolderActionsDropdownItem', () => {
      expect(findFolderActionsDropdownItemWrappers(wrapper)).toHaveLength(1)
    })
    it('should emit item-click with folderId when FolderActionsDropdownItem emit click', async () => {
      // When FolderActionsDropdownItem emit click
      const folderActionsDropdownItemWrapper =
        findFolderActionsDropdownItemWrappers(wrapper)[0]

      await folderActionsDropdownItemWrapper.vm.$emit('click')

      // Then it should emit item-click with action name
      expect(wrapper.emitted('item-clicked')).toHaveLength(1)
      expect(wrapper.emitted('item-clicked')).toStrictEqual([['delete']])
    })
    describe('item disabled depending on store getters', () => {
      const cases = [
        {
          hasPermissionToDeleteFolder: false,
          isFolderDeletable: false,
          expectedDisabled: true
        },
        {
          hasPermissionToDeleteFolder: false,
          isFolderDeletable: true,
          expectedDisabled: true
        },
        {
          hasPermissionToDeleteFolder: true,
          isFolderDeletable: false,
          expectedDisabled: true
        },
        {
          hasPermissionToDeleteFolder: true,
          isFolderDeletable: true,
          expectedDisabled: false
        }
      ]

      it.each(cases)(
        'should return $expectedDisabled when hasPermissionToDelete = $hasPermissionToDelete / isFolderDeletable = $isFolderDeletable',
        ({
          hasPermissionToDeleteFolder,
          isFolderDeletable,
          expectedDisabled
        }) => {
          // Given
          wrapper = createWrapper(
            defaultProps,
            createDeleteFolderStoreMocked({
              hasPermissionToDeleteFolder,
              isFolderDeletable
            })
          )

          // Then
          const folderActionsDropdownItemWrapper =
            findFolderActionsDropdownItemWrappers(wrapper)[0]

          expect(folderActionsDropdownItemWrapper.props('disabled')).toBe(
            expectedDisabled
          )
        }
      )
    })
  })
})
