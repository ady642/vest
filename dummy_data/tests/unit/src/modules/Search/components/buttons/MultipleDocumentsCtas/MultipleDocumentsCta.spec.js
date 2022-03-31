"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MultipleDocumentsCta_vue_1 = require("@/modules/Search/components/Buttons/MultipleDocumentsCtas/MultipleDocumentsCta.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
/****
 * Wrapper creation
 */
const defaultProps = {
    text: 'Columbo'
};
const createWrapper = ({ props = defaultProps, slots = { 'prepend-icon': '<div>The prepend icon </div>' } } = {}) => (0, wrapperFactory_1.default)(MultipleDocumentsCta_vue_1.default, {
    props,
    slots,
    global: {
        renderStubDefaultSlot: true
    }
});
let wrapper = createWrapper();
describe('MultipleDocumentsCta', () => {
    beforeEach(() => {
        wrapper = createWrapper();
    });
    describe('bindings with NattoButton', () => {
        describe('rendering', () => {
            it('should render the text and prepend icon', () => {
                expect(wrapper.text()).toContain('The prepend icon Columbo');
            });
        });
    });
});
//# sourceMappingURL=MultipleDocumentsCta.spec.js.map