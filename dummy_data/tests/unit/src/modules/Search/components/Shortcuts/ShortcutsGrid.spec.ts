import ShortcutsGrid from '@/modules/Search/components/Shortcuts/ShortcutsGrid.vue'
import ShortcutCard from '@/modules/Search/components/Shortcuts/ShortcutCard.vue'
import Folders from '@/modules/Search/models/Folders/Inputs/Folders'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { VueWrapper } from '@vue/test-utils'

const createWrapper = (folders = Folders.loading()) =>
  wrapperFactory(ShortcutsGrid, {
    global: {
      stubs: {
        ShortcutCard
      }
    },
    propsData: {
      folders
    },
    shallow: true
  })

describe('DocumentsViewHeader', () => {
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
          ])
        )
        const shortcutCardWrappper: VueWrapper<any>[] =
          wrapper.findAllComponents(ShortcutCard)

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
          ])
        )
        const shortcutCardWrappper: VueWrapper<any>[] =
          wrapper.findAllComponents(ShortcutCard)

        shortcutCardWrappper[0].vm.$emit('click', 1122)

        expect(wrapper.emitted()['folder-shortcut-click']).toBeTruthy()
        expect(wrapper.emitted()['folder-shortcut-click']).toHaveLength(1)
        expect(wrapper.emitted()['folder-shortcut-click'][0]).toStrictEqual([
          1122
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
          ])
        )
        const shortcutCardWrappper: VueWrapper<any>[] =
          wrapper.findAllComponents(ShortcutCard)

        expect(shortcutCardWrappper).toHaveLength(2)
      })
    })
  })
})
