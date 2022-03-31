"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FolderActionsDropdownList_vue_1 = require("@/modules/Search/components/Navigation/FolderActionsDropdown/FolderActionsDropdownList/FolderActionsDropdownList.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const FolderActionDropdownItem_vue_1 = require("@/modules/Search/components/Navigation/FolderActionsDropdown/FolderActionsDropdownList/FolderActionDropdownItem.vue");
const storeMock_1 = require("tests/unit/__mocks__/storeMock");
/*******
 Wrapper Creation
 *******/
const defaultProps = {
    folderId: 4521
};
const storeMock = (0, storeMock_1.createDeleteFolderStoreMocked)();
const createWrapper = (props = defaultProps, store = storeMock) => (0, wrapperFactory_1.default)(FolderActionsDropdownList_vue_1.default, {
    props,
    global: {
        plugins: [store],
        stubs: {
            FolderActionDropdownItem: FolderActionDropdownItem_vue_1.default
        }
    }
});
const findFolderActionsDropdownItemWrappers = (wrapper) => wrapper.findAllComponents(FolderActionDropdownItem_vue_1.default);
let wrapper = createWrapper();
/*******
 Tests
 *******/
describe('FolderActionsDropdownList', () => {
    beforeEach(() => {
        wrapper = createWrapper();
    });
    describe('bindings with FolderActionsDropdownItem', () => {
        it('should render 1 FolderActionsDropdownItem', () => {
            expect(findFolderActionsDropdownItemWrappers(wrapper)).toHaveLength(1);
        });
        it('should emit item-click with folderId when FolderActionsDropdownItem emit click', async () => {
            // When FolderActionsDropdownItem emit click
            const folderActionsDropdownItemWrapper = findFolderActionsDropdownItemWrappers(wrapper)[0];
            await folderActionsDropdownItemWrapper.vm.$emit('click');
            // Then it should emit item-click with action name
            expect(wrapper.emitted('item-clicked')).toHaveLength(1);
            expect(wrapper.emitted('item-clicked')).toStrictEqual([['delete']]);
        });
        describe('item disabled depending on store getters', () => {
            const cases = [
                {
                    hasPermissionToDeleteFolder: false,
                    isFolderDeletable: false,
                    expectedDisabled: true
                },
                {
                    hasPermissionToDeleteFolder: false,
                    isFolderDeletable: true,
                    expectedDisabled: true
                },
                {
                    hasPermissionToDeleteFolder: true,
                    isFolderDeletable: false,
                    expectedDisabled: true
                },
                {
                    hasPermissionToDeleteFolder: true,
                    isFolderDeletable: true,
                    expectedDisabled: false
                }
            ];
            it.each(cases)('should return $expectedDisabled when hasPermissionToDelete = $hasPermissionToDelete / isFolderDeletable = $isFolderDeletable', ({ hasPermissionToDeleteFolder, isFolderDeletable, expectedDisabled }) => {
                // Given
                wrapper = createWrapper(defaultProps, (0, storeMock_1.createDeleteFolderStoreMocked)({
                    hasPermissionToDeleteFolder,
                    isFolderDeletable
                }));
                // Then
                const folderActionsDropdownItemWrapper = findFolderActionsDropdownItemWrappers(wrapper)[0];
                expect(folderActionsDropdownItemWrapper.props('disabled')).toBe(expectedDisabled);
            });
        });
    });
});
//# sourceMappingURL=FolderActionsDropdownList.spec.js.map