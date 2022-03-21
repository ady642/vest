import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'
import useFoldersData from 'tests/unit/src/modules/Search/mocks/FoldersDataMock'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import useElementStubs from 'tests/unit/utils/useElementStubs'

import NattoFoldersBrowser from '@/Common/components/Navigation/NattoFoldersBrowser.vue'
import Folder from '@/modules/Search/models/Folders/Inputs/Folder'
import Folders from '@/modules/Search/models/Folders/Inputs/Folders'
import UploadDocumentNavigator from '@/modules/DataManipulation/Upload/components/Navigation/UploadDocumentNavigator.vue'

const { FoldersData } = useFoldersData()
const { ElScrollbar } = useElementStubs()

export type UploadDocumentNavigatorTypeWrapper = VueWrapper<
  ComponentPublicInstance<{
    folders: Folder[]
    searchFolderId: number
    height: number
    disabled: boolean
  }>
>

const createWrapper = (
  folders: Folders,
  searchFolderId: number,
  height: number,
  disabled: boolean
): UploadDocumentNavigatorTypeWrapper =>
  wrapperFactory(UploadDocumentNavigator, {
    props: {
      folders,
      searchFolderId,
      height,
      disabled
    },
    global: {
      stubs: {
        NattoFoldersBrowser,
        ElScrollbar
      }
    }
  })

let wrapper = createWrapper(FoldersData, 1122, 160, false)

describe('UploadDocumentNavigator', () => {
  beforeEach(() => {
    wrapper = createWrapper(FoldersData, 1122, 160, false)
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
    })
    describe('events', () => {
      it('should fire update:searchFolderId when natto-folders-browser fire browser-folder-selected', () => {
        const NattoFoldersBrowserWrapper =
          wrapper.findComponent(NattoFoldersBrowser)

        NattoFoldersBrowserWrapper.vm.$emit('browser-folder-selected', 55)

        expect(wrapper.emitted('update:searchFolderId')).toBeTruthy()
        expect(wrapper.emitted()['update:searchFolderId'][0]).toStrictEqual([
          55
        ])
      })
      it('should not fire update:selectedFolderToUpload when natto-folders-browser fire browser-folder-selected and disabled is true', () => {
        const wrapper = createWrapper(FoldersData, 1122, 160, true)
        const NattoFoldersBrowserWrapper =
          wrapper.findComponent(NattoFoldersBrowser)

        NattoFoldersBrowserWrapper.vm.$emit('browser-folder-selected', 55)

        expect(wrapper.emitted('update:selectedFolderToUpload')).toBeFalsy()
      })
    })
  })
})
