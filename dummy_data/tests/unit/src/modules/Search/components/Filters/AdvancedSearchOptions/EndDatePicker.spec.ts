import EndDatePicker from '@/modules/Search/components/Filters/AdvancedSearchOptions/EndDatePicker.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'
import { findSearchDatePicker } from 'tests/unit/utils/finders'

/****
 * Wrapper types
 */

export type EndDatePickerWrapper = VueWrapper<ComponentPublicInstance>

/****
 * Wrapper creation
 */

const createWrapper = (): EndDatePickerWrapper => wrapperFactory(EndDatePicker)

let wrapper = createWrapper()
let searchDatePickerWrapper = findSearchDatePicker(wrapper)

describe('EndDatePicker', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    searchDatePickerWrapper = findSearchDatePicker(wrapper)
  })

  describe('bindings with SearchDatePicker', () => {
    describe('props', () => {
      test('static props', () => {
        expect(searchDatePickerWrapper.attributes()).toStrictEqual({
          title: 'ged.common.to'
        })
      })
    })
  })
})
