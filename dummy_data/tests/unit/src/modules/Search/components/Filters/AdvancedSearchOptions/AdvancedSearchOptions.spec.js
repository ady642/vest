"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdvancedSearchOptions_vue_1 = require("@/modules/Search/components/Filters/AdvancedSearchOptions/AdvancedSearchOptions.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const Period_1 = require("@/Common/models/List/Period");
const PeriodSelector_vue_1 = require("@/modules/Search/components/Filters/AdvancedSearchOptions/PeriodSelector.vue");
const CertifiedSelector_vue_1 = require("@/modules/Search/components/Filters/AdvancedSearchOptions/CertifiedSelector.vue");
const ResetSearchButton_vue_1 = require("@/modules/Search/components/Filters/Buttons/ResetSearchButton.vue");
const SearchButton_vue_1 = require("@/modules/Search/components/Filters/Buttons/SearchButton.vue");
/****
 * Wrapper finders
 */
const findPeriodSelector = (wrapper) => wrapper.findComponent(PeriodSelector_vue_1.default);
const findCertifiedSelector = (wrapper) => wrapper.findComponent(CertifiedSelector_vue_1.default);
const findResetSearchButton = (wrapper) => wrapper.findComponent(ResetSearchButton_vue_1.default);
const findSearchButton = (wrapper) => wrapper.findComponent(SearchButton_vue_1.default);
/****
 * Wrapper creation
 */
const defaultProps = {
    certified: 'all',
    period: new Period_1.default()
};
const createWrapper = (props = defaultProps) => (0, wrapperFactory_1.default)(AdvancedSearchOptions_vue_1.default, {
    props
});
let wrapper = createWrapper();
let periodSelectorWrapper = findPeriodSelector(wrapper);
let certifiedSelectorWrapper = findCertifiedSelector(wrapper);
let resetSearchButtonWrapper = findResetSearchButton(wrapper);
let searchButtonWrapper = findSearchButton(wrapper);
describe('AdvancedSearchOptions', () => {
    beforeEach(() => {
        wrapper = createWrapper();
        periodSelectorWrapper = findPeriodSelector(wrapper);
        certifiedSelectorWrapper = findCertifiedSelector(wrapper);
        resetSearchButtonWrapper = findResetSearchButton(wrapper);
        searchButtonWrapper = findSearchButton(wrapper);
    });
    describe('bindings with PeriodSelector', () => {
        test('props bindings', () => {
            expect(periodSelectorWrapper.props()).toStrictEqual({
                modelValue: new Period_1.default()
            });
        });
        describe('events', () => {
            it('should emits update:period when PeriodSelector emit update:modelValue', async () => {
                const period = new Period_1.default({
                    startDate: '2022-05-19',
                    endDate: '2022-05-27'
                });
                await periodSelectorWrapper.vm.$emit('update:modelValue', period);
                expect(wrapper.emitted('update:period')).toHaveLength(1);
                expect(wrapper.emitted('update:period')).toStrictEqual([[period]]);
            });
        });
    });
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
                await resetSearchButtonWrapper.vm.$emit('clicked');
                expect(wrapper.emitted('reset-filters-clicked')).toHaveLength(1);
            });
        });
    });
    describe('bindings with SearchButton', () => {
        describe('events', () => {
            it('should emit search-clicked when SearchButton emits clicked', async () => {
                await searchButtonWrapper.vm.$emit('clicked');
                expect(wrapper.emitted('search-clicked')).toHaveLength(1);
            });
        });
    });
});
//# sourceMappingURL=AdvancedSearchOptions.spec.js.map