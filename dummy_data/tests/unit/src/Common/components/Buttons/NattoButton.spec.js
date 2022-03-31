"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NattoButton_vue_1 = require("/home/adri/Desktop/Projects/unittestgen/dummy_data/src/Common/components/Buttons/NattoButton.vue");
const wrapperFactory_1 = require("tests/unit/utils/wrapperFactory");
const useElementStubs_1 = require("tests/unit/utils/useElementStubs");
const defaultProps = {
    nativeType: 'test string', type: 'test string', loading: true, disabled: true
};
const { ElButton } = (0, useElementStubs_1.default)();
const createWrapper = ({ props = defaultProps, } = {}) => (0, wrapperFactory_1.default)(NattoButton_vue_1.default, {
    props
});
let wrapper = createWrapper();
let findElButton = (wrapper) => wrapper.findComponent(ElButton);
let ElButtonWrapper = findElButton(wrapper);
describe(NattoButton_vue_1.default, () => {
    beforeEach(() => {
        wrapper = createWrapper();
        ElButtonWrapper = findElButton(wrapper);
    });
    describe('binding with ElButton', () => {
        test('static props', () => {
            expect(ElButtonWrapper.attributes('loading')).toBe(defaultProps.loading);
            expect(ElButtonWrapper.attributes('disabled')).toBe(defaultProps.disabled);
            expect(ElButtonWrapper.attributes('type')).toBe(defaultProps.type);
            expect(ElButtonWrapper.attributes('native-type')).toBe(defaultProps.nativeType);
        });
    });
    describe('rendering', () => {
        it('should render the undefined slot', () => {
            expect(wrapper.html()).toContain('I fill the undefined slot');
        });
    });
});
//# sourceMappingURL=NattoButton.spec.js.map