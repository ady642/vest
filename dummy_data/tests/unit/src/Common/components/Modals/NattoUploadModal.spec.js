"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NattoUploadModal_vue_1 = require("@/Common/components/Modals/NattoUploadModal.vue");
const NattoDialog_vue_1 = require("@/Common/components/Modals/NattoDialog.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const ModalTwoColumns_vue_1 = require("@/Common/components/Modals/ModalTwoColumns.vue");
const DocumentPrimaryCta_vue_1 = require("@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Content/Buttons/DocumentPrimaryCta.vue");
const SecondaryCtaButton_vue_1 = require("@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Content/Buttons/SecondaryCtaButton.vue");
const UploadFileList_vue_1 = require("@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Content/UploadFileList.vue");
const FileUpload_1 = require("@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload");
const UploadFileInfos_vue_1 = require("@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Content/UploadFileInfos.vue");
const FileUpload_2 = require("@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload");
const useElementStubs_1 = require("dummy_data/tests/unit/utils/useElementStubs");
const FoldersDataMock_1 = require("dummy_data/tests/unit/src/modules/Search/mocks/FoldersDataMock");
const constants_1 = require("@/Common/constants");
const createStoreMock_1 = require("dummy_data/tests/unit/__mocks__/storeMock/createStoreMock");
const { ElDialog } = (0, useElementStubs_1.default)();
const foldersData = (0, FoldersDataMock_1.default)().FoldersData;
const filesMock = [
    new FileUpload_1.default(new File([''], 'file1.txt', { type: 'text/html' }), FileUpload_2.StateUpload.TO_UPLOAD),
    new FileUpload_1.default(new File([''], 'file2.txt', { type: 'text/html' }), FileUpload_2.StateUpload.TO_UPLOAD),
    new FileUpload_1.default(new File([''], 'file3.txt', { type: 'text/html' }), FileUpload_2.StateUpload.TO_UPLOAD)
];
const defaultProps = {
    selectedFileIndex: 1,
    primaryCtaAction: 'validateNext',
    secondaryCtaFolderName: 'Achats',
    files: filesMock,
    modelValue: true,
    selectedFolderToUpload: 1234,
    disabledCategories: false,
    triggerUploadAllFiles: false
};
const createWrapper = (props = defaultProps, store = (0, createStoreMock_1.createFileStoreMock)()) => (0, wrapperFactory_1.default)(NattoUploadModal_vue_1.default, {
    props: {
        ...defaultProps,
        ...props
    },
    global: {
        stubs: {
            ModalTwoColumns: ModalTwoColumns_vue_1.default,
            NattoDialog: NattoDialog_vue_1.default,
            ElDialog
        },
        plugins: [store]
    }
});
let wrapper = createWrapper();
describe('natto-upload-modal', () => {
    beforeEach(() => {
        wrapper = createWrapper();
    });
    describe('binding', () => {
        describe('props', () => {
            describe('modal-two-columns', () => {
                it('should pass modelValue props', () => {
                    const ModalTwoColumnsWrapper = wrapper.findComponent(ModalTwoColumns_vue_1.default);
                    expect(ModalTwoColumnsWrapper.props('modelValue')).toBe(true);
                });
            });
            describe('upload-file-list', () => {
                it('shoud pass files props', () => {
                    const uploadFileListWrapper = wrapper.findComponent(UploadFileList_vue_1.default);
                    expect(uploadFileListWrapper.props('files')).toStrictEqual(filesMock);
                });
                it('shoud pass selectedFileIndex props', () => {
                    const uploadFileListWrapper = wrapper.findComponent(UploadFileList_vue_1.default);
                    expect(uploadFileListWrapper.props('selectedFileIndex')).toBe(1);
                });
            });
            describe('upload-file-infos', () => {
                it('should pass selectedFolderToUpload props', () => {
                    const uploadFileinfosWrapper = wrapper.findComponent(UploadFileInfos_vue_1.default);
                    expect(uploadFileinfosWrapper.props('selectedFolderToUpload')).toBe(1234);
                });
                it('should pass disabledCategories props', () => {
                    const uploadFileinfosWrapper = wrapper.findComponent(UploadFileInfos_vue_1.default);
                    expect(uploadFileinfosWrapper.props('disabledCategories')).toBe(false);
                });
                it('should pass file props', () => {
                    const uploadFileinfosWrapper = wrapper.findComponent(UploadFileInfos_vue_1.default);
                    expect(uploadFileinfosWrapper.props('file')).toStrictEqual(filesMock[1]);
                });
                describe('events', () => {
                    it('should emit update:selectedFolderToUpload when UpdateFileInfos emits update:selectedFolderToUpload', async () => {
                        const uploadFileInfosWrapper = wrapper.findComponent(UploadFileInfos_vue_1.default);
                        await uploadFileInfosWrapper.vm.$emit('update:selectedFolderToUpload', 27);
                        expect(wrapper.emitted('change-selected-folderId')).toBeTruthy();
                        expect(wrapper.emitted('change-selected-folderId')).toStrictEqual([
                            [27]
                        ]);
                    });
                });
            });
            describe('secondary-cta-button', () => {
                it('should pass folderName props', () => {
                    const secondaryCtaButtonWrapper = wrapper.findComponent(SecondaryCtaButton_vue_1.default);
                    expect(secondaryCtaButtonWrapper.props('folderName')).toBe('Achats');
                });
                it('should pass vshow props', () => {
                    wrapper = createWrapper({
                        secondaryCtaFolderName: ''
                    });
                    const secondaryCtaButtonWrapper = wrapper.findComponent(SecondaryCtaButton_vue_1.default);
                    expect(secondaryCtaButtonWrapper.element.style.display).toBe('none');
                });
            });
            describe('document-primary-cta', () => {
                it('should pass disabled props', () => {
                    wrapper = createWrapper({}, (0, createStoreMock_1.createFileStoreMock)({ hasPermissionToUploadFile: false }));
                    const documentPrimaryCtaWrapper = wrapper.findComponent(DocumentPrimaryCta_vue_1.default);
                    expect(documentPrimaryCtaWrapper.props('disabled')).toBe(true);
                });
                it('should pass action props', () => {
                    const documentPrimaryCtaWrapper = wrapper.findComponent(DocumentPrimaryCta_vue_1.default);
                    expect(documentPrimaryCtaWrapper.props('action')).toBe('validateNext');
                });
                it('Should be disabled when selected file upload is UPLOADING and cta action validateNext', () => {
                    const filesMock = [
                        new FileUpload_1.default(new File([''], 'file1.txt', { type: 'text/html' }), FileUpload_2.StateUpload.TO_UPLOAD),
                        new FileUpload_1.default(new File([''], 'file2.txt', { type: 'text/html' }), FileUpload_2.StateUpload.UPLOADING),
                        new FileUpload_1.default(new File([''], 'file3.txt', { type: 'text/html' }), FileUpload_2.StateUpload.UPLOADING)
                    ];
                    const wrapper = createWrapper({
                        files: filesMock,
                        selectedFolderToUpload: 123
                    });
                    const documentPrimaryCtaWrapper = wrapper.findComponent(DocumentPrimaryCta_vue_1.default);
                    expect(documentPrimaryCtaWrapper.props('disabled')).toBe(true);
                });
                it('Should be disabled when selected file upload is UPLOADED and cta action validateNext', () => {
                    const filesMock = [
                        new FileUpload_1.default(new File([''], 'file1.txt', { type: 'text/html' }), FileUpload_2.StateUpload.TO_UPLOAD),
                        new FileUpload_1.default(new File([''], 'file2.txt', { type: 'text/html' }), FileUpload_2.StateUpload.UPLOADED),
                        new FileUpload_1.default(new File([''], 'file3.txt', { type: 'text/html' }), FileUpload_2.StateUpload.UPLOADING)
                    ];
                    const wrapper = createWrapper({
                        files: filesMock
                    });
                    const documentPrimaryCtaWrapper = wrapper.findComponent(DocumentPrimaryCta_vue_1.default);
                    expect(documentPrimaryCtaWrapper.props('disabled')).toBe(true);
                });
                it('Should be disabled when selected file upload is ERROR and cta action validateNext', () => {
                    const filesMock = [
                        new FileUpload_1.default(new File([''], 'file1.txt', { type: 'text/html' }), FileUpload_2.StateUpload.TO_UPLOAD),
                        new FileUpload_1.default(new File([''], 'file2.txt', { type: 'text/html' }), FileUpload_2.StateUpload.ERROR),
                        new FileUpload_1.default(new File([''], 'file3.txt', { type: 'text/html' }), FileUpload_2.StateUpload.UPLOADING)
                    ];
                    const wrapper = createWrapper({
                        files: filesMock
                    });
                    const documentPrimaryCtaWrapper = wrapper.findComponent(DocumentPrimaryCta_vue_1.default);
                    expect(documentPrimaryCtaWrapper.props('disabled')).toBe(true);
                });
                it('Should be disabled when selected file upload is PENDING and cta action validateNext', () => {
                    const filesMock = [
                        new FileUpload_1.default(new File([''], 'file1.txt', { type: 'text/html' }), FileUpload_2.StateUpload.TO_UPLOAD),
                        new FileUpload_1.default(new File([''], 'file2.txt', { type: 'text/html' }), FileUpload_2.StateUpload.PENDING),
                        new FileUpload_1.default(new File([''], 'file3.txt', { type: 'text/html' }), FileUpload_2.StateUpload.UPLOADING)
                    ];
                    const wrapper = createWrapper({
                        files: filesMock
                    });
                    const documentPrimaryCtaWrapper = wrapper.findComponent(DocumentPrimaryCta_vue_1.default);
                    expect(documentPrimaryCtaWrapper.props('disabled')).toBe(true);
                });
                it('Should be disabled when there is not an upload file permission', () => {
                    const wrapper = createWrapper({}, (0, createStoreMock_1.createFileStoreMock)({ hasPermissionToUploadFile: false }));
                    const documentPrimaryCtaWrapper = wrapper.findComponent(DocumentPrimaryCta_vue_1.default);
                    expect(documentPrimaryCtaWrapper.props('disabled')).toBe(true);
                });
                it('Should not be disabled when there is  an upload file permission', () => {
                    const filesMock = [
                        new FileUpload_1.default(new File([''], 'file1.txt', { type: 'text/html' }), FileUpload_2.StateUpload.TO_UPLOAD),
                        new FileUpload_1.default(new File([''], 'file2.txt', { type: 'text/html' }), FileUpload_2.StateUpload.TO_UPLOAD),
                        new FileUpload_1.default(new File([''], 'file3.txt', { type: 'text/html' }), FileUpload_2.StateUpload.TO_UPLOAD)
                    ];
                    const updatedFolderData = foldersData.collection[0];
                    updatedFolderData.permissions.push(constants_1.default.CAN_UPLOAD_FILES);
                    const wrapper = createWrapper({
                        selectedFolderToUpload: 123,
                        files: filesMock
                    });
                    const documentPrimaryCtaWrapper = wrapper.findComponent(DocumentPrimaryCta_vue_1.default);
                    expect(documentPrimaryCtaWrapper.props('disabled')).toBe(false);
                });
                it('Should not be disabled when selected file upload is TO_UPLOAD and cta action validateNext', () => {
                    const filesMock = [
                        new FileUpload_1.default(new File([''], 'file1.txt', { type: 'text/html' }), FileUpload_2.StateUpload.TO_UPLOAD),
                        new FileUpload_1.default(new File([''], 'file2.txt', { type: 'text/html' }), FileUpload_2.StateUpload.UPLOADING),
                        new FileUpload_1.default(new File([''], 'file3.txt', { type: 'text/html' }), FileUpload_2.StateUpload.UPLOADING)
                    ];
                    foldersData.collection[0].permissions.push(constants_1.default.CAN_UPLOAD_FILES);
                    const wrapper = createWrapper({
                        selectedFileIndex: 0,
                        files: filesMock
                    }, (0, createStoreMock_1.createFileStoreMock)({ hasPermissionToUploadFile: true }));
                    const documentPrimaryCtaWrapper = wrapper.findComponent(DocumentPrimaryCta_vue_1.default);
                    expect(documentPrimaryCtaWrapper.props('disabled')).toBe(false);
                });
                it('Should not be disabled when cta action is finish and all files upload are finish', () => {
                    const filesMock = [
                        new FileUpload_1.default(new File([''], 'file1.txt', { type: 'text/html' }), FileUpload_2.StateUpload.UPLOADED),
                        new FileUpload_1.default(new File([''], 'file2.txt', { type: 'text/html' }), FileUpload_2.StateUpload.UPLOADING),
                        new FileUpload_1.default(new File([''], 'file3.txt', { type: 'text/html' }), FileUpload_2.StateUpload.ERROR)
                    ];
                    const wrapper = createWrapper({
                        primaryCtaAction: 'finish',
                        files: filesMock
                    }, (0, createStoreMock_1.createFileStoreMock)({ hasPermissionToUploadFile: true }));
                    const documentPrimaryCtaWrapper = wrapper.findComponent(DocumentPrimaryCta_vue_1.default);
                    expect(documentPrimaryCtaWrapper.props('disabled')).toBe(false);
                });
            });
        });
        describe('events', () => {
            describe('upload-file-list', () => {
                it('Should trigger display-file when upload-file-list fire display-file event', () => {
                    const uploadFileListWrapper = wrapper.findComponent(UploadFileList_vue_1.default);
                    uploadFileListWrapper.vm.$emit('display-file', 9);
                    expect(wrapper.emitted('display-file')).toBeTruthy();
                    expect(wrapper.emitted('display-file')).toStrictEqual([[9]]);
                });
            });
            it('Should trigger on-modal-close when document-primary-cta fire close event', () => {
                const documentPrimaryCtaWrapper = wrapper.findComponent(DocumentPrimaryCta_vue_1.default);
                documentPrimaryCtaWrapper.vm.$emit('close');
                expect(wrapper.emitted('on-modal-close')).toBeTruthy();
            });
            it('Should trigger validate when document-primary-cta fire validate event', () => {
                const documentPrimaryCtaWrapper = wrapper.findComponent(DocumentPrimaryCta_vue_1.default);
                documentPrimaryCtaWrapper.vm.$emit('validate');
                expect(wrapper.emitted('validate')).toBeTruthy();
            });
        });
    });
});
//# sourceMappingURL=NattoUploadModal.spec.js.map