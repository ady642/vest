import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'
import useFoldersData from 'dummy_data/tests/unit/src/modules/Search/mocks/FoldersDataMock'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import useElementStubs from 'dummy_data/tests/unit/utils/useElementStubs'
import Folder from '@/modules/Search/models/Folders/Inputs/Folder'
import NattoFoldersBrowser from '@/Common/components/Navigation/NattoFoldersBrowser.vue'
import Folders from '@/modules/Search/models/Folders/Inputs/Folders'
import DocumentsFoldersBrowser from '@/modules/Search/components/Navigation/DocumentsFoldersBrowser.vue'
import FolderActionsDropdown from '@/modules/Search/components/Navigation/FolderActionsDropdown/FolderActionsDropdown.vue'
import DeleteFolderModalConfirmation from '@/modules/DataManipulation/Delete/DeleteFolder/components/Modals/DeleteFolderModalConfirmation.vue'
import { Category } from '@/modules/Search/types'
import GedSyncStatusIcon from '@/Common/components/Icons/GedSyncStatusIcon.vue'

const { FoldersData } = useFoldersData()
const { ElScrollbar } = useElementStubs()

export type DocumentsFoldersBrowserTypeWrapper = VueWrapper<
  ComponentPublicInstance<{
    folders: Folder[]
    searchFolderId: number
    height: number
    disabled: boolean
    inUpload: boolean
    isCollabUser: boolean
  }>
>

const createWrapper = (
  folders: Folders,
  searchFolderId: number,
  height: number,
  disabled: boolean,
  inUpload: boolean,
  isCollabUser: boolean
): DocumentsFoldersBrowserTypeWrapper =>
  wrapperFactory(DocumentsFoldersBrowser, {
    props: {
      folders,
      searchFolderId,
      height,
      disabled,
      inUpload,
      isCollabUser
    },
    global: {
      stubs: {
        NattoFoldersBrowser,
        ElScrollbar
      }
    }
  })

const findFolderActionsDropdown = (
  wrapper: DocumentsFoldersBrowserTypeWrapper
) => wrapper.findComponent(FolderActionsDropdown)

const findDeleteFolderModalConfirmation = (
  wrapper: DocumentsFoldersBrowserTypeWrapper
) => wrapper.findComponent(DeleteFolderModalConfirmation)

const wrapper = createWrapper(FoldersData, 1122, 160, false, false, false)

describe('documents-folders-browser', () => {
  describe('rendering', () => {
    it('should render ged sync icon when isCollabUser is true', () => {
      let wrapper = createWrapper(FoldersData, 1122, 160, false, false, true)

      const GedSyncStatusIconWrapper = wrapper.findComponent(GedSyncStatusIcon)

      const syncSuccessIconWrapper =
        GedSyncStatusIconWrapper.find('.sync-success')
      const syncPendingIconWrapper =
        GedSyncStatusIconWrapper.find('.sync-pending')
      const syncFailedIconWrapper = GedSyncStatusIconWrapper.find('.sync-fail')

      expect(syncSuccessIconWrapper.exists).toBeTruthy()
      expect(syncPendingIconWrapper.exists).toBeTruthy()
      expect(syncFailedIconWrapper.exists).toBeTruthy()
    })

    it('should not render ged sync icon when isCollabUser is false', () => {
      expect(wrapper.findComponent(GedSyncStatusIcon).exists()).toBeFalsy()
    })
  })
  describe('binding', () => {
    describe('props', () => {
      it('Should have a correct folders binding', () => {
        const NattoFoldersBrowserWrapper =
          wrapper.findComponent(NattoFoldersBrowser)

        expect(NattoFoldersBrowserWrapper.props('folders')).toHaveLength(1)
      })
      it('Should have the correct height value', () => {
        const NattoFoldersBrowserWrapper =
          wrapper.findComponent(NattoFoldersBrowser)

        expect(NattoFoldersBrowserWrapper.props('height')).toEqual(160)
      })
      it('Should pass the correct disabled prop to child component', () => {
        const NattoFoldersBrowserWrapper =
          wrapper.findComponent(NattoFoldersBrowser)

        expect(NattoFoldersBrowserWrapper.props('disabled')).toEqual(
          wrapper.vm.disabled
        )
      })
      it('Should pass the correct inUpload prop to child component', () => {
        const NattoFoldersBrowserWrapper =
          wrapper.findComponent(NattoFoldersBrowser)

        expect(NattoFoldersBrowserWrapper.props('inUpload')).toEqual(
          wrapper.vm.inUpload
        )
      })
    })
    describe('events', () => {
      it('should fire update:selectedFolderToUpload when natto-folders-browser fire browser-folder-selected', () => {
        const NattoFoldersBrowserWrapper =
          wrapper.findComponent(NattoFoldersBrowser)

        NattoFoldersBrowserWrapper.vm.$emit('browser-folder-selected', 55)

        expect(wrapper.emitted('update:searchFolderId')).toBeTruthy()
        expect(wrapper.emitted()['update:searchFolderId'][0]).toStrictEqual([
          55
        ])
      })
      it('should not fire update:selectedFolderToUpload when natto-folders-browser fire browser-folder-selected and disabled is true', () => {
        const wrapper = createWrapper(FoldersData, 1122, 160, true, false, false)
        const NattoFoldersBrowserWrapper =
          wrapper.findComponent(NattoFoldersBrowser)

        NattoFoldersBrowserWrapper.vm.$emit('browser-folder-selected', 55)

        expect(wrapper.emitted('update:selectedFolderToUpload')).toBeFalsy()
      })
      it('should open DeleteFolderModal when delete-clicked is clicked', async () => {
        // When FolderActionsDropdown emit delete-item
        const folderActionsDropdownWrapper = findFolderActionsDropdown(wrapper)

        await folderActionsDropdownWrapper.vm.$emit(
          'delete-clicked',
          new Folder({ id: 4521, name: 'home' } as Category)
        )

        // Then DeleteFolderModalConfirmation must be opened
        const deleteFolderModalConfirmationWrapper =
          findDeleteFolderModalConfirmation(wrapper)

        expect(deleteFolderModalConfirmationWrapper.props('modelValue')).toBe(
          true
        )
        expect(deleteFolderModalConfirmationWrapper.props('folderName')).toBe(
          'home'
        )
        expect(deleteFolderModalConfirmationWrapper.props('folderId')).toBe(
          4521
        )
      })
    })
  })
})
