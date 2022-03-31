"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NattoSelect_vue_1 = require("@/Common/components/Select/NattoSelect.vue");
const SelectOption_1 = require("@/Common/models/Select/SelectOption");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const useElementStubs_1 = require("dummy_data/tests/unit/utils/useElementStubs");
const { ElSelect, ElOption } = (0, useElementStubs_1.default)();
const createWrapper = (modelValue, options) => (0, wrapperFactory_1.default)(NattoSelect_vue_1.default, {
    propsData: {
        modelValue,
        options
    },
    global: {
        stubs: { ElSelect, ElOption }
    }
});
let wrapper = createWrapper(1, [
    new SelectOption_1.default('', undefined),
    new SelectOption_1.default('l1', 1),
    new SelectOption_1.default('l2', 2),
    new SelectOption_1.default('l3', 3)
]);
describe('NattoSelect', () => {
    beforeEach(() => {
        wrapper = createWrapper(1, [
            new SelectOption_1.default('', undefined),
            new SelectOption_1.default('l1', 1),
            new SelectOption_1.default('l2', 2),
            new SelectOption_1.default('l3', 3)
        ]);
    });
    describe('bindings', () => {
        describe('props', () => {
            it('Should send correctly props to ElSelect component - default case', () => {
                const elSelectWrapper = wrapper.findComponent(ElSelect);
                expect(elSelectWrapper.props('modelValue')).toBe(1);
            });
            it('Should send correctly props to ElSelect component - non default case', () => {
                wrapper = createWrapper(1, [
                    new SelectOption_1.default('', undefined),
                    new SelectOption_1.default('l1', 1),
                    new SelectOption_1.default('l2', 2),
                    new SelectOption_1.default('l3', 3)
                ]);
                const elSelectWrapper = wrapper.findComponent(ElSelect);
                expect(elSelectWrapper.props('modelValue')).toBe(1);
            });
        });
    });
    describe('events', () => {
        test('Switch of el select value should trigger an emit from NattoSelect', () => {
            const elSelectWrapper = wrapper.findComponent(ElSelect);
            elSelectWrapper.vm.$emit('update:modelValue', 2);
            expect(wrapper.emitted('update:modelValue')).toEqual([[2]]);
            expect(wrapper.emitted('update:modelValue')).toBeTruthy();
        });
    });
});
//# sourceMappingURL=NattoSelect.spec.js.map