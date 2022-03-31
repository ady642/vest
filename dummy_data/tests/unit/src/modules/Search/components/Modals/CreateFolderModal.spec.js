"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const useElementStubs_1 = require("dummy_data/tests/unit/utils/useElementStubs");
const NattoButton_vue_1 = require("@/Common/components/Buttons/NattoButton.vue");
const NattoCreateFolderForm_vue_1 = require("@/modules/DataManipulation/Create/CreateFolder/components/NattoCreateFolderForm.vue");
const CreateFolderModal_vue_1 = require("@/modules/Search/components/Modals/CreateFolderModal.vue");
const storeMock_1 = require("tests/unit/__mocks__/storeMock");
const store_1 = require("@/modules/DataManipulation/Create/CreateFolder/store");
const FolderExistsError_1 = require("@/Common/errors/FolderExistsError");
const mockStore = (0, storeMock_1.createFolderStoreMocked)();
const { ElDialog, ElButton, ElInput } = (0, useElementStubs_1.default)();
const createWrapper = (selectedFolderId, modelValue, store = mockStore) => (0, wrapperFactory_1.default)(CreateFolderModal_vue_1.default, {
    props: {
        selectedFolderId,
        modelValue
    },
    global: {
        stubs: {
            ElButton,
            ElInput,
            NattoButton: NattoButton_vue_1.default,
            ElDialog,
            NattoCreateFolderForm: NattoCreateFolderForm_vue_1.default
        },
        plugins: [store]
    }
});
let wrapper = createWrapper(1234, true);
describe('create-folder-modal', () => {
    beforeEach(() => {
        wrapper = createWrapper(1234, true);
        mockStore.dispatch = jest.fn();
        jest.clearAllMocks();
    });
    describe('binding', () => {
        describe('props', () => {
            it('Should bind selectedFolderId prop value correctly', () => {
                const NattoCreateFolderForWrapper = wrapper.findComponent(NattoCreateFolderForm_vue_1.default);
                expect(wrapper.props('selectedFolderId')).toBe(1234);
                expect(wrapper.props('selectedFolderId')).toBe(NattoCreateFolderForWrapper.props('selectedFolderId'));
            });
            it('Should bind modelValue prop value correctly', () => {
                expect(wrapper.props('modelValue')).toBe(true);
            });
        });
        describe('events', () => {
            describe('create-folder-click event', () => {
                it('Should dispatch createFolderByArbo when create-folder-click event is triggered', async () => {
                    wrapper = createWrapper(1234, true);
                    const data = {
                        targetFolder: 1234,
                        folderName: 'hello'
                    };
                    const NattoCreateFolderForWrapper = wrapper.findComponent(NattoCreateFolderForm_vue_1.default);
                    await NattoCreateFolderForWrapper.vm.$emit('create-folder-click', data);
                    await wrapper.vm.$nextTick();
                    expect(mockStore.dispatch).toHaveBeenCalledWith((0, store_1.createFolderModule)('CreateFolder'), {
                        targetFolder: 1234,
                        folderName: 'hello'
                    });
                    expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);
                });
                it('Should catch createFolderByArbo error when create-folder-click event is triggered', async () => {
                    mockStore.dispatch = jest.fn(() => {
                        throw new FolderExistsError_1.default();
                    });
                    const data = {
                        targetFolder: 1234,
                        folderName: 'hello'
                    };
                    wrapper = createWrapper(1234, true);
                    const nattoCreateFolderWrapper = wrapper.findComponent(NattoCreateFolderForm_vue_1.default);
                    // When create-folder-click is emitted
                    await nattoCreateFolderWrapper.vm.$emit('create-folder-click', data);
                    // Then set the error message
                    expect(wrapper.vm.creationFolderError).toBe('ged.dataManipulation.create.folder.error.alreadyExists with {"folderName":"hello"}');
                });
            });
            it('Should reset error and close the modal when cancel-create-folder-click event is triggered', async () => {
                const nattoCreateFolderForWrapper = wrapper.findComponent(NattoCreateFolderForm_vue_1.default);
                await nattoCreateFolderForWrapper.vm.$emit('cancel-create-folder-click');
                expect(nattoCreateFolderForWrapper.props('creationFolderError')).toBe('');
                expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);
            });
        });
    });
});
//# sourceMappingURL=CreateFolderModal.spec.js.map