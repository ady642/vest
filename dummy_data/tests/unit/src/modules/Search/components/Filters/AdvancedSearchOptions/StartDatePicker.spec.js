"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StartDatePicker_vue_1 = require("@/modules/Search/components/Filters/AdvancedSearchOptions/StartDatePicker.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const finders_1 = require("dummy_data/tests/unit/utils/finders");
/****
 * Wrapper creation
 */
const createWrapper = () => (0, wrapperFactory_1.default)(StartDatePicker_vue_1.default);
let wrapper = createWrapper();
let searchDatePickerWrapper = (0, finders_1.findSearchDatePicker)(wrapper);
describe('StartDatePicker', () => {
    beforeEach(() => {
        wrapper = createWrapper();
        searchDatePickerWrapper = (0, finders_1.findSearchDatePicker)(wrapper);
    });
    describe('bindings with SearchDatePicker', () => {
        describe('props', () => {
            test('static props', () => {
                expect(searchDatePickerWrapper.attributes()).toStrictEqual({
                    title: 'ged.common.from'
                });
            });
        });
    });
});
//# sourceMappingURL=StartDatePicker.spec.js.map