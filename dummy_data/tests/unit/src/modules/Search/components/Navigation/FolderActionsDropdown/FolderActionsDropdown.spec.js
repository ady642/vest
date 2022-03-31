"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const NattoDropdown_vue_1 = require("@/Common/components/Dropdown/NattoDropdown.vue");
const FolderActionsDropdown_vue_1 = require("@/modules/Search/components/Navigation/FolderActionsDropdown/FolderActionsDropdown.vue");
const Folder_1 = require("@/modules/Search/models/Folders/Inputs/Folder");
const FolderActionsDropdownList_vue_1 = require("@/modules/Search/components/Navigation/FolderActionsDropdown/FolderActionsDropdownList/FolderActionsDropdownList.vue");
const useElementStubs_1 = require("dummy_data/tests/unit/utils/useElementStubs");
const { ElDropdown, ElDropdownMenu } = (0, useElementStubs_1.default)();
const defaultProps = {
    folder: new Folder_1.default({ id: 4521, children: [] })
};
const createWrapper = (props = defaultProps) => (0, wrapperFactory_1.default)(FolderActionsDropdown_vue_1.default, {
    props,
    global: {
        stubs: {
            NattoDropdown: NattoDropdown_vue_1.default,
            ElDropdown,
            ElDropdownMenu
        }
    }
});
const findFolderActionsDropdownListWrapper = (wrapper) => wrapper.findComponent(FolderActionsDropdownList_vue_1.default);
let wrapper = createWrapper();
describe('FolderActionsDropdown', () => {
    beforeEach(() => {
        wrapper = createWrapper();
    });
    describe('bindings with FolderActionsDropdownList', () => {
        it('props binding', () => {
            const folderActionsDropdownListWrapper = findFolderActionsDropdownListWrapper(wrapper);
            expect(folderActionsDropdownListWrapper.props('folderId')).toBe(4521);
        });
        describe('events binding', () => {
            it('should send delete-clicked event with folder when FolderActionsDropdownList emit an item-clicked event with delete as action', async () => {
                // When FolderActionsDropdownList emit an item-clicked event with delete action
                const folderActionsDropdownListWrapper = findFolderActionsDropdownListWrapper(wrapper);
                await folderActionsDropdownListWrapper.vm.$emit('item-clicked', 'delete');
                // Then FolderActionsDropdown should send 1 delete-clicked event with folder as payload
                expect(wrapper.emitted('delete-clicked')).toHaveLength(1);
                expect(wrapper.emitted('delete-clicked')).toStrictEqual([
                    [new Folder_1.default({ id: 4521, children: [] })]
                ]);
            });
        });
    });
});
//# sourceMappingURL=FolderActionsDropdown.spec.js.map