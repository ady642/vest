import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { VueWrapper } from '@vue/test-utils'
import { ComponentPublicInstance } from 'vue'
import NattoDropdown from '@/Common/components/Dropdown/NattoDropdown.vue'
import FolderActionsDropdown from '@/modules/Search/components/Navigation/FolderActionsDropdown/FolderActionsDropdown.vue'
import Folder from '@/modules/Search/models/Folders/Inputs/Folder'
import { FolderActionsDropdownListWrapper } from './FolderActionsDropdownList/FolderActionsDropdownList.spec'
import FolderActionsDropdownList from '@/modules/Search/components/Navigation/FolderActionsDropdown/FolderActionsDropdownList/FolderActionsDropdownList.vue'
import { Category } from '@/modules/Search/types'
import useElementStubs from 'tests/unit/utils/useElementStubs'

const { ElDropdown, ElDropdownMenu } = useElementStubs()

type FolderActionsDropdownProps = {
  folder: Folder
}

type FolderActionsDropdownSetup = unknown

export type FolderActionsDropdownWrapper = VueWrapper<
  ComponentPublicInstance<
    FolderActionsDropdownProps,
    FolderActionsDropdownSetup
  >
>

const defaultProps: FolderActionsDropdownProps = {
  folder: new Folder({ id: 4521, children: [] as Category[] } as Category)
}

const createWrapper = (props = defaultProps): FolderActionsDropdownWrapper =>
  wrapperFactory(FolderActionsDropdown, {
    props,
    global: {
      stubs: {
        NattoDropdown,
        ElDropdown,
        ElDropdownMenu
      }
    }
  })

const findFolderActionsDropdownListWrapper = (
  wrapper: FolderActionsDropdownWrapper
): FolderActionsDropdownListWrapper =>
  wrapper.findComponent(FolderActionsDropdownList)

let wrapper = createWrapper()

describe('FolderActionsDropdown', () => {
  beforeEach(() => {
    wrapper = createWrapper()
  })

  describe('bindings with FolderActionsDropdownList', () => {
    it('props binding', () => {
      const folderActionsDropdownListWrapper =
        findFolderActionsDropdownListWrapper(wrapper)

      expect(folderActionsDropdownListWrapper.props('folderId')).toBe(4521)
    })
    describe('events binding', () => {
      it('should send delete-clicked event with folder when FolderActionsDropdownList emit an item-clicked event with delete as action', async () => {
        // When FolderActionsDropdownList emit an item-clicked event with delete action
        const folderActionsDropdownListWrapper =
          findFolderActionsDropdownListWrapper(wrapper)

        await folderActionsDropdownListWrapper.vm.$emit(
          'item-clicked',
          'delete'
        )

        // Then FolderActionsDropdown should send 1 delete-clicked event with folder as payload
        expect(wrapper.emitted('delete-clicked')).toHaveLength(1)
        expect(wrapper.emitted('delete-clicked')).toStrictEqual([
          [new Folder({ id: 4521, children: [] as Category[] } as Category)]
        ])
      })
    })
  })
})
