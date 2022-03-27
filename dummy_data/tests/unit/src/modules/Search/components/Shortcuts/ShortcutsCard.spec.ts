import ShortcutCard from '@/modules/Search/components/Shortcuts/ShortcutCard.vue'
import Folder from '@/modules/Search/models/Folders/Inputs/Folder'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { DOMWrapper, VueWrapper } from '@vue/test-utils'
import useElementStubs from 'dummy_data/tests/unit/utils/useElementStubs'
import NattoCard from '@/Common/components/Cards/NattoCard.vue'
import { Category } from '@/modules/Search/types'

const { ElCard } = useElementStubs()

const createWrapper = (folder: Folder) =>
  wrapperFactory(ShortcutCard, {
    global: {
      stubs: {
        NattoCard,
        ElCard
      }
    },
    propsData: {
      folder
    }
  })

describe('ShortcutsCard', () => {
  describe('binding', () => {
    it('NattoCard classes prop should contains computed value when send folder props', () => {
      const wrapper = createWrapper(
        new Folder({
          id: 1122,
          name: 'Comptabilité',
          parent: { id: 0 },
          children: [],
          properties: {},
          permissions: []
        } as Category)
      )
      const nattoCardWrapper: VueWrapper<any> = wrapper.findComponent(NattoCard)

      expect(nattoCardWrapper.attributes('class')).toContain(
        'shortcut-card compta'
      )
    })

    it('folder icon div class should contains computed value when send folder props', () => {
      const wrapper = createWrapper(
        new Folder({
          id: 1122,
          name: 'Comptabilité',
          parent: { id: 0 },
          children: [],
          properties: {},
          permissions: []
        } as Category)
      )
      const iconWrapper: DOMWrapper<HTMLElement> = wrapper.find('.folder-icon')

      expect(iconWrapper.classes()[0]).toBe('folder-icon')
      expect(iconWrapper.classes()[1]).toBe('compta')
    })

    describe('props', () => {
      it('Should display folder name when send folder props', () => {
        const wrapper = createWrapper(
          new Folder({
            id: 1122,
            name: 'Comptabilité',
            parent: { id: 0 },
            children: [],
            properties: {},
            permissions: []
          } as Category)
        )
        const spanWrapper: DOMWrapper<any>[] = wrapper.findAll('span')

        expect(spanWrapper.length).toBe(2)
        expect(spanWrapper[1].text()).toBe('Comptabilité')
      })
    })
  })
})
