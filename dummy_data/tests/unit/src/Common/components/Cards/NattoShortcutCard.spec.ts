import NattoShortcutCard from '@/Common/components/Cards/NattoShortcutCard.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'
import NattoCard from '@/Common/components/Cards/NattoCard.vue'
import useStyleguide from 'tests/unit/utils/useStyleguideStubs'
import useElement from 'tests/unit/utils/useElementStubs'

const { MpIcon } = useStyleguide()
const { ElCard } = useElement()

/****
 * Wrapper types
 */
type NattoShortcutCardProps = {
  text: string
  prependIcon: string
  type: string
}

type NattoShortcutCardSetup = {
  noPermissionOnDocument: string
}

export type NattoShortcutCardWrapper = VueWrapper<
  ComponentPublicInstance<NattoShortcutCardProps, NattoShortcutCardSetup>
>
/****
 * Wrapper finders
 */

const findNattoCard = (wrapper: NattoShortcutCardWrapper): VueWrapper<any> =>
  wrapper.findComponent(NattoCard)
const findMpIcon = (wrapper: NattoShortcutCardWrapper): VueWrapper<any> =>
  wrapper.findComponent(MpIcon)

/****
 * Wrapper creation
 */
const defaultProps: NattoShortcutCardProps = {
  text: 'test',
  prependIcon: 'delete',
  type: 'primary'
}

const createWrapper = (props = defaultProps): NattoShortcutCardWrapper =>
  wrapperFactory(NattoShortcutCard, {
    props,
    global: {
      stubs: {
        NattoCard,
        ElCard,
        MpIcon
      },
      directives: { Loading: {} }
    }
  })

let wrapper = createWrapper()
let nattoCardWrapper = findNattoCard(wrapper)
let mpIconWrapper = findMpIcon(wrapper)

describe('NattoShortcutCard', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    nattoCardWrapper = findNattoCard(wrapper)
    mpIconWrapper = findMpIcon(wrapper)
  })

  describe('bindings with NattoCard', () => {
    test('props bindings', () => {
      expect(wrapper.text()).toContain('test')
      expect(nattoCardWrapper.classes()).toContain('primary')
      expect(mpIconWrapper.props('name')).toBe('delete')
    })
  })
})
