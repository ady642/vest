import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'

import NattoHighlighter from '@/Common/components/Hightlighter/NattoHighlighter.vue'

import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import useStyleguideStubs from 'dummy_data/tests/unit/utils/useStyleguideStubs'

/****
 * Wrapper types
 */
type NattoHighlighterProps = {
  text: string
  query: string
}

type NattoHighlighterSetup = {
  textSplitted: string[]
  compareSplittedItemWithQuery: (splitted: string) => boolean
}

export type NattoHighlighterWrapper = VueWrapper<
  ComponentPublicInstance<NattoHighlighterProps, NattoHighlighterSetup>
>
/****
 * Wrapper finders
 */

const { MpHighlight } = useStyleguideStubs()

const findMpHighlight = (
  wrapper: NattoHighlighterWrapper
): VueWrapper<ComponentPublicInstance> => wrapper.findComponent(MpHighlight)

/****
 * Wrapper creation
 */
const defaultProps: NattoHighlighterProps = {
  text: 'je suis columbo',
  query: 'columbo'
}

const createWrapper = (props = defaultProps): NattoHighlighterWrapper =>
  wrapperFactory(NattoHighlighter, {
    props,
    global: {
      stubs: {
        MpHighlight
      }
    }
  })

let wrapper = createWrapper()
let mpHighlightWrapper = findMpHighlight(wrapper)

describe('NattoHighlighter', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    mpHighlightWrapper = findMpHighlight(wrapper)
  })

  describe('rendering', () => {
    it('should contain 2 children when the text is "je suis columbo" (2 parts [je suis, columbo])', () => {
      expect(wrapper.findAll('.natto-highlighter__container > *')).toHaveLength(
        2
      )
    })
    it('should render the text without the query', () => {
      expect(wrapper.text()).toContain('je suis')
      expect(wrapper.text()).not.toContain('columbo')
    })
  })
  describe('bindings with MpHighlight', () => {
    describe('rendering', () => {
      it('should render MpHighlight only once because the query "columbo" appear one time in the text', () => {
        expect(wrapper.findAllComponents(MpHighlight)).toHaveLength(1)
      })
      it('should not render any MpHighlight component when the query does not match any part of the text', () => {
        wrapper = createWrapper({ text: 'je suis columbo', query: 'peter' })
        expect(findMpHighlight(wrapper).exists()).toBe(false)
      })
    })
    test('props bindings', () => {
      expect(mpHighlightWrapper.attributes('text')).toBe('columbo')
    })
  })
})
