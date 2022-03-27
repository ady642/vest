import SearchDatePicker from '@/modules/Search/components/Filters/AdvancedSearchOptions/SearchDatePicker.vue'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'
import { findNattoDatePicker } from 'dummy_data/tests/unit/utils/finders'

/****
 * Wrapper types
 */
type SearchDatePickerProps = {
  modelValue: string
  lockAfter: string
  lockBefore: string
  placeholder: string
  title: string
}

type SearchDatePickerSetup = {
  date: string
}

export type SearchDatePickerWrapper = VueWrapper<
  ComponentPublicInstance<SearchDatePickerProps, SearchDatePickerSetup>
>

/****
 * Wrapper creation
 */
const defaultProps: SearchDatePickerProps = {
  lockAfter: '2022-05-19',
  lockBefore: '2022-05-27',
  title: 'Test',
  placeholder: 'Test placeholder',
  modelValue: '2022-05-19'
}

const createWrapper = ({
  props = defaultProps
} = {}): SearchDatePickerWrapper =>
  wrapperFactory(SearchDatePicker, {
    props
  })

let wrapper = createWrapper()
let nattoDatePickerWrapper = findNattoDatePicker(wrapper)

describe('SearchDatePicker', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    nattoDatePickerWrapper = findNattoDatePicker(wrapper)
  })

  describe('bindings with NattoDatePicker', () => {
    test('props bindings', () => {
      expect(nattoDatePickerWrapper.attributes()).toStrictEqual({
        lockafter: '2022-05-19',
        lockbefore: '2022-05-27',
        placeholder: 'Test placeholder',
        modelvalue: '2022-05-19',
        format: 'DD-MM-YYYY'
      })
    })
    describe('rendering', () => {
      it('should render the title', () => {
        expect(wrapper.text()).toContain('Test')
      })
    })
  })
})
