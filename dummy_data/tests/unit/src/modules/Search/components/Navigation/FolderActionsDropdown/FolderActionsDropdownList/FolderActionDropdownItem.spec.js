"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FolderActionDropdownItem_vue_1 = require("@/modules/Search/components/Navigation/FolderActionsDropdown/FolderActionsDropdownList/FolderActionDropdownItem.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const useElementStubs_1 = require("dummy_data/tests/unit/utils/useElementStubs");
const NattoDropdownItem_vue_1 = require("@/Common/components/Dropdown/NattoDropdownItem.vue");
const constants_1 = require("@/Common/constants");
const { ElDropdownItem } = (0, useElementStubs_1.default)();
const defaultProps = {
    label: 'test'
};
const createWrapper = (props = defaultProps) => (0, wrapperFactory_1.default)(FolderActionDropdownItem_vue_1.default, {
    props,
    global: {
        stubs: { ElDropdownItem, NattoDropdownItem: NattoDropdownItem_vue_1.default }
    }
});
let wrapper = createWrapper();
const findNattoDropdownItem = (wrapper) => wrapper.findComponent(NattoDropdownItem_vue_1.default);
describe('FolderActionDropdownItem', () => {
    beforeEach(() => {
        wrapper = createWrapper();
    });
    describe('bindings with ElDropdownItem', () => {
        it('props <=> :props', () => {
            // Given FolderActionDropdownItem receive props
            wrapper = createWrapper({
                icon: 'delete',
                label: 'Supprimer',
                disabled: false
            });
            // Then ElDropdownItem must receive those props
            const nattoDropdownItemWrapper = findNattoDropdownItem(wrapper);
            expect(nattoDropdownItemWrapper.props('icon')).toBe('delete');
            expect(nattoDropdownItemWrapper.props('disabled')).toBe(false);
            expect(nattoDropdownItemWrapper.props('label')).toBe('Supprimer');
            expect(nattoDropdownItemWrapper.props('tooltipContent')).toBe(constants_1.default.messages.folders.delete.error);
        });
    });
});
//# sourceMappingURL=FolderActionDropdownItem.spec.js.map