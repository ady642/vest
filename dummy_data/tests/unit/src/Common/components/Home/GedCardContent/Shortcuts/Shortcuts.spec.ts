import Shortcuts from '@/Common/components/Home/Card/GedCardContent/Shortcuts/Shortcuts.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'
import Folders from '@/modules/Search/models/Folders/Inputs/Folders'
import Shortcut from '@/Common/components/Home/Card/GedCardContent/Shortcuts/Shortcut.vue'
import useFoldersData from 'tests/unit/src/modules/Search/mocks/FoldersDataMock'
import { router } from '@kpmg/mypulse-shared-dependencies'

/****
 * Wrapper types
 */
type ShortcutsProps = {
  folders: Folders
}

type ShortcutsSetup = {
  goToArboView: (payload: { folderId: number }) => void
}

export type ShortcutsWrapper = VueWrapper<
  ComponentPublicInstance<ShortcutsProps, ShortcutsSetup>
>
/****
 * Wrapper finders
 */

const findShortcuts = (wrapper: ShortcutsWrapper): any =>
  wrapper.findAllComponents(Shortcut)

/****
 * Wrapper creation
 */
const defaultProps: ShortcutsProps = {
  folders: useFoldersData().FoldersData
}

const createWrapper = (props = defaultProps): ShortcutsWrapper =>
  wrapperFactory(Shortcuts, {
    props
  })

let wrapper = createWrapper()
let shortcutWrappers = findShortcuts(wrapper)

describe('Shortcuts', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    shortcutWrappers = findShortcuts(wrapper)
  })

  describe('rendering', () => {
    it('should have loading class when folders are loading', () => {
      wrapper = createWrapper({ folders: Folders.loading() })

      expect(wrapper.classes()).toContain('loading')
    })
  })
  describe('bindings with Shortcut', () => {
    test('props bindings', () => {
      expect(shortcutWrappers).toHaveLength(5)
      expect(shortcutWrappers[0].props('folderName')).toBe('A classer')
    })
    describe('events', () => {
      it('should go to arbo view with correct folder id when click on shortcut', async () => {
        await shortcutWrappers[0].vm.$emit('click')

        expect(router.push).toHaveBeenCalledWith({
          name: 'ArboView',
          query: { folderId: 1122 }
        })
      })
    })
  })
})
