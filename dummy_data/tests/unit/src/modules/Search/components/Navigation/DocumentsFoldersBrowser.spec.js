"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FoldersDataMock_1 = require("dummy_data/tests/unit/src/modules/Search/mocks/FoldersDataMock");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const useElementStubs_1 = require("dummy_data/tests/unit/utils/useElementStubs");
const Folder_1 = require("@/modules/Search/models/Folders/Inputs/Folder");
const NattoFoldersBrowser_vue_1 = require("@/Common/components/Navigation/NattoFoldersBrowser.vue");
const DocumentsFoldersBrowser_vue_1 = require("@/modules/Search/components/Navigation/DocumentsFoldersBrowser.vue");
const FolderActionsDropdown_vue_1 = require("@/modules/Search/components/Navigation/FolderActionsDropdown/FolderActionsDropdown.vue");
const DeleteFolderModalConfirmation_vue_1 = require("@/modules/DataManipulation/Delete/DeleteFolder/components/Modals/DeleteFolderModalConfirmation.vue");
const GedSyncStatusIcon_vue_1 = require("@/Common/components/Icons/GedSyncStatusIcon.vue");
const { FoldersData } = (0, FoldersDataMock_1.default)();
const { ElScrollbar } = (0, useElementStubs_1.default)();
const createWrapper = (folders, searchFolderId, height, disabled, inUpload, isCollabUser) => (0, wrapperFactory_1.default)(DocumentsFoldersBrowser_vue_1.default, {
    props: {
        folders,
        searchFolderId,
        height,
        disabled,
        inUpload,
        isCollabUser
    },
    global: {
        stubs: {
            NattoFoldersBrowser: NattoFoldersBrowser_vue_1.default,
            ElScrollbar
        }
    }
});
const findFolderActionsDropdown = (wrapper) => wrapper.findComponent(FolderActionsDropdown_vue_1.default);
const findDeleteFolderModalConfirmation = (wrapper) => wrapper.findComponent(DeleteFolderModalConfirmation_vue_1.default);
const wrapper = createWrapper(FoldersData, 1122, 160, false, false, false);
describe('documents-folders-browser', () => {
    describe('rendering', () => {
        it('should render ged sync icon when isCollabUser is true', () => {
            let wrapper = createWrapper(FoldersData, 1122, 160, false, false, true);
            const GedSyncStatusIconWrapper = wrapper.findComponent(GedSyncStatusIcon_vue_1.default);
            const syncSuccessIconWrapper = GedSyncStatusIconWrapper.find('.sync-success');
            const syncPendingIconWrapper = GedSyncStatusIconWrapper.find('.sync-pending');
            const syncFailedIconWrapper = GedSyncStatusIconWrapper.find('.sync-fail');
            expect(syncSuccessIconWrapper.exists).toBeTruthy();
            expect(syncPendingIconWrapper.exists).toBeTruthy();
            expect(syncFailedIconWrapper.exists).toBeTruthy();
        });
        it('should not render ged sync icon when isCollabUser is false', () => {
            expect(wrapper.findComponent(GedSyncStatusIcon_vue_1.default).exists()).toBeFalsy();
        });
    });
    describe('binding', () => {
        describe('props', () => {
            it('Should have a correct folders binding', () => {
                const NattoFoldersBrowserWrapper = wrapper.findComponent(NattoFoldersBrowser_vue_1.default);
                expect(NattoFoldersBrowserWrapper.props('folders')).toHaveLength(1);
            });
            it('Should have the correct height value', () => {
                const NattoFoldersBrowserWrapper = wrapper.findComponent(NattoFoldersBrowser_vue_1.default);
                expect(NattoFoldersBrowserWrapper.props('height')).toEqual(160);
            });
            it('Should pass the correct disabled prop to child component', () => {
                const NattoFoldersBrowserWrapper = wrapper.findComponent(NattoFoldersBrowser_vue_1.default);
                expect(NattoFoldersBrowserWrapper.props('disabled')).toEqual(wrapper.vm.disabled);
            });
            it('Should pass the correct inUpload prop to child component', () => {
                const NattoFoldersBrowserWrapper = wrapper.findComponent(NattoFoldersBrowser_vue_1.default);
                expect(NattoFoldersBrowserWrapper.props('inUpload')).toEqual(wrapper.vm.inUpload);
            });
        });
        describe('events', () => {
            it('should fire update:selectedFolderToUpload when natto-folders-browser fire browser-folder-selected', () => {
                const NattoFoldersBrowserWrapper = wrapper.findComponent(NattoFoldersBrowser_vue_1.default);
                NattoFoldersBrowserWrapper.vm.$emit('browser-folder-selected', 55);
                expect(wrapper.emitted('update:searchFolderId')).toBeTruthy();
                expect(wrapper.emitted()['update:searchFolderId'][0]).toStrictEqual([
                    55
                ]);
            });
            it('should not fire update:selectedFolderToUpload when natto-folders-browser fire browser-folder-selected and disabled is true', () => {
                const wrapper = createWrapper(FoldersData, 1122, 160, true, false, false);
                const NattoFoldersBrowserWrapper = wrapper.findComponent(NattoFoldersBrowser_vue_1.default);
                NattoFoldersBrowserWrapper.vm.$emit('browser-folder-selected', 55);
                expect(wrapper.emitted('update:selectedFolderToUpload')).toBeFalsy();
            });
            it('should open DeleteFolderModal when delete-clicked is clicked', async () => {
                // When FolderActionsDropdown emit delete-item
                const folderActionsDropdownWrapper = findFolderActionsDropdown(wrapper);
                await folderActionsDropdownWrapper.vm.$emit('delete-clicked', new Folder_1.default({ id: 4521, name: 'home' }));
                // Then DeleteFolderModalConfirmation must be opened
                const deleteFolderModalConfirmationWrapper = findDeleteFolderModalConfirmation(wrapper);
                expect(deleteFolderModalConfirmationWrapper.props('modelValue')).toBe(true);
                expect(deleteFolderModalConfirmationWrapper.props('folderName')).toBe('home');
                expect(deleteFolderModalConfirmationWrapper.props('folderId')).toBe(4521);
            });
        });
    });
});
//# sourceMappingURL=DocumentsFoldersBrowser.spec.js.map