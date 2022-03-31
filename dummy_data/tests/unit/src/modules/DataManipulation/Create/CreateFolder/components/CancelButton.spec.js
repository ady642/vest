"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CancelButton_vue_1 = require("@/modules/DataManipulation/Create/CreateFolder/components/CancelButton.vue");
const NattoButton_vue_1 = require("@/Common/components/Buttons/NattoButton.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const useElementStubs_1 = require("dummy_data/tests/unit/utils/useElementStubs");
/****
 * Wrapper finders
 */
const findNattoButton = (wrapper) => wrapper.findComponent(NattoButton_vue_1.default);
/****
 * Wrapper creation
 */
const defaultProps = {
    disabled: false
};
const { ElButton } = (0, useElementStubs_1.default)();
const createWrapper = (props = defaultProps) => (0, wrapperFactory_1.default)(CancelButton_vue_1.default, {
    props,
    global: {
        stubs: {
            NattoButton: NattoButton_vue_1.default,
            ElButton
        }
    }
});
let wrapper = createWrapper();
let nattoButtonWrapper = findNattoButton(wrapper);
describe('CancelButton', () => {
    beforeEach(() => {
        wrapper = createWrapper();
        nattoButtonWrapper = findNattoButton(wrapper);
    });
    describe('bindings with NattoButton', () => {
        test('props bindings', () => {
            expect(nattoButtonWrapper.props('disabled')).toBe(false);
        });
        it('should render the Create translation key', () => {
            expect(wrapper.text()).toContain('ged.dataManipulation.label.cancel');
        });
    });
});
//# sourceMappingURL=CancelButton.spec.js.map