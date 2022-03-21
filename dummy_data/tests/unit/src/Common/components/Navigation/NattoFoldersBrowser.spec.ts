import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'
import NattoFoldersBrowser from '@/Common/components/Navigation/NattoFoldersBrowser.vue'
import useFoldersData from 'tests/unit/src/modules/Search/mocks/FoldersDataMock'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import Folder from '@/modules/Search/models/Folders/Inputs/Folder'
import useElement from 'tests/unit/utils/useElementStubs'
import GedSyncStatusIcon from '@/Common/components/Icons/GedSyncStatusIcon.vue'

const { FoldersData } = useFoldersData()

const { ElScrollbar } = useElement()

export type NattoFoldersBrowserTypeWrapper = VueWrapper<
  ComponentPublicInstance<
    { folders: Folder[]; height: number; disabled: boolean; inUpload: boolean },
    {
      handleClick: (folderId: number) => void
    }
  >
>

const createWrapper = (
  folders: Folder[],
  height: number,
  disabled: boolean,
  inUpload: boolean
): NattoFoldersBrowserTypeWrapper =>
  wrapperFactory(NattoFoldersBrowser, {
    props: {
      folders,
      height,
      disabled,
      inUpload
    },
    global: {
      stubs: {
        ElScrollbar,
        GedSyncStatusIcon
      }
    }
  })

let wrapper = createWrapper(FoldersData.collection, 160, true, false)

describe('natto-folders-browser', () => {
  beforeEach(() => {
    wrapper = createWrapper(FoldersData.collection, 160, true, false)
  })

  describe('rendering', () => {
    it('Should display folders in alphabetical order', () => {
      const items = wrapper.findAll('.item-content__name__text')

      expect(items[0].text()).toBe('A classer')
      expect(items[1].text()).toBe('Achats')
      expect(items[2].text()).toBe('Autres')
      expect(items[3].text()).toBe('Banque')
      expect(items[4].text()).toBe('Ventes')
    })
    it('Should rerender folders if folders prop change', async () => {
      await wrapper.setProps({
        folders: [
          new Folder({
            id: 9999,
            name: 'Ventes',
            parent: { id: 0 },
            children: [],
            properties: {},
            permissions: []
          }),
          new Folder({
            id: 1001,
            name: 'KPMG',
            parent: { id: 0 },
            children: [],
            properties: {},
            permissions: []
          })
        ]
      })

      const items = wrapper.findAll('.item-content__name__text')

      expect(items[0].text()).toBe('KPMG')
      expect(items[1].text()).toBe('Ventes')
    })
    it('Should have the class folder-item-disabled when disabled is true', () => {
      const folderItemWrapper = wrapper.find('.folder-item-disabled')

      expect(folderItemWrapper.exists).toBeTruthy()
    })
  })
  describe('binding', () => {
    it('Should have a correct folders binding', () => {
      expect(wrapper.vm.folders.length).toEqual(FoldersData.collection.length)
    })
    it('Should have the correct height value', () => {
      expect(wrapper.vm.height).toEqual(160)
    })
  })
  describe('events', () => {
    it('Should emit browser-folder-selected event with correct payload', async () => {
      const folderItemWrapper = wrapper.find('.folderItem')

      await folderItemWrapper.trigger('click')
      expect(wrapper.emitted('browser-folder-selected')).toBeTruthy()
      expect(wrapper.emitted()['browser-folder-selected']).toHaveLength(1)
    })
  })
})
