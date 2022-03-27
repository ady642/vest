import DocumentsSearchInput from '@/modules/Search/components/Filters/DocumentsSearchInput.vue'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'
import NattoInput from '@/Common/components/Inputs/NattoInput.vue'
import { NattoInputWrapper } from 'dummy_data/tests/unit/src/Common/components/Inputs/NattoInputType'
import useStyleguide from 'dummy_data/tests/unit/utils/useStyleguideStubs'

/****
 * Wrapper types
 */
type DocumentsSearchInputProps = {
  modelValue: string
  clearable?: boolean
}

type DocumentsSearchInputSetup = {
  searchInput: string
}

export type DocumentsSearchInputWrapper = VueWrapper<
  ComponentPublicInstance<DocumentsSearchInputProps, DocumentsSearchInputSetup>
>
/****
 * Wrapper finders
 */

const findNattoInput = (
  wrapper: DocumentsSearchInputWrapper
): NattoInputWrapper => wrapper.findComponent(NattoInput)

const { MpIcon } = useStyleguide()
const findMpIcon = (wrapper: DocumentsSearchInputWrapper): VueWrapper<any> =>
  wrapper.findComponent(MpIcon)

/****
 * Wrapper creation
 */
const { MpInput } = useStyleguide()

const defaultProps: DocumentsSearchInputProps = {
  modelValue: '',
  clearable: false
}

const createWrapper = (props = defaultProps): DocumentsSearchInputWrapper =>
  wrapperFactory(DocumentsSearchInput, {
    props,
    global: {
      stubs: {
        NattoInput,
        MpInput,
        MpIcon
      }
    }
  })

let wrapper = createWrapper()
let nattoInputWrapper = findNattoInput(wrapper)

describe('DocumentsSearchInput', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    nattoInputWrapper = findNattoInput(wrapper)
  })

  describe('bindings with NattoInput', () => {
    test('props bindings', () => {
      wrapper = createWrapper({ modelValue: 'test' })

      expect(findNattoInput(wrapper).props()).toStrictEqual({
        clearable: true,
        debounceTime: 500,
        disabled: false,
        modelValue: 'test',
        placeholder: 'ged.search.input.placeholder'
      })
    })
    describe('events bindings', () => {
      it('should emit update:modelValue when NattoInput emits update:modelValue', async () => {
        // When NattoInput emits update:modelValue
        await nattoInputWrapper.vm.$emit('update:modelValue', 'test')

        // Then DocumentsSearchInput should emit update:modelValue
        expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
        expect(wrapper.emitted('update:modelValue')).toEqual([['test']])
      })
      it('should emit update:modelValue when NattoInput emits clear', async () => {
        // When NattoInput emits update:modelValue
        await nattoInputWrapper.vm.$emit('clear')

        // Then DocumentsSearchInput should emit update:modelValue with an empty string
        expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
        expect(wrapper.emitted('update:modelValue')).toEqual([['']])
      })
    })
    describe('rendering', () => {
      it('should render a search icon in the NattoInput prefix slot', () => {
        expect(findMpIcon(wrapper).props('name')).toBe('search')
      })
    })
  })
})
