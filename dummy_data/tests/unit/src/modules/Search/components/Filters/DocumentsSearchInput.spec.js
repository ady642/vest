"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DocumentsSearchInput_vue_1 = require("@/modules/Search/components/Filters/DocumentsSearchInput.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const NattoInput_vue_1 = require("@/Common/components/Inputs/NattoInput.vue");
const useStyleguideStubs_1 = require("dummy_data/tests/unit/utils/useStyleguideStubs");
/****
 * Wrapper finders
 */
const findNattoInput = (wrapper) => wrapper.findComponent(NattoInput_vue_1.default);
const { MpIcon } = (0, useStyleguideStubs_1.default)();
const findMpIcon = (wrapper) => wrapper.findComponent(MpIcon);
/****
 * Wrapper creation
 */
const { MpInput } = (0, useStyleguideStubs_1.default)();
const defaultProps = {
    modelValue: '',
    clearable: false
};
const createWrapper = (props = defaultProps) => (0, wrapperFactory_1.default)(DocumentsSearchInput_vue_1.default, {
    props,
    global: {
        stubs: {
            NattoInput: NattoInput_vue_1.default,
            MpInput,
            MpIcon
        }
    }
});
let wrapper = createWrapper();
let nattoInputWrapper = findNattoInput(wrapper);
describe('DocumentsSearchInput', () => {
    beforeEach(() => {
        wrapper = createWrapper();
        nattoInputWrapper = findNattoInput(wrapper);
    });
    describe('bindings with NattoInput', () => {
        test('props bindings', () => {
            wrapper = createWrapper({ modelValue: 'test' });
            expect(findNattoInput(wrapper).props()).toStrictEqual({
                clearable: true,
                debounceTime: 500,
                disabled: false,
                modelValue: 'test',
                placeholder: 'ged.search.input.placeholder'
            });
        });
        describe('events bindings', () => {
            it('should emit update:modelValue when NattoInput emits update:modelValue', async () => {
                // When NattoInput emits update:modelValue
                await nattoInputWrapper.vm.$emit('update:modelValue', 'test');
                // Then DocumentsSearchInput should emit update:modelValue
                expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
                expect(wrapper.emitted('update:modelValue')).toEqual([['test']]);
            });
            it('should emit update:modelValue when NattoInput emits clear', async () => {
                // When NattoInput emits update:modelValue
                await nattoInputWrapper.vm.$emit('clear');
                // Then DocumentsSearchInput should emit update:modelValue with an empty string
                expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
                expect(wrapper.emitted('update:modelValue')).toEqual([['']]);
            });
        });
        describe('rendering', () => {
            it('should render a search icon in the NattoInput prefix slot', () => {
                expect(findMpIcon(wrapper).props('name')).toBe('search');
            });
        });
    });
});
//# sourceMappingURL=DocumentsSearchInput.spec.js.map