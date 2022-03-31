"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CertifiedSelector_vue_1 = require("@/modules/Search/components/Filters/AdvancedSearchOptions/CertifiedSelector.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const finders_1 = require("dummy_data/tests/unit/utils/finders");
/****
 * Wrapper creation
 */
const defaultProps = {
    modelValue: 'all'
};
const createWrapper = ({ props = defaultProps } = {}) => (0, wrapperFactory_1.default)(CertifiedSelector_vue_1.default, {
    props
});
let wrapper = createWrapper();
let nattoRadioGroupWrapper = (0, finders_1.findNattoRadioGroup)(wrapper);
describe('CertifiedSelector', () => {
    beforeEach(() => {
        wrapper = createWrapper();
        nattoRadioGroupWrapper = (0, finders_1.findNattoRadioGroup)(wrapper);
    });
    describe('bindings with NattoRadioGroup', () => {
        test('props bindings', () => {
            expect(nattoRadioGroupWrapper.props()).toStrictEqual({
                radioItems: [
                    {
                        value: 'all',
                        label: 'ged.search.filters.certified.all'
                    },
                    {
                        value: true,
                        label: 'ged.search.filters.certified.onlyCertified'
                    },
                    {
                        value: false,
                        label: 'ged.search.filters.certified.excludeCertified'
                    }
                ]
            });
            expect(nattoRadioGroupWrapper.attributes('modelvalue')).toBe('all');
        });
        describe('events', () => {
            it('should emit update:modelValue when NattoRadioGroup emit update:modelValue', async () => {
                wrapper = createWrapper();
                nattoRadioGroupWrapper = (0, finders_1.findNattoRadioGroup)(wrapper);
                await nattoRadioGroupWrapper.vm.$emit('update:modelValue', false);
                expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
                expect(wrapper.emitted('update:modelValue')).toStrictEqual([[false]]);
            });
        });
    });
});
//# sourceMappingURL=CertifiedSelector.spec.js.map