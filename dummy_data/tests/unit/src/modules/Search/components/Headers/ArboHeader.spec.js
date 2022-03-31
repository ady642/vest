"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const FoldersDataMock_1 = require("dummy_data/tests/unit/src/modules/Search/mocks/FoldersDataMock");
const useElementStubs_1 = require("dummy_data/tests/unit/utils/useElementStubs");
const NattoBreadcrumb_vue_1 = require("@/Common/components/Breadcrumb/NattoBreadcrumb.vue");
const ArboHeader_vue_1 = require("@/modules/Search/components/Headers/ArboHeader.vue");
const DocumentsUploadBtn_vue_1 = require("@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Activators/DocumentsUploadBtn.vue");
const storeMock_1 = require("tests/unit/__mocks__/storeMock");
const DocumentsCreateFolderButton_vue_1 = require("@/modules/Search/components/Buttons/DocumentsCreateFolderButton.vue");
const CreateFolderModal_vue_1 = require("@/modules/Search/components/Modals/CreateFolderModal.vue");
const NattoHeader_vue_1 = require("@/Common/components/Header/NattoHeader.vue");
const useStyleguideStubs_1 = require("dummy_data/tests/unit/utils/useStyleguideStubs");
const ChevronLeftIcon_vue_1 = require("@/Common/components/Icons/ChevronLeftIcon.vue");
const { ElBreadcrumbItem, ElBreadcrumb, ElDialog } = (0, useElementStubs_1.default)();
const { FoldersData } = (0, FoldersDataMock_1.default)();
const { MpTitle } = (0, useStyleguideStubs_1.default)();
const createWrapper = ({ folders, disabledUpload, searchFolderId }, store = (0, storeMock_1.createFolderStoreMocked)({
    hasPermissionToAddFolder: false
})) => (0, wrapperFactory_1.default)(ArboHeader_vue_1.default, {
    global: {
        stubs: {
            NattoBreadcrumb: NattoBreadcrumb_vue_1.default,
            DocumentsUploadBtn: DocumentsUploadBtn_vue_1.default,
            ElBreadcrumbItem,
            ElBreadcrumb,
            DocumentsCreateFolderButton: DocumentsCreateFolderButton_vue_1.default,
            CreateFolderModal: CreateFolderModal_vue_1.default,
            ElDialog,
            NattoHeader: NattoHeader_vue_1.default,
            MpTitle
        },
        mocks: {
            $tc: (key, params) => params ? `${key} with ${JSON.stringify(params)}` : key
        },
        plugins: [store]
    },
    props: {
        folders,
        disabledUpload,
        searchFolderId
    }
});
let wrapper = createWrapper({
    folders: FoldersData,
    disabledUpload: true,
    searchFolderId: 1122,
    canUploadFiles: true,
    hasAccessDs: true,
    isMainViewBtn: true
});
const findCreateFolderModal = (wrapper) => wrapper.findComponent(CreateFolderModal_vue_1.default);
let createFolderModalWrapper = findCreateFolderModal(wrapper);
describe('ArboHeader', () => {
    beforeEach(() => {
        wrapper = createWrapper({
            folders: FoldersData,
            disabledUpload: true,
            searchFolderId: 1122,
            canUploadFiles: true,
            hasAccessDs: true,
            isMainViewBtn: true
        });
    });
    describe('bindings with CreateFolderModal', () => {
        it('props', () => {
            createFolderModalWrapper = findCreateFolderModal(wrapper);
            expect(createFolderModalWrapper.props('selectedFolderId')).toBe(1122);
            expect(createFolderModalWrapper.props('modelValue')).toBe(false);
        });
    });
    describe('bindings', () => {
        describe('props', () => {
            describe('natto-breadcrumb', () => {
                it('should pass breadcrumbs props', () => {
                    const nattoBreadcrumWrapper = wrapper.findComponent(NattoBreadcrumb_vue_1.default);
                    expect(nattoBreadcrumWrapper.props('breadcrumbs')).toStrictEqual([
                        {
                            id: 1122,
                            text: 'A classer'
                        }
                    ]);
                });
            });
            describe('documents-upload-btn', () => {
                it('should pass disabled props', () => {
                    const documentsUploadBtnWrapper = wrapper.findComponent(DocumentsUploadBtn_vue_1.default);
                    expect(documentsUploadBtnWrapper.props('disabled')).toBe(true);
                });
                it('should pass canUploadFiles props', () => {
                    const documentsUploadBtnWrapper = wrapper.findComponent(DocumentsUploadBtn_vue_1.default);
                    expect(documentsUploadBtnWrapper.props('canUploadFiles')).toBe(wrapper.props('canUploadFiles'));
                });
                it('should pass hasAccessDs props', () => {
                    const documentsUploadBtnWrapper = wrapper.findComponent(DocumentsUploadBtn_vue_1.default);
                    expect(documentsUploadBtnWrapper.props('hasAccessDs')).toBe(wrapper.props('hasAccessDs'));
                });
                it('should pass isMainViewBtn props', () => {
                    const documentsUploadBtnWrapper = wrapper.findComponent(DocumentsUploadBtn_vue_1.default);
                    expect(documentsUploadBtnWrapper.props('isMainViewBtn')).toBe(wrapper.props('isMainViewBtn'));
                });
            });
            describe('documents-create-folder-button', () => {
                it('should pass !canAddFolder computed', () => {
                    const DocCreateFolderBtnWrapper = wrapper.findComponent(DocumentsCreateFolderButton_vue_1.default);
                    expect(DocCreateFolderBtnWrapper.props('disabled')).toBeTruthy();
                });
            });
        });
        describe('events', () => {
            it('Should fire back-click event when click header-back-icon icon', async () => {
                const iWrapper = wrapper.findComponent(ChevronLeftIcon_vue_1.default);
                await iWrapper.vm.$emit('click');
                expect(wrapper.emitted()['back-click']).toBeTruthy();
                expect(wrapper.emitted()['back-click']).toHaveLength(1);
                expect(wrapper.emitted()['back-click'][0]).toStrictEqual([]);
            });
            describe('documents-upload-btn', () => {
                it('Should emit breadcrumb-click when breadcrumb-click fired', () => {
                    const breadcrumbWrapper = wrapper.findComponent(NattoBreadcrumb_vue_1.default);
                    breadcrumbWrapper.vm.$emit('breadcrumb-click', 1);
                    expect(wrapper.emitted()['update:searchFolderId']).toBeTruthy();
                    expect(wrapper.emitted()['update:searchFolderId']).toHaveLength(1);
                    expect(wrapper.emitted()['update:searchFolderId'][0]).toStrictEqual([
                        1
                    ]);
                });
                it('Should emit upload-triggered when on-files-change fired', () => {
                    const uploadbWrapper = wrapper.findComponent(DocumentsUploadBtn_vue_1.default);
                    const content = 'mock content';
                    const data = new Blob([content], { type: 'application/zip' });
                    const arrayOfBlob = new Array();
                    arrayOfBlob.push(data);
                    const mockZip = new File(arrayOfBlob, 'Mock.zip');
                    const mockZip2 = new File(arrayOfBlob, 'Mock2.zip');
                    const files = new Array();
                    files.push(mockZip);
                    files.push(mockZip2);
                    uploadbWrapper.vm.$emit('on-files-change', files);
                    expect(wrapper.emitted()['upload-triggered']).toBeTruthy();
                    expect(wrapper.emitted()['upload-triggered']).toHaveLength(1);
                    expect(wrapper.emitted()['upload-triggered'][0]).toStrictEqual([
                        files
                    ]);
                });
                it('Should not open modal when DocumentsCreateFolderButton emit click and not canAddFolder', async () => {
                    const DocCreateFolderBtnWrapper = wrapper.findComponent(DocumentsCreateFolderButton_vue_1.default);
                    const ModalWrapper = wrapper.findComponent(CreateFolderModal_vue_1.default);
                    await DocCreateFolderBtnWrapper.vm.$emit('click');
                    expect(ModalWrapper.props().modelValue).toBe(false);
                });
            });
        });
    });
    describe('rendering', () => {
        it('Should display last item send breadcrumbs props', () => {
            const nattoHeaderWrapper = wrapper.findComponent(NattoHeader_vue_1.default);
            expect(nattoHeaderWrapper.attributes('title')).toBe('A classer');
        });
    });
});
//# sourceMappingURL=ArboHeader.spec.js.map