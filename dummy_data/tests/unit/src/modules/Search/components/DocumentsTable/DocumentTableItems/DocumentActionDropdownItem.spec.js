"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DocumentActionDropdownItem_vue_1 = require("@/modules/Search/components/DocumentsTable/DocumentsTableItems/DocumentActionDropdownItem.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const NattoDropdownItem_vue_1 = require("@/Common/components/Dropdown/NattoDropdownItem.vue");
/****
 * Wrapper finders
 */
const findNattoDropdownItem = (wrapper) => wrapper.findComponent(NattoDropdownItem_vue_1.default);
/****
 * Wrapper creation
 */
const defaultProps = {
    label: 'test',
    icon: 'delete',
    disabled: false,
    tooltipContent: 'je suis le tooltipContent'
};
const createWrapper = (props = defaultProps) => (0, wrapperFactory_1.default)(DocumentActionDropdownItem_vue_1.default, {
    props
});
let wrapper = createWrapper();
let nattoDropdownItemWrapper = findNattoDropdownItem(wrapper);
describe('DocumentActionDropdownItem', () => {
    beforeEach(() => {
        wrapper = createWrapper();
        nattoDropdownItemWrapper = findNattoDropdownItem(wrapper);
    });
    describe('bindings with NattoDialogPopup', () => {
        test('props bindings', () => {
            expect(nattoDropdownItemWrapper.props('label')).toBe('test');
            expect(nattoDropdownItemWrapper.props('icon')).toBe('delete');
            expect(nattoDropdownItemWrapper.props('disabled')).toBe(false);
            expect(nattoDropdownItemWrapper.props('tooltipContent')).toBe('je suis le tooltipContent');
        });
    });
});
//# sourceMappingURL=DocumentActionDropdownItem.spec.js.map