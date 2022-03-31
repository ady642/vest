"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PeriodSelector_vue_1 = require("@/modules/Search/components/Filters/AdvancedSearchOptions/PeriodSelector.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const Period_1 = require("@/Common/models/List/Period");
const NattoSelect_vue_1 = require("@/Common/components/Select/NattoSelect.vue");
const StartDatePicker_vue_1 = require("@/modules/Search/components/Filters/AdvancedSearchOptions/StartDatePicker.vue");
const EndDatePicker_vue_1 = require("@/modules/Search/components/Filters/AdvancedSearchOptions/EndDatePicker.vue");
jest.mock('@/Common/hooks/useDates', () => () => ({
    dateNow: () => '2022-05-19',
    subtractInDays: () => '2022-05-12'
}));
/****
 * Wrapper finders
 */
const findNattoSelect = (wrapper) => wrapper.findComponent(NattoSelect_vue_1.default);
const findStartDatePicker = (wrapper) => wrapper.findComponent(StartDatePicker_vue_1.default);
const findEndDatePicker = (wrapper) => wrapper.findComponent(EndDatePicker_vue_1.default);
/****
 * Wrapper creation
 */
const defaultProps = {
    modelValue: new Period_1.default()
};
const createWrapper = (props = defaultProps) => (0, wrapperFactory_1.default)(PeriodSelector_vue_1.default, {
    props
});
let wrapper = createWrapper();
let nattoSelectWrapper = findNattoSelect(wrapper);
let startDatePickerWrapper = findStartDatePicker(wrapper);
let endDatePickerWrapper = findEndDatePicker(wrapper);
describe('PeriodSelector', () => {
    beforeEach(() => {
        wrapper = createWrapper();
        nattoSelectWrapper = findNattoSelect(wrapper);
        startDatePickerWrapper = findStartDatePicker(wrapper);
        endDatePickerWrapper = findEndDatePicker(wrapper);
    });
    describe('watch on modelValue', () => {
        it('should reset all the elements if the period is undefined', async () => {
            await wrapper.setProps({ modelValue: new Period_1.default() });
            expect(startDatePickerWrapper.attributes('modelvalue')).toBe('');
            expect(endDatePickerWrapper.attributes('modelvalue')).toBe('');
            expect(nattoSelectWrapper.props('modelValue')).toBe(undefined);
        });
        it('should set the start and end date if the period is defined', async () => {
            await wrapper.setProps({
                modelValue: new Period_1.default({
                    startDate: '2022-05-19',
                    endDate: '2022-05-27'
                })
            });
            await wrapper.vm.$nextTick();
            expect(startDatePickerWrapper.attributes('modelvalue')).toBe('2022-05-19');
            expect(endDatePickerWrapper.attributes('modelvalue')).toBe('2022-05-27');
            expect(nattoSelectWrapper.props('modelValue')).toBe(undefined);
        });
    });
    describe('bindings with NattoSelect', () => {
        describe('props', () => {
            test('static props', () => {
                expect(nattoSelectWrapper.props()).toEqual({
                    options: [
                        {
                            label: '',
                            value: undefined
                        },
                        {
                            label: 'Les dernières 24h',
                            value: 1
                        },
                        {
                            label: 'Les 7 derniers jours',
                            value: 7
                        },
                        {
                            label: 'Les 30 derniers jours',
                            value: 30
                        }
                    ],
                    modelValue: undefined
                });
            });
        });
        describe('events', () => {
            it('should reset the period if the selected option is default', async () => {
                await nattoSelectWrapper.vm.$emit('update:modelValue', undefined);
                expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
                expect(wrapper.emitted('update:modelValue')).toStrictEqual([
                    [new Period_1.default()]
                ]);
            });
            it('should set the period to the correct date depending on the selected option', async () => {
                await nattoSelectWrapper.vm.$emit('update:modelValue', 7);
                expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
                expect(wrapper.emitted('update:modelValue')).toStrictEqual([
                    [
                        new Period_1.default({
                            startDate: '2022-05-12',
                            endDate: '2022-05-19'
                        })
                    ]
                ]);
            });
        });
    });
    describe('bindings with StartDatePicker', () => {
        describe('props', () => {
            test('static props', () => {
                expect(startDatePickerWrapper.attributes()).toStrictEqual({
                    'lock-after': '',
                    modelvalue: '',
                    placeholder: 'ged.search.filters.period.beginning'
                });
            });
        });
        describe('events', () => {
            it('should set the startDate period', async () => {
                await startDatePickerWrapper.vm.$emit('update:modelValue', '2022-05-19');
                expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
                expect(wrapper.emitted('update:modelValue')).toStrictEqual([
                    [
                        new Period_1.default({
                            startDate: '2022-05-19',
                            endDate: ''
                        })
                    ]
                ]);
                expect(nattoSelectWrapper.props('modelValue')).toStrictEqual(undefined);
            });
        });
    });
    describe('bindings with EndDatePicker', () => {
        test('props', () => {
            expect(endDatePickerWrapper.attributes()).toStrictEqual({
                'lock-before': '',
                modelvalue: '',
                placeholder: 'ged.search.filters.period.end'
            });
        });
        describe('events', () => {
            it('should set the endDate period', async () => {
                await endDatePickerWrapper.vm.$emit('update:modelValue', '2022-05-27');
                expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
                expect(wrapper.emitted('update:modelValue')).toStrictEqual([
                    [
                        new Period_1.default({
                            startDate: '',
                            endDate: '2022-05-27'
                        })
                    ]
                ]);
                expect(nattoSelectWrapper.props('modelValue')).toStrictEqual(undefined);
            });
        });
    });
});
//# sourceMappingURL=PeriodSelector.spec.js.map