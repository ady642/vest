"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NattoDatePicker_vue_1 = require("@/Common/components/Dates/NattoDatePicker.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const useElementStubs_1 = require("dummy_data/tests/unit/utils/useElementStubs");
const { ElDatePicker } = (0, useElementStubs_1.default)();
const createWrapper = (modelValue, placeholder, lockbefore, lockafter, defaultTime) => (0, wrapperFactory_1.default)(NattoDatePicker_vue_1.default, {
    propsData: {
        modelValue,
        placeholder,
        lockbefore,
        lockafter,
        defaultTime
    },
    global: {
        stubs: { ElDatePicker }
    }
});
let wrapper = createWrapper(new Date(1998, 5, 15, 10, 33, 30, 0), 'placehold1');
describe('NattoDatePicker', () => {
    beforeEach(() => {
        wrapper = createWrapper(new Date(1998, 5, 15, 10, 33, 30, 0), 'placehold1', new Date(1998, 0, 1, 10, 33, 30, 0), new Date(1999, 11, 31, 10, 33, 30, 0));
    });
    describe('bindings', () => {
        describe('props', () => {
            it('Should send correctly props to ElDatePicker component', () => {
                const elDatePicker = wrapper.findComponent(ElDatePicker);
                expect(elDatePicker.props('placeholder')).toBe('placehold1');
                expect(elDatePicker.props('modelValue')).toStrictEqual(new Date(1998, 5, 15, 10, 33, 30, 0));
                expect(elDatePicker.props('defaultTime')).toBeUndefined();
            });
            it('disable date should return false for each date not inside the before and after props date period', () => {
                const elDatePicker = wrapper.findComponent(ElDatePicker);
                expect(elDatePicker.props('disabledDate')(new Date(1997, 10, 23))).toBeTruthy();
                expect(elDatePicker.props('disabledDate')(new Date(2000, 0, 1))).toBeTruthy();
                expect(elDatePicker.props('disabledDate')(new Date(1998, 1, 12, 10, 33, 30, 0))).toBeFalsy();
            });
            it('lockerafter and lockbefore can be undefined', () => {
                wrapper = createWrapper(new Date(1998, 5, 15, 10, 33, 30, 0), 'placehold1');
                const elDatePicker = wrapper.findComponent(ElDatePicker);
                expect(elDatePicker.props('lockafter')).toBeUndefined();
                expect(elDatePicker.props('lockbefore')).toBeUndefined();
                expect(elDatePicker.props('disabledDate')(new Date(1998, 1, 12, 10, 33, 30, 0))).toBeFalsy();
            });
        });
    });
});
//# sourceMappingURL=NattoDatePicker.spec.js.map