import AdvancedSearchOptions from '@/modules/Search/components/Filters/AdvancedSearchOptions/AdvancedSearchOptions.vue'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'
import Period from '@/Common/models/List/Period'
import PeriodSelector from '@/modules/Search/components/Filters/AdvancedSearchOptions/PeriodSelector.vue'
import CertifiedSelector from '@/modules/Search/components/Filters/AdvancedSearchOptions/CertifiedSelector.vue'
import ResetSearchButton from '@/modules/Search/components/Filters/Buttons/ResetSearchButton.vue'
import SearchButton from '@/modules/Search/components/Filters/Buttons/SearchButton.vue'

/****
 * Wrapper types
 */
type AdvancedSearchOptionsProps = {
  certified: string | boolean
  period: Period
}

type AdvancedSearchOptionsSetup = {
  certifiedValue: string | boolean
  periodValue: Period
}

export type AdvancedSearchOptionsWrapper = VueWrapper<
  ComponentPublicInstance<
    AdvancedSearchOptionsProps,
    AdvancedSearchOptionsSetup
  >
>
/****
 * Wrapper finders
 */

const findPeriodSelector = (wrapper: AdvancedSearchOptionsWrapper) =>
  wrapper.findComponent(PeriodSelector)

const findCertifiedSelector = (wrapper: AdvancedSearchOptionsWrapper) =>
  wrapper.findComponent(CertifiedSelector)

const findResetSearchButton = (wrapper: AdvancedSearchOptionsWrapper) =>
  wrapper.findComponent(ResetSearchButton)

const findSearchButton = (wrapper: AdvancedSearchOptionsWrapper) =>
  wrapper.findComponent(SearchButton)

/****
 * Wrapper creation
 */
const defaultProps: AdvancedSearchOptionsProps = {
  certified: 'all',
  period: new Period()
}

const createWrapper = (props = defaultProps): AdvancedSearchOptionsWrapper =>
  wrapperFactory(AdvancedSearchOptions, {
    props
  })

let wrapper = createWrapper()
let periodSelectorWrapper = findPeriodSelector(wrapper)
let certifiedSelectorWrapper = findCertifiedSelector(wrapper)
let resetSearchButtonWrapper = findResetSearchButton(wrapper)
let searchButtonWrapper = findSearchButton(wrapper)

describe('AdvancedSearchOptions', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    periodSelectorWrapper = findPeriodSelector(wrapper)
    certifiedSelectorWrapper = findCertifiedSelector(wrapper)
    resetSearchButtonWrapper = findResetSearchButton(wrapper)
    searchButtonWrapper = findSearchButton(wrapper)
  })

  describe('bindings with PeriodSelector', () => {
    test('props bindings', () => {
      expect(periodSelectorWrapper.props()).toStrictEqual({
        modelValue: new Period()
      })
    })
    describe('events', () => {
      it('should emits update:period when PeriodSelector emit update:modelValue', async () => {
        const period = new Period({
          startDate: '2022-05-19',
          endDate: '2022-05-27'
        })

        await periodSelectorWrapper.vm.$emit('update:modelValue', period)

        expect(wrapper.emitted('update:period')).toHaveLength(1)
        expect(wrapper.emitted('update:period')).toStrictEqual([[period]])
      })
    })
  })
  /*describe('bindings with CertifiedSelector', () => {
    test('props bindings', () => {
      expect(certifiedSelectorWrapper.props()).toStrictEqual({
        modelValue: 'all'
      })
    })
    describe('events', () => {
      it('should emits update:certified when CertifiedSelector emit update:modelValue', async () => {
        const certified = true

        await certifiedSelectorWrapper.vm.$emit('update:modelValue', certified)

        expect(wrapper.emitted('update:certified')).toHaveLength(1)
        expect(wrapper.emitted('update:certified')).toStrictEqual([[true]])
      })
    })
  })*/
  describe('bindings with ResetSearchButton', () => {
    describe('events', () => {
      it('should emit reset-search-clicked when ResetSearchButton emits clicked', async () => {
        await resetSearchButtonWrapper.vm.$emit('clicked')

        expect(wrapper.emitted('reset-filters-clicked')).toHaveLength(1)
      })
    })
  })
  describe('bindings with SearchButton', () => {
    describe('events', () => {
      it('should emit search-clicked when SearchButton emits clicked', async () => {
        await searchButtonWrapper.vm.$emit('clicked')

        expect(wrapper.emitted('search-clicked')).toHaveLength(1)
      })
    })
  })
})
