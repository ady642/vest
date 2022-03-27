import ArboExploreButton from '@/modules/Search/components/Buttons/ArboExploreButton.vue'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { VueWrapper } from '@vue/test-utils'
import NattoShortcutCard from '@/Common/components/Cards/NattoShortcutCard.vue'
import { ComponentPublicInstance } from 'vue'

type ArboExploreButtonProps = any

type ArboExploreButtonSetup = {
  exploreMore: string
}

type ArboExploreButtonWrapper = VueWrapper<
  ComponentPublicInstance<ArboExploreButtonProps, ArboExploreButtonSetup>
>

const createWrapper = (): ArboExploreButtonWrapper =>
  wrapperFactory(ArboExploreButton, {
    global: {
      mocks: {
        $tc: (key: string, params: Record<string, any>) =>
          params ? `${key} with ${JSON.stringify(params)}` : key
      }
    }
  })

const findNattoShortcutCard = (wrapper: ArboExploreButtonWrapper) =>
  wrapper.findComponent(NattoShortcutCard)

let wrapper = createWrapper()
let nattoShortcutCardWrapper = findNattoShortcutCard(wrapper)

describe('ArboExploreButton', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    nattoShortcutCardWrapper = findNattoShortcutCard(wrapper)
  })
  describe('binding with NattoShortcutCard', () => {
    it('props bindings', () => {
      expect(nattoShortcutCardWrapper.props('prependIcon')).toBe('reader')
      expect(nattoShortcutCardWrapper.props('text')).toBe(
        'ged.search.arboCard.buttons.exploreMore'
      )
      expect(nattoShortcutCardWrapper.props('type')).toBe('secondary')
    })
  })
})
