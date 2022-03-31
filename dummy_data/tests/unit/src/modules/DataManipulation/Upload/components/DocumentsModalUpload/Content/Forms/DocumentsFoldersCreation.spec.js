"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const NattoButton_vue_1 = require("@/Common/components/Buttons/NattoButton.vue");
const NattoCreateFolderForm_vue_1 = require("@/modules/DataManipulation/Create/CreateFolder/components/NattoCreateFolderForm.vue");
const DocumentsFoldersCreation_vue_1 = require("@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Content/Forms/DocumentsFoldersCreation.vue");
const storeMock_1 = require("tests/unit/__mocks__/storeMock");
const mainStoreMock = (0, storeMock_1.createFolderStoreMocked)();
const createWrapper = (selectedFolderId, showForm, creationFolderError, store = mainStoreMock) => (0, wrapperFactory_1.default)(DocumentsFoldersCreation_vue_1.default, {
    props: {
        selectedFolderId,
        showForm,
        creationFolderError
    },
    global: {
        stubs: {
            NattoButton: NattoButton_vue_1.default,
            NattoCreateFolderForm: NattoCreateFolderForm_vue_1.default
        },
        plugins: [store]
    }
});
let wrapper = createWrapper(1234, true, '');
describe('documents-folders-creation', () => {
    beforeEach(() => {
        wrapper = createWrapper(1234, true, '');
    });
    describe('binding', () => {
        describe('props', () => {
            it('Should bind creationFolderError prop value correctly', () => {
                wrapper = createWrapper(1234, true, 'error');
                const NattoCreateFolderForWrapper = wrapper.findComponent(NattoCreateFolderForm_vue_1.default);
                expect(NattoCreateFolderForWrapper.vm.creationFolderError).toBe('error');
            });
            it('Should bind selectedFolderId prop value correctly', () => {
                const NattoCreateFolderForWrapper = wrapper.findComponent(NattoCreateFolderForm_vue_1.default);
                expect(wrapper.props('selectedFolderId')).toBe(1234);
                expect(wrapper.props('selectedFolderId')).toBe(NattoCreateFolderForWrapper.props('selectedFolderId'));
            });
            it('Should bind showForm prop value correctly', () => {
                expect(wrapper.props('showForm')).toBe(true);
            });
        });
        describe('events', () => {
            it('Should emit on-folder-creation-cta-click when cta click', async () => {
                wrapper = createWrapper(1234, false, '');
                const NatooButtonWrapper = wrapper.findComponent(NattoButton_vue_1.default);
                await NatooButtonWrapper.trigger('click');
                expect(wrapper.emitted('on-folder-creation-cta-click')).toBeTruthy();
            });
            describe('create-folder-click event', () => {
                it('Should emit on-create-folder when  create-folder-click event is triggered', async () => {
                    const data = {
                        targetFolder: 1234,
                        folderName: 'hello'
                    };
                    const NattoCreateFolderForWrapper = wrapper.findComponent(NattoCreateFolderForm_vue_1.default);
                    await NattoCreateFolderForWrapper.vm.$emit('create-folder-click', data);
                    expect(wrapper.emitted('on-create-folder')).toBeTruthy();
                });
                it('Should emit on-cancel-create-folder when cancel-create-folder-click event is triggered', async () => {
                    const NattoCreateFolderForWrapper = wrapper.findComponent(NattoCreateFolderForm_vue_1.default);
                    await NattoCreateFolderForWrapper.vm.$emit('cancel-create-folder-click');
                    expect(wrapper.emitted('on-cancel-create-folder')).toBeTruthy();
                });
            });
        });
    });
    describe('rendering', () => {
        it('Should display create folder form when shoForm is true', () => {
            expect(wrapper.findComponent(NattoCreateFolderForm_vue_1.default).exists()).toBeTruthy();
        });
        it('Should not display create folder form when shoForm is false', () => {
            wrapper = createWrapper(1234, false, '');
            expect(wrapper.findComponent(NattoCreateFolderForm_vue_1.default).exists()).toBeFalsy();
        });
    });
});
//# sourceMappingURL=DocumentsFoldersCreation.spec.js.map