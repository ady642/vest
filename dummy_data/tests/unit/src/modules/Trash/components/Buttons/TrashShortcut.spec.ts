import TrashShortcut from '@/modules/Trash/components/Shortcuts/TrashShortcut.vue'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { VueWrapper } from '@vue/test-utils'
import NattoShortcutCard from '@/Common/components/Cards/NattoShortcutCard.vue'
import { ComponentPublicInstance } from 'vue'
import { createTrashStoreMock } from 'dummy_data/tests/unit/__mocks__/storeMock/createTrashStoreMock'
import { router } from '@kpmg/mypulse-shared-dependencies'

jest.mock('@/Common/helpers/analyticsLog', () => ({
  trackEventFactory: jest.fn(),
  pageViewFactory: jest.fn()
}))

type TrashShortcutProps = any

type TrashShortcutSetup = {
  handleClick: () => void
  trashDocumentsCount: number
}

export type TrashShortcutWrapper = VueWrapper<
  ComponentPublicInstance<TrashShortcutProps, TrashShortcutSetup>
>

const routerMock = router

const storeMock = createTrashStoreMock()

const createWrapper = (store = storeMock): TrashShortcutWrapper =>
  wrapperFactory(TrashShortcut, {
    global: {
      plugins: [store, routerMock],
      mocks: {
        $tc: (key: string, params: Record<string, any>) =>
          params ? `${key} with ${JSON.stringify(params)}` : key
      }
    }
  })

const findNattoShortcutCard = (wrapper: TrashShortcutWrapper) =>
  wrapper.findComponent(NattoShortcutCard)

let wrapper = createWrapper()
let nattoShortcutCardWrapper = findNattoShortcutCard(wrapper)

describe('TrashShortcut', () => {
  beforeEach(async () => {
    wrapper = createWrapper()
    nattoShortcutCardWrapper = findNattoShortcutCard(wrapper)
    routerMock.push = jest.fn()
    storeMock.dispatch = jest.fn()
  })
  describe('binding with NattoShortcutCard', () => {
    it('props bindings', () => {
      expect(nattoShortcutCardWrapper.props('prependIcon')).toBe('file')
      expect(nattoShortcutCardWrapper.props('text')).toBe(
        'ged.documents with 1905'
      )
      expect(nattoShortcutCardWrapper.props('type')).toBe('danger')
    })
    describe('events', () => {
      it('Should go to trash view when shortcut card emit click', async () => {
        await nattoShortcutCardWrapper.vm.$emit('click')

        expect(routerMock.push).toHaveBeenCalledWith({ name: 'TrashView' })
      })
      it('Should dispatch fetchTrashDocumentsTotalCount onBeforeMount', async () => {
        wrapper = createWrapper()

        expect(storeMock.dispatch).toHaveBeenCalledWith(
          'GED/Trash/fetchTrashDocumentsTotalCount'
        )
      })
    })
  })
})
