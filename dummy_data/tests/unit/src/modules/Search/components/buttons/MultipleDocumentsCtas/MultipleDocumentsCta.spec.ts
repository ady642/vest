import MultipleDocumentsCta from '@/modules/Search/components/Buttons/MultipleDocumentsCtas/MultipleDocumentsCta.vue'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'

/****
 * Wrapper types
 */
type MultipleDocumentsCtaProps = {
  text: string
}

export type MultipleDocumentsCtaWrapper = VueWrapper<
  ComponentPublicInstance<MultipleDocumentsCtaProps>
>

/****
 * Wrapper creation
 */
const defaultProps: MultipleDocumentsCtaProps = {
  text: 'Columbo'
}

const createWrapper = ({
  props = defaultProps,
  slots = { 'prepend-icon': '<div>The prepend icon </div>' }
} = {}): MultipleDocumentsCtaWrapper =>
  wrapperFactory(MultipleDocumentsCta, {
    props,
    slots,
    global: {
      renderStubDefaultSlot: true
    }
  })

let wrapper = createWrapper()

describe('MultipleDocumentsCta', () => {
  beforeEach(() => {
    wrapper = createWrapper()
  })

  describe('bindings with NattoButton', () => {
    describe('rendering', () => {
      it('should render the text and prepend icon', () => {
        expect(wrapper.text()).toContain('The prepend icon Columbo')
      })
    })
  })
})
