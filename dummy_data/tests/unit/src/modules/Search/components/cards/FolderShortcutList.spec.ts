import FolderShortcutList from '@/modules/Search/components/Cards/FolderShortcutList.vue'
import FolderCard from '@/modules/Search/components/Cards/FolderCard.vue'
import Folders from '@/modules/Search/models/Folders/Inputs/Folders'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { VueWrapper } from '@vue/test-utils'
import ArboExploreButton from '@/modules/Search/components/Buttons/ArboExploreButton.vue'

jest.mock('@/Common/helpers/analyticsLog', () => ({
  trackEventFactory: jest.fn()
}))

const createWrapper = (folderShortcuts = Folders.loading().collection) =>
  wrapperFactory(FolderShortcutList, {
    global: {
      stubs: {
        FolderCard,
        ArboExploreButton
      },
      mocks: {
        $tc: (key: string, params: Record<string, any>) =>
          params ? `${key} with ${JSON.stringify(params)}` : key
      }
    },
    props: {
      folderShortcuts
    }
  })

describe('FolderShortcutList', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  describe('bindings with ArboExploreButton', () => {
    it('should fire explore-more-clicked on explore btn click', async () => {
      const wrapper = createWrapper(
        Folders.loaded([
          {
            id: 1122,
            name: 'Comptabilité',
            parent: { id: 0 },
            children: [],
            properties: {},
            permissions: []
          },
          {
            id: 1233,
            name: 'Gestion Sociale',
            parent: { id: 0 },
            children: [],
            properties: {},
            permissions: []
          }
        ]).collection
      )

      const exploreBtnWrapper = wrapper.findComponent(ArboExploreButton)

      await exploreBtnWrapper.vm.$emit('click')

      expect(wrapper.emitted()['explore-more-clicked']).toBeTruthy()
    })
  })
  describe('bindings', () => {
    describe('props', () => {
      it('Should send correct folder when send folders props', () => {
        const wrapper = createWrapper(
          Folders.loaded([
            {
              id: 1122,
              name: 'Comptabilité',
              parent: { id: 0 },
              children: [],
              properties: {},
              permissions: []
            },
            {
              id: 1233,
              name: 'Gestion Sociale',
              parent: { id: 0 },
              children: [],
              properties: {},
              permissions: []
            }
          ]).collection
        )
        const shortcutCardWrappper: VueWrapper<any>[] =
          wrapper.findAllComponents(FolderCard)

        expect(shortcutCardWrappper[0].vm.folder).toEqual({
          id: 1122,
          name: 'Comptabilité',
          parentId: 0,
          children: [],
          properties: {},
          permissions: []
        })
        expect(shortcutCardWrappper[1].vm.folder).toEqual({
          id: 1233,
          name: 'Gestion Sociale',
          parentId: 0,
          children: [],
          properties: {},
          permissions: []
        })
      })
    })
    describe('events', () => {
      it('Should fire folder-shortcut-click event when click event is fired', () => {
        const wrapper = createWrapper(
          Folders.loaded([
            {
              id: 1122,
              name: 'Comptabilité',
              parent: { id: 0 },
              children: [],
              properties: {},
              permissions: []
            },
            {
              id: 1233,
              name: 'Gestion Sociale',
              parent: { id: 0 },
              children: [],
              properties: {},
              permissions: []
            }
          ]).collection
        )
        const shortcutCardWrappper: VueWrapper<any>[] =
          wrapper.findAllComponents(FolderCard)

        shortcutCardWrappper[0].vm.$emit('folder-click', 1122)

        expect(wrapper.emitted()['folder-shortcut-click']).toBeTruthy()
        expect(wrapper.emitted()['folder-shortcut-click']).toHaveLength(1)
        expect(wrapper.emitted()['folder-shortcut-click'][0]).toEqual([
          {
            shortcutFolder: {
              id: 1122,
              name: 'Comptabilité',
              parentId: 0,
              children: [],
              properties: {},
              permissions: []
            },
            shortcutIndex: 0
          }
        ])
      })
    })
  })
  describe('rendering', () => {
    describe('props', () => {
      it('Should dispaly folders when send folders props', () => {
        const wrapper = createWrapper(
          Folders.loaded([
            {
              id: 1122,
              name: 'Comptabilité',
              parent: { id: 0 },
              children: [],
              properties: {},
              permissions: []
            },
            {
              id: 1233,
              name: 'Gestion Sociale',
              parent: { id: 0 },
              children: [],
              properties: {},
              permissions: []
            }
          ]).collection
        )
        const shortcutCardWrappper: VueWrapper<any>[] =
          wrapper.findAllComponents(FolderCard)

        expect(shortcutCardWrappper).toHaveLength(2)
      })
    })
  })
})
