import Shortcut from '@/Common/components/Home/Card/GedCardContent/Shortcuts/Shortcut.vue'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'
import NattoShortcutCard from '@/Common/components/Cards/NattoShortcutCard.vue'
import { NattoShortcutCardWrapper } from 'dummy_data/tests/unit/src/Common/components/Cards/NattoShortcutCard.spec'

/****
 * Wrapper types
 */
type ShortcutProps = {
  folderName: string
}

type ShortcutSetup = {
  noPermissionOnDocument: string
}

export type ShortcutWrapper = VueWrapper<
  ComponentPublicInstance<ShortcutProps, ShortcutSetup>
>
/****
 * Wrapper finders
 */

const findNattoShortcutCard = (
  wrapper: ShortcutWrapper
): NattoShortcutCardWrapper => wrapper.findComponent(NattoShortcutCard)

/****
 * Wrapper creation
 */
const defaultProps: ShortcutProps = {
  folderName: 'test'
}

const createWrapper = (props = defaultProps): ShortcutWrapper =>
  wrapperFactory(Shortcut, {
    props
  })

let wrapper = createWrapper()
let nattoShortcutCardWrapper = findNattoShortcutCard(wrapper)

describe('Shortcut', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    nattoShortcutCardWrapper = findNattoShortcutCard(wrapper)
  })

  describe('bindings with NattoDialogPopup', () => {
    test('props bindings', () => {
      expect(nattoShortcutCardWrapper.props('text')).toBe('test')
      expect(nattoShortcutCardWrapper.props('prependIcon')).toBe('documents')
    })
  })
})
