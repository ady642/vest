"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NattoError_vue_1 = require("@/Common/components/Inputs/NattoError.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
/****
 * Wrapper creation
 */
const defaultProps = {
    errorMessage: ''
};
const createWrapper = (props = defaultProps) => (0, wrapperFactory_1.default)(NattoError_vue_1.default, {
    props
});
let wrapper = createWrapper();
describe('NattoError', () => {
    beforeEach(() => {
        wrapper = createWrapper();
    });
    describe('rendering', () => {
        test('should render the error', () => {
            wrapper = createWrapper({ errorMessage: 'error' });
            expect(wrapper.text()).toContain('error');
        });
    });
});
//# sourceMappingURL=NattoError.spec.js.map