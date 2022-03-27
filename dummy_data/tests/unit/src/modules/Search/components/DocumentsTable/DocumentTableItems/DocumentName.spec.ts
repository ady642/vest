import DocumentNameItem from '@/modules/Search/components/DocumentsTable/DocumentsTableItems/DocumentNameItem.vue'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { VueWrapper } from '@vue/test-utils'
import { ComponentPublicInstance } from 'vue'
import NattoHighlighter from '@/Common/components/Hightlighter/NattoHighlighter.vue'
import FilenameText from '@/Common/components/Text/FilenameText.vue'
import { FileNameTextWrapper } from 'dummy_data/tests/unit/src/Common/components/Text/FilenameText.spec'
import { NattoHighlighterWrapper } from 'dummy_data/tests/unit/src/Common/components/Highlighter/NattoHighlighter.spec'

/****
 * Wrapper types
 */
type DocumentNameItemProps = {
  name: string
  search?: string
}

type DocumentNameItemSetup = {
  ellipsifiedName: string
}

export type DocumentNameItemWrapper = VueWrapper<
  ComponentPublicInstance<DocumentNameItemProps, DocumentNameItemSetup>
>
/****
 * Wrapper finders
 */

const findNattoHighlighter = (
  wrapper: DocumentNameItemWrapper
): NattoHighlighterWrapper => wrapper.findComponent(NattoHighlighter)

const findFilenameText = (
  wrapper: DocumentNameItemWrapper
): FileNameTextWrapper => wrapper.findComponent(FilenameText)

/****
 * Wrapper creation
 */

const defaultProps: DocumentNameItemProps = {
  name: 'je suis columbo',
  search: 'columbo'
}

const createWrapper = (props = defaultProps): DocumentNameItemWrapper =>
  wrapperFactory(DocumentNameItem, {
    props
  })

let wrapper = createWrapper()

describe('DocumentNameItem', () => {
  beforeEach(() => {
    // Given name is equal to 'je suis columbo' and query 'columbo'
    wrapper = createWrapper()
  })
  describe('bindings with NattoHighlighter', () => {
    test('props', () => {
      // Then filename must be also equal to 'test'
      const nattoHighlighterWrapper = findNattoHighlighter(wrapper)

      expect(nattoHighlighterWrapper.vm.text).toBe('je suis columbo')
      expect(nattoHighlighterWrapper.vm.query).toBe('columbo')
    })
    describe('rendering', () => {
      it('should not display NattoHighlighter if no search', () => {
        // Given search is empty
        wrapper = createWrapper({
          ...defaultProps,
          search: ''
        })

        const nattoHighlighterWrapper = findNattoHighlighter(wrapper)

        // Then NattoHighlighter should not exist
        expect(nattoHighlighterWrapper.exists()).toBe(false)
      })
    })
  })
  describe('bindings with FilenameText', () => {
    test('props bindings', () => {
      // Given name is equal to 'test'
      wrapper = createWrapper({ name: 'test' })

      // Then filename must be also equal to 'test'
      const filenameTextWrapper = findFilenameText(wrapper)

      expect(filenameTextWrapper.vm.filename).toBe('test')
    })
    describe('rendering', () => {
      it('should not display filenameText if there is a search', () => {
        // Given search is empty
        wrapper = createWrapper({
          ...defaultProps,
          search: 'test'
        })

        const filenameTextWrapper = findFilenameText(wrapper)

        // Then FilenameText should not exist
        expect(filenameTextWrapper.exists()).toBe(false)
      })
    })
  })
})
