"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SearchDatePicker_vue_1 = require("@/modules/Search/components/Filters/AdvancedSearchOptions/SearchDatePicker.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const finders_1 = require("dummy_data/tests/unit/utils/finders");
/****
 * Wrapper creation
 */
const defaultProps = {
    lockAfter: '2022-05-19',
    lockBefore: '2022-05-27',
    title: 'Test',
    placeholder: 'Test placeholder',
    modelValue: '2022-05-19'
};
const createWrapper = ({ props = defaultProps } = {}) => (0, wrapperFactory_1.default)(SearchDatePicker_vue_1.default, {
    props
});
let wrapper = createWrapper();
let nattoDatePickerWrapper = (0, finders_1.findNattoDatePicker)(wrapper);
describe('SearchDatePicker', () => {
    beforeEach(() => {
        wrapper = createWrapper();
        nattoDatePickerWrapper = (0, finders_1.findNattoDatePicker)(wrapper);
    });
    describe('bindings with NattoDatePicker', () => {
        test('props bindings', () => {
            expect(nattoDatePickerWrapper.attributes()).toStrictEqual({
                lockafter: '2022-05-19',
                lockbefore: '2022-05-27',
                placeholder: 'Test placeholder',
                modelvalue: '2022-05-19',
                format: 'DD-MM-YYYY'
            });
        });
        describe('rendering', () => {
            it('should render the title', () => {
                expect(wrapper.text()).toContain('Test');
            });
        });
    });
});
//# sourceMappingURL=SearchDatePicker.spec.js.map