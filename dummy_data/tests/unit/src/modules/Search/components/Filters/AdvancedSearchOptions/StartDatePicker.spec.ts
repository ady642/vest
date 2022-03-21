import StartDatePicker from '@/modules/Search/components/Filters/AdvancedSearchOptions/StartDatePicker.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'
import { findSearchDatePicker } from 'tests/unit/utils/finders'

/****
 * Wrapper types
 */

export type StartDatePickerWrapper = VueWrapper<ComponentPublicInstance>

/****
 * Wrapper creation
 */

const createWrapper = (): StartDatePickerWrapper =>
  wrapperFactory(StartDatePicker)

let wrapper = createWrapper()
let searchDatePickerWrapper = findSearchDatePicker(wrapper)

describe('StartDatePicker', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    searchDatePickerWrapper = findSearchDatePicker(wrapper)
  })

  describe('bindings with SearchDatePicker', () => {
    describe('props', () => {
      test('static props', () => {
        expect(searchDatePickerWrapper.attributes()).toStrictEqual({
          title: 'ged.common.from'
        })
      })
    })
  })
})
