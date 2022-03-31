"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const FileUpload_1 = require("@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload");
const UploadFileInfos_vue_1 = require("@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Content/UploadFileInfos.vue");
const UploadDocumentNavigator_vue_1 = require("@/modules/DataManipulation/Upload/components/Navigation/UploadDocumentNavigator.vue");
const UploadBreadcrumb_vue_1 = require("@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Content/UploadBreadcrumb.vue");
const Folders_1 = require("@/modules/Search/models/Folders/Inputs/Folders");
const FolderInfoBox_vue_1 = require("@/modules/DataManipulation/Upload/components/Notification/FolderInfoBox.vue");
const DocumentsFoldersCreation_vue_1 = require("@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Content/Forms/DocumentsFoldersCreation.vue");
const storeMock_1 = require("tests/unit/__mocks__/storeMock");
const NattoCreateFolderForm_vue_1 = require("@/modules/DataManipulation/Create/CreateFolder/components/NattoCreateFolderForm.vue");
const store_1 = require("@/modules/DataManipulation/Create/CreateFolder/store");
const folderMock_1 = require("@/modules/Search/services/__mocks__/folderMock");
const analyticsLog_1 = require("@/Common/helpers/analyticsLog");
const UploadFileInfosDescription_vue_1 = require("@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Content/Texts/UploadFileInfosDescription.vue");
const FolderExistsError_1 = require("@/Common/errors/FolderExistsError");
const uploadErrorMapping_1 = require("@/Common/consts/uploadErrorMapping");
jest.mock('@/Common/helpers/analyticsLog', () => ({
    trackEventFactory: jest.fn(),
    pageViewFactory: jest.fn()
}));
const mainStoreMock = (0, storeMock_1.createFolderStoreMocked)();
mainStoreMock.state.GED.Search.folders = Folders_1.default.loaded(folderMock_1.folderMock);
let storeMock = mainStoreMock;
const findUploadFileInfosDescription = (wrapper) => wrapper.findComponent(UploadFileInfosDescription_vue_1.default);
const defaultProps = {
    selectedFolderToUpload: 135393635,
    file: new FileUpload_1.default(new File([''], 'filename', { type: 'text/html' }), FileUpload_1.StateUpload.TO_UPLOAD),
    disabledCategories: false,
    canUpload: true,
    triggerUploadAllFiles: false
};
const createWrapper = (props = defaultProps, store = mainStoreMock) => (0, wrapperFactory_1.default)(UploadFileInfos_vue_1.default, {
    props,
    global: {
        stubs: {
            UploadDocumentNavigator: UploadDocumentNavigator_vue_1.default,
            UploadBreadcrumb: UploadBreadcrumb_vue_1.default,
            FolderInfoBox: FolderInfoBox_vue_1.default,
            DocumentsFoldersCreation: DocumentsFoldersCreation_vue_1.default
        },
        plugins: [store]
    }
});
let wrapper = createWrapper();
let uploadFileInfosDescriptionWrapper = findUploadFileInfosDescription(wrapper);
describe('UploadFileInfos', () => {
    beforeEach(() => {
        wrapper = createWrapper();
        uploadFileInfosDescriptionWrapper = findUploadFileInfosDescription(wrapper);
        mainStoreMock.dispatch = jest.fn();
        jest.clearAllMocks();
    });
    describe('bindings with UploadFileInfosDescription', () => {
        describe('props bindings', () => {
            // Given the UploadFileInfosDescription is displayed
            const file = new FileUpload_1.default(new File([''], 'filename', { type: 'text/html' }), FileUpload_1.StateUpload.UPLOADING);
            wrapper = createWrapper({
                ...defaultProps,
                triggerUploadAllFiles: true,
                file
            });
            uploadFileInfosDescriptionWrapper =
                findUploadFileInfosDescription(wrapper);
            expect(uploadFileInfosDescriptionWrapper.vm.selectedFolderName).toEqual('Comptabilité');
        });
    });
    describe('binding ', () => {
        describe('props', () => {
            describe('upload-file-permission', () => {
                it('Should hide folders navigation  on icon click', async () => {
                    wrapper = createWrapper({
                        selectedFolderToUpload: 135393651,
                        file: new FileUpload_1.default(new File([''], 'filename', { type: 'text/html' }), FileUpload_1.StateUpload.TO_UPLOAD),
                        disabledCategories: false,
                        canUpload: true,
                        triggerUploadAllFiles: false
                    }, (0, storeMock_1.createFolderStoreMocked)({
                        hasPermissionToAddFolder: true
                    }));
                    wrapper.vm.displayFolderCreation = true;
                    await wrapper.vm.$nextTick();
                    const AddFolderIcon = wrapper.find('.add-folder-icon');
                    await AddFolderIcon.trigger('click');
                    expect(analyticsLog_1.trackEventFactory).toBeCalledWith('updm-select-destination-file-add-folder-icon');
                    const UploadDocumentNavigatorWrapper = wrapper.findComponent(UploadDocumentNavigator_vue_1.default);
                    expect(UploadDocumentNavigatorWrapper.exists()).toBeFalsy();
                });
                it('Should show folders navigation  on cancel click', async () => {
                    wrapper = createWrapper({
                        selectedFolderToUpload: 135393635,
                        file: new FileUpload_1.default(new File([''], 'filename', { type: 'text/html' }), FileUpload_1.StateUpload.TO_UPLOAD),
                        disabledCategories: false,
                        canUpload: true,
                        triggerUploadAllFiles: false
                    }, (0, storeMock_1.createFolderStoreMocked)({
                        hasPermissionToAddFolder: true
                    }));
                    const AddFolderIcon = wrapper.find('.add-folder-icon');
                    await AddFolderIcon.trigger('click');
                    expect(analyticsLog_1.trackEventFactory).toBeCalledWith('updm-select-destination-file-add-folder-icon');
                    const DocumentsFoldersCreationWrapper = wrapper.findComponent(DocumentsFoldersCreation_vue_1.default);
                    await DocumentsFoldersCreationWrapper.vm.$emit('on-cancel-create-folder');
                    const UploadDocumentNavigatorWrapper = wrapper.findComponent(UploadDocumentNavigator_vue_1.default);
                    expect(UploadDocumentNavigatorWrapper.exists()).toBeTruthy();
                });
                it('Should pass the correct folderName to child component', () => {
                    const FolderInfoBoxWrapper = wrapper.findComponent(FolderInfoBox_vue_1.default);
                    expect(FolderInfoBoxWrapper.props('folderName')).toBe('Comptabilité');
                });
                it('Should pass the correct folderDescription to child component', () => {
                    const FolderInfoBoxWrapper = wrapper.findComponent(FolderInfoBox_vue_1.default);
                    expect(FolderInfoBoxWrapper.props('folderDescription')).toBe('this Comptabilité description.');
                });
                it('Should pass the correct canUpload value to child component', () => {
                    const FolderInfoBoxWrapper = wrapper.findComponent(FolderInfoBox_vue_1.default);
                    expect(FolderInfoBoxWrapper.props('canUpload')).toBe(wrapper.props('canUpload'));
                });
                it('Should hide folderInfo when treat by collab is chosen', () => {
                    wrapper = createWrapper({
                        selectedFolderToUpload: 135393635,
                        file: new FileUpload_1.default(new File([''], 'filename', { type: 'text/html' }), FileUpload_1.StateUpload.TO_UPLOAD),
                        disabledCategories: false,
                        canUpload: true,
                        triggerUploadAllFiles: true
                    });
                    expect(wrapper.findComponent(FolderInfoBox_vue_1.default).exists()).toBeFalsy();
                });
            });
            it('Should pass the correct selectedFolderToUpload to child component', () => {
                const UploadDocumentNavigatorWrapper = wrapper.findComponent(UploadDocumentNavigator_vue_1.default);
                expect(UploadDocumentNavigatorWrapper.props('searchFolderId')).toEqual(wrapper.props('selectedFolderToUpload'));
            });
            it('Should pass the correct folders to child component', () => {
                const UploadDocumentNavigatorWrapper = wrapper.findComponent(UploadDocumentNavigator_vue_1.default);
                expect(UploadDocumentNavigatorWrapper.props('folders').collection.length).toEqual(wrapper.vm.folders.collection.length);
            });
            it('Should bind correctly the file prop ', () => {
                expect(wrapper.vm.file).toStrictEqual(new FileUpload_1.default(new File([''], 'filename', { type: 'text/html' }), FileUpload_1.StateUpload.TO_UPLOAD));
                expect(wrapper.vm.file.state).toEqual(FileUpload_1.StateUpload.TO_UPLOAD);
            });
            it('Should pass the correct disabledCategories prop to child component', () => {
                const UploadDocumentNavigatorWrapper = wrapper.findComponent(UploadDocumentNavigator_vue_1.default);
                expect(UploadDocumentNavigatorWrapper.props('disabled')).toEqual(wrapper.vm.disabledCategories);
            });
            it('Should pass the correct disabledCategories prop to child component', () => {
                const UploadDocumentNavigatorWrapper = wrapper.findComponent(UploadDocumentNavigator_vue_1.default);
                expect(UploadDocumentNavigatorWrapper.props('disabled')).toEqual(wrapper.vm.disabledCategories);
            });
            it('Should pass the correct props to UploadBreadcrumb', () => {
                const UploadBreadcrumbWrapper = wrapper.findComponent(UploadBreadcrumb_vue_1.default);
                expect(UploadBreadcrumbWrapper.props('disabledBreadcrumb')).toEqual(wrapper.vm.disabledCategories);
                expect(UploadBreadcrumbWrapper.props('folders')).toEqual(wrapper.vm.folders);
                expect(UploadBreadcrumbWrapper.props('selectedFolderToUpload')).toEqual(wrapper.vm.selectedFolderToUpload);
            });
        });
        describe('DocumentsFoldersCreation', () => {
            it('Should pass the canceled error correctly', async () => {
                const file = new FileUpload_1.default(new File([''], 'filename', { type: 'text/html' }), FileUpload_1.StateUpload.CANCELED);
                file.errorDescription = (0, uploadErrorMapping_1.default)('CanceledUpload');
                wrapper = createWrapper({
                    selectedFolderToUpload: 135393651,
                    file,
                    disabledCategories: false,
                    canUpload: true,
                    triggerUploadAllFiles: false
                });
                const DocumentsFoldersCreationWrapper = wrapper.find('error-zone');
                // Then set the error message
                expect(DocumentsFoldersCreationWrapper).toBeTruthy();
            });
            it('Should pass the creationFolderError correctly', async () => {
                const mockStore = (0, storeMock_1.createFolderStoreMocked)({
                    hasPermissionToAddFolder: true
                });
                mockStore.dispatch = jest.fn(() => {
                    throw new FolderExistsError_1.default();
                });
                wrapper = createWrapper({
                    selectedFolderToUpload: 135393651,
                    file: new FileUpload_1.default(new File([''], 'filename', { type: 'text/html' }), FileUpload_1.StateUpload.TO_UPLOAD),
                    disabledCategories: false,
                    canUpload: true,
                    triggerUploadAllFiles: false
                }, mockStore);
                wrapper.vm.displayFolderCreation = true;
                await wrapper.vm.$nextTick();
                const DocumentsFoldersCreationWrapper = wrapper.findComponent(DocumentsFoldersCreation_vue_1.default);
                const data = {
                    targetFolder: 1234,
                    folderName: 'hello'
                };
                // When create-folder-click is emitted
                await DocumentsFoldersCreationWrapper.vm.$emit('on-create-folder', data);
                await wrapper.vm.$nextTick();
                // Then set the error message
                expect(wrapper.vm.creationFolderError).toBe('ged.dataManipulation.create.folder.error.alreadyExists with {"folderName":"hello"}');
            });
            it('Should pass selectedFolderId correctly to child component ', async () => {
                wrapper = createWrapper({
                    selectedFolderToUpload: 135393651,
                    file: new FileUpload_1.default(new File([''], 'filename', { type: 'text/html' }), FileUpload_1.StateUpload.TO_UPLOAD),
                    disabledCategories: false,
                    canUpload: true,
                    triggerUploadAllFiles: false
                }, (0, storeMock_1.createFolderStoreMocked)({
                    hasPermissionToAddFolder: true
                }));
                wrapper.vm.displayFolderCreation = true;
                await wrapper.vm.$nextTick();
                const DocumentsFoldersCreationWrapper = wrapper.findComponent(DocumentsFoldersCreation_vue_1.default);
                expect(wrapper.props('selectedFolderToUpload')).toBe(DocumentsFoldersCreationWrapper.props('selectedFolderId'));
            });
            it('Should pass the correct shoForm prop to child component', async () => {
                wrapper = createWrapper({
                    selectedFolderToUpload: 135393651,
                    file: new FileUpload_1.default(new File([''], 'filename', { type: 'text/html' }), FileUpload_1.StateUpload.TO_UPLOAD),
                    disabledCategories: false,
                    canUpload: true,
                    triggerUploadAllFiles: false
                }, (0, storeMock_1.createFolderStoreMocked)({
                    hasPermissionToAddFolder: true
                }));
                wrapper.vm.displayFolderCreation = true;
                await wrapper.vm.$nextTick();
                const DocumentsFoldersCreationWrapper = wrapper.findComponent(DocumentsFoldersCreation_vue_1.default);
                expect(DocumentsFoldersCreationWrapper.props('showForm')).toBe(wrapper.vm.showForm);
            });
        });
    });
    describe('rendering', () => {
        describe('DocumentsFoldersCreation', () => {
            it('Should be visible when showCreateFolderForm  is true', async () => {
                wrapper = createWrapper({
                    selectedFolderToUpload: 1122,
                    file: new FileUpload_1.default(new File([''], 'filename', { type: 'text/html' }), FileUpload_1.StateUpload.TO_UPLOAD),
                    disabledCategories: false,
                    canUpload: true,
                    triggerUploadAllFiles: false
                }, (0, storeMock_1.createFolderStoreMocked)({
                    hasPermissionToAddFolder: true
                }));
                wrapper.vm.displayFolderCreation = true;
                await wrapper.vm.$nextTick();
                const DocumentsFoldersCreationWrapper = wrapper.findComponent(DocumentsFoldersCreation_vue_1.default);
                expect(DocumentsFoldersCreationWrapper.exists()).toBeTruthy();
            });
            it('Should not be visible when folder has childrens', () => {
                wrapper = createWrapper({
                    selectedFolderToUpload: 135393635,
                    file: new FileUpload_1.default(new File([''], 'filename', { type: 'text/html' }), FileUpload_1.StateUpload.TO_UPLOAD),
                    disabledCategories: false,
                    canUpload: true,
                    triggerUploadAllFiles: false
                }, (0, storeMock_1.createFolderStoreMocked)({
                    hasPermissionToAddFolder: true
                }));
                const DocumentsFoldersCreationWrapper = wrapper.findComponent(DocumentsFoldersCreation_vue_1.default);
                expect(DocumentsFoldersCreationWrapper.exists()).toBeFalsy();
            });
            it('Should not be visible when selectedFolderToUpload  is 0', () => {
                wrapper = createWrapper({
                    selectedFolderToUpload: 0,
                    file: new FileUpload_1.default(new File([''], 'filename', { type: 'text/html' }), FileUpload_1.StateUpload.TO_UPLOAD),
                    disabledCategories: false,
                    canUpload: true,
                    triggerUploadAllFiles: false
                }, (0, storeMock_1.createFolderStoreMocked)({
                    hasPermissionToAddFolder: true
                }));
                const DocumentsFoldersCreationWrapper = wrapper.findComponent(DocumentsFoldersCreation_vue_1.default);
                expect(DocumentsFoldersCreationWrapper.exists()).toBeFalsy();
            });
            it('Should not be visible when displayFolderCreation  is false', async () => {
                wrapper = createWrapper({
                    selectedFolderToUpload: 135393651,
                    file: new FileUpload_1.default(new File([''], 'filename', { type: 'text/html' }), FileUpload_1.StateUpload.TO_UPLOAD),
                    disabledCategories: false,
                    canUpload: true,
                    triggerUploadAllFiles: false
                }, (0, storeMock_1.createFolderStoreMocked)({
                    hasPermissionToAddFolder: true
                }));
                wrapper.vm.displayFolderCreation = false;
                await wrapper.vm.$nextTick();
                const DocumentsFoldersCreationWrapper = wrapper.findComponent(DocumentsFoldersCreation_vue_1.default);
                expect(DocumentsFoldersCreationWrapper.exists()).toBeFalsy();
            });
        });
        describe('add folder small breadcrumb icon', () => {
            it('Should be visible when folderHasChildrens and canAddFolder are true', () => {
                wrapper = createWrapper({
                    selectedFolderToUpload: 135393635,
                    file: new FileUpload_1.default(new File([''], 'filename', { type: 'text/html' }), FileUpload_1.StateUpload.TO_UPLOAD),
                    disabledCategories: false,
                    canUpload: true,
                    triggerUploadAllFiles: false
                }, (0, storeMock_1.createFolderStoreMocked)({
                    hasPermissionToAddFolder: true
                }));
                const AddFolderIcon = wrapper.find('.add-folder-icon');
                expect(AddFolderIcon.exists()).toBeTruthy();
            });
            it('Should not be visible when folderHasChildrens is false', () => {
                wrapper = createWrapper({
                    selectedFolderToUpload: 136432102,
                    file: new FileUpload_1.default(new File([''], 'filename', { type: 'text/html' }), FileUpload_1.StateUpload.TO_UPLOAD),
                    disabledCategories: false,
                    canUpload: true,
                    triggerUploadAllFiles: false
                }, (0, storeMock_1.createFolderStoreMocked)({
                    hasPermissionToAddFolder: true
                }));
                const AddFolderIcon = wrapper.find('.add-folder-icon');
                expect(AddFolderIcon.exists()).toBeFalsy();
            });
            it('Should not be visible when canAddFolder is false', () => {
                wrapper = createWrapper({
                    selectedFolderToUpload: 1122,
                    file: new FileUpload_1.default(new File([''], 'filename', { type: 'text/html' }), FileUpload_1.StateUpload.TO_UPLOAD),
                    disabledCategories: false,
                    canUpload: true,
                    triggerUploadAllFiles: false
                }, (0, storeMock_1.createFolderStoreMocked)({
                    hasPermissionToAddFolder: false
                }));
                const AddFolderIcon = wrapper.find('.add-folder-icon');
                // expect(AddFolderIcon.exists()).toBeFalsy()
            });
        });
        it.each([
            {
                state: FileUpload_1.StateUpload.ERROR,
                libelle: 'errored',
                description: 'awesome error!'
            },
            {
                state: FileUpload_1.StateUpload.CANCELED,
                libelle: 'canceled',
                description: 'awesome cancelation!'
            }
        ])('should display libelle when selected file contains an error or canceled or file type not supported ', ({ libelle, state, description }) => {
            const fileError = new FileUpload_1.default(new File([''], 'filename', { type: 'text/html' }), state);
            fileError.errorDescription = {
                libelle,
                description
            };
            defaultProps.file = fileError;
            wrapper = createWrapper({
                selectedFolderToUpload: 1122,
                file: fileError,
                disabledCategories: false,
                canUpload: true,
                triggerUploadAllFiles: false
            });
            const labelWrapper = wrapper.find('.error-libelle');
            const descriptionWrapper = wrapper.find('.error-descriptif');
            expect(labelWrapper.text()).toBe(libelle);
            expect(descriptionWrapper.text()).toBe(description);
        });
        it('Should display small add folder icon when the folder has chidrens', () => {
            expect(wrapper.find('.add-folder-icon')).toBeTruthy();
        });
    });
    describe('events', () => {
        describe('DocumentsFoldersCreation', () => {
            it('Should display create folder form on cta click', () => {
                wrapper = createWrapper({
                    selectedFolderToUpload: 136432102,
                    file: new FileUpload_1.default(new File([''], 'filename', { type: 'text/html' }), FileUpload_1.StateUpload.TO_UPLOAD),
                    disabledCategories: false,
                    canUpload: true,
                    triggerUploadAllFiles: false
                }, (0, storeMock_1.createFolderStoreMocked)({
                    hasPermissionToAddFolder: true
                }));
                const DocumentsFoldersCreationWrapper = wrapper.findComponent(DocumentsFoldersCreation_vue_1.default);
                const query = {
                    targetFolder: 1,
                    folderName: 'aaaa',
                    accountNumber: '1234'
                };
                DocumentsFoldersCreationWrapper.vm.$emit('on-folder-creation-cta-click', query);
                expect(analyticsLog_1.trackEventFactory).toBeCalledWith('updm-select-destination-file-add-folder-cta');
                expect(DocumentsFoldersCreationWrapper.findComponent(NattoCreateFolderForm_vue_1.default)).toBeTruthy();
            });
            it('Should display create folder cta on cancel click', async () => {
                wrapper = createWrapper({
                    selectedFolderToUpload: 136432102,
                    file: new FileUpload_1.default(new File([''], 'filename', { type: 'text/html' }), FileUpload_1.StateUpload.TO_UPLOAD),
                    disabledCategories: false,
                    canUpload: true,
                    triggerUploadAllFiles: false
                }, (0, storeMock_1.createFolderStoreMocked)({
                    hasPermissionToAddFolder: true
                }));
                const DocumentsFoldersCreationWrapper = wrapper.findComponent(DocumentsFoldersCreation_vue_1.default);
                await DocumentsFoldersCreationWrapper.vm.$emit('on-cancel-create-folder');
                expect(wrapper.find('.create-folder-button')).toBeTruthy();
            });
            it('Should dispatch CreateFolder event when on-create-folder is triggered', async () => {
                storeMock = (0, storeMock_1.createFolderStoreMocked)({ hasPermissionToAddFolder: true });
                storeMock.dispatch = jest.fn();
                wrapper = createWrapper({
                    selectedFolderToUpload: 136432102,
                    file: new FileUpload_1.default(new File([''], 'filename', { type: 'text/html' }), FileUpload_1.StateUpload.TO_UPLOAD),
                    disabledCategories: false,
                    canUpload: true,
                    triggerUploadAllFiles: false
                }, storeMock);
                const DocumentsFoldersCreationWrapper = wrapper.findComponent(DocumentsFoldersCreation_vue_1.default);
                const query = {
                    targetFolder: 1,
                    folderName: 'aaaa',
                    accountNumber: '1234'
                };
                await DocumentsFoldersCreationWrapper.vm.$emit('on-create-folder', query);
                expect(analyticsLog_1.trackEventFactory).toBeCalledWith('updm-select-destination-file-create-folder');
                expect(storeMock.dispatch).toHaveBeenCalledWith((0, store_1.createFolderModule)('CreateFolder'), query);
            });
            it('Should not dispatch CreateFolder event when on-create-folder is triggered when folder exists', async () => {
                storeMock = (0, storeMock_1.createFolderStoreMocked)({
                    hasPermissionToAddFolder: true
                });
                storeMock.dispatch = jest.fn();
                storeMock.state.GED.Search.folders = Folders_1.default.loaded([
                    {
                        id: 1233,
                        name: 'A classer',
                        parent: { id: 0 },
                        children: [],
                        properties: {},
                        permissions: []
                    }
                ]);
                wrapper = createWrapper({
                    selectedFolderToUpload: 1233,
                    file: new FileUpload_1.default(new File([''], 'filename', { type: 'text/html' }), FileUpload_1.StateUpload.TO_UPLOAD),
                    disabledCategories: false,
                    canUpload: true,
                    triggerUploadAllFiles: false
                }, storeMock);
                const DocumentsFoldersCreationWrapper = wrapper.findComponent(DocumentsFoldersCreation_vue_1.default);
                const query = {
                    targetFolder: 1,
                    folderName: 'A classer',
                    accountNumber: '1234'
                };
                await DocumentsFoldersCreationWrapper.vm.$emit('on-create-folder', query);
                expect(analyticsLog_1.trackEventFactory).toBeCalledWith('updm-select-destination-file-create-folder');
                expect(storeMock.dispatch).toBeCalledTimes(1);
                expect(storeMock.dispatch).toHaveBeenCalledWith((0, store_1.createFolderModule)('CreateFolder'), query);
            });
            it('Should display small add folder icon when the folder has chidrens and not disabledCategories', () => {
                expect(wrapper.find('.add-folder-icon')).toBeTruthy();
            });
            it('Should not rendering small add folder icon when disabledCategories is true', () => {
                wrapper = createWrapper({
                    selectedFolderToUpload: 136432102,
                    file: new FileUpload_1.default(new File([''], 'filename', { type: 'text/html' }), FileUpload_1.StateUpload.TO_UPLOAD),
                    disabledCategories: true,
                    canUpload: true,
                    triggerUploadAllFiles: false
                }, (0, storeMock_1.createFolderStoreMocked)({
                    hasPermissionToAddFolder: true
                }));
                expect(wrapper.find('.add-folder-icon').exists()).toBeFalsy();
            });
            it('Should not rendering small add folder icon when the folder has no child', () => {
                wrapper = createWrapper({
                    selectedFolderToUpload: 136432102,
                    file: new FileUpload_1.default(new File([''], 'filename', { type: 'text/html' }), FileUpload_1.StateUpload.TO_UPLOAD),
                    disabledCategories: false,
                    canUpload: true,
                    triggerUploadAllFiles: false
                }, (0, storeMock_1.createFolderStoreMocked)({
                    hasPermissionToAddFolder: true
                }));
                expect(wrapper.find('.add-folder-icon').exists()).toBeFalsy();
            });
            it('Should not rendering DocumentsFoldersCreation when disabledCategories is true', () => {
                wrapper = createWrapper({
                    selectedFolderToUpload: 136432102,
                    file: new FileUpload_1.default(new File([''], 'filename', { type: 'text/html' }), FileUpload_1.StateUpload.TO_UPLOAD),
                    disabledCategories: true,
                    canUpload: true,
                    triggerUploadAllFiles: false
                }, (0, storeMock_1.createFolderStoreMocked)({
                    hasPermissionToAddFolder: true
                }));
                expect(wrapper.findComponent(DocumentsFoldersCreation_vue_1.default).exists()).toBeFalsy();
            });
            it('Should not rendering UploadDocumentNavigator when disabledCategories is true', () => {
                wrapper = createWrapper({
                    selectedFolderToUpload: 136432102,
                    file: new FileUpload_1.default(new File([''], 'filename', { type: 'text/html' }), FileUpload_1.StateUpload.TO_UPLOAD),
                    disabledCategories: true,
                    canUpload: true,
                    triggerUploadAllFiles: false
                }, (0, storeMock_1.createFolderStoreMocked)({
                    hasPermissionToAddFolder: true
                }));
                expect(wrapper.findComponent(UploadDocumentNavigator_vue_1.default).exists()).toBeFalsy();
            });
        });
        it('should emit update:selectedFolderToUpload when UploadBreadcrumb emit update:selectedFolderToUpload', async () => {
            wrapper = createWrapper({
                selectedFolderToUpload: 1122,
                file: new FileUpload_1.default(new File([''], 'filename', { type: 'text/html' }), FileUpload_1.StateUpload.TO_UPLOAD),
                disabledCategories: false,
                canUpload: true,
                triggerUploadAllFiles: false
            });
            // When UploadBreadcrumb emit update:selectedFolderToUpload
            const uploadBreadcrumbWrapper = wrapper.findComponent(UploadBreadcrumb_vue_1.default);
            await uploadBreadcrumbWrapper.vm.$emit('update:selectedFolderToUpload', 99);
            // Then UploadFileInfo should emit update:selectedFolderToUpload
            expect(wrapper.emitted('update:selectedFolderToUpload')).toBeTruthy();
        });
    });
});
//# sourceMappingURL=UploadFileInfo.spec.js.map