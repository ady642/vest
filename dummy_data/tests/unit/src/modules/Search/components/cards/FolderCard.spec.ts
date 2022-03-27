import FolderCard from '@/modules/Search/components/Cards/FolderCard.vue'
import Folder from '@/modules/Search/models/Folders/Inputs/Folder'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { VueWrapper } from '@vue/test-utils'
import { Category } from '@/modules/Search/types'
import NattoShortcutCard from '@/Common/components/Cards/NattoShortcutCard.vue'
import { ComponentPublicInstance } from 'vue'

type FolderCardProps = {
  folder: Folder
}

type FolderCardSetup = {
  handleClick: () => void
}

type FolderCardWrapper = VueWrapper<
  ComponentPublicInstance<FolderCardProps, FolderCardSetup>
>

const defaultProps: FolderCardProps = {
  folder: new Folder({
    id: 1122,
    name: 'Comptabilité',
    parent: { id: 0 },
    children: [],
    properties: {
      isShortcut: 'Shortcut name'
    },
    permissions: []
  } as Category)
}

const createWrapper = (props = defaultProps): FolderCardWrapper =>
  wrapperFactory(FolderCard, {
    props
  })

const findNattoShortcutCard = (wrapper: FolderCardWrapper) =>
  wrapper.findComponent(NattoShortcutCard)

let wrapper = createWrapper()
let nattoShortcutCardWrapper = findNattoShortcutCard(wrapper)

describe('FolderCard', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    nattoShortcutCardWrapper = findNattoShortcutCard(wrapper)
  })
  describe('binding with NattoShortcutCard', () => {
    it('props bindings', () => {
      expect(nattoShortcutCardWrapper.props('prependIcon')).toBe('documents')
      expect(nattoShortcutCardWrapper.props('text')).toBe('Shortcut name')
    })
    describe('events', () => {
      it('Should fire folder-click on when shortcut card emit click', async () => {
        await nattoShortcutCardWrapper.vm.$emit('click')

        expect(wrapper.emitted()['folder-click']).toBeTruthy()
        expect(wrapper.emitted()['folder-click']).toHaveLength(1)
      })
    })
  })
})
