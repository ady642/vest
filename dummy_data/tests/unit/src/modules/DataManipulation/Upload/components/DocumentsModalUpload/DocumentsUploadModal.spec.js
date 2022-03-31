"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
port;
DocumentsUploadModal;
from;
'@/modules/DataManipulation/Upload/components/DocumentsUploadModal/DocumentsUploadModal.vue';
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const test_utils_1 = require("@vue/test-utils");
const FileUpload_1 = require("@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload");
const NattoUploadModal_vue_1 = require("@/Common/components/Modals/NattoUploadModal.vue");
const vuex_1 = require("vuex");
const store_1 = require("@/modules/DataManipulation/Upload/store");
const store_2 = require("@/modules/DataManipulation/store");
const store_3 = require("@/modules/Search/store");
const FoldersDataMock_1 = require("dummy_data/tests/unit/src/modules/Search/mocks/FoldersDataMock");
const analyticsLog_1 = require("@/Common/helpers/analyticsLog");
jest.mock('@/Common/helpers/analyticsLog', () => ({
    trackEventFactory: jest.fn(),
    pageViewFactory: jest.fn()
}));
const files = [
    new FileUpload_1.default(new File([''], 'file0.txt', { type: 'text/html' }), FileUpload_1.StateUpload.UPLOADING),
    new FileUpload_1.default(new File([''], 'file1.txt', { type: 'text/html' }), FileUpload_1.StateUpload.TO_UPLOAD),
    new FileUpload_1.default(new File([''], 'file2.txt', { type: 'text/html' }), FileUpload_1.StateUpload.TO_UPLOAD),
    new FileUpload_1.default(new File([''], 'file3.txt', { type: 'text/html' }), FileUpload_1.StateUpload.TO_UPLOAD)
];
files[1].destination = 200;
const storeMock = (0, vuex_1.createStore)({
    modules: {
        GED: {
            namespaced: true,
            modules: {
                Search: store_3.default,
                DataManipulation: {
                    ...store_2.default,
                    modules: {
                        Upload: {
                            ...store_1.default,
                            actions: {
                                ...store_1.default.actions,
                                uploadDocument: jest.fn()
                            }
                        }
                    }
                }
            }
        }
    }
});
storeMock.state.GED.DataManipulation.Upload.selectedFolderToUpload = 4521;
storeMock.state.GED.DataManipulation.Upload.files = files;
storeMock.state.GED.Search.folders = (0, FoldersDataMock_1.default)().FoldersData;
storeMock.state.GED.Search.filters.folderId = 4521;
const createWrapper = (disabledCategories) => (0, wrapperFactory_1.default)(DocumentsUploadModal, {
    props: {
        modelValue: false,
        disabledCategories
    },
    global: {
        stubs: {
            NattoUploadModal: NattoUploadModal_vue_1.default
        },
        plugins: [storeMock]
    }
});
let wrapper = createWrapper(false);
const findNattoUploadModal = (wrapper) => wrapper.findComponent(NattoUploadModal_vue_1.default);
let nattoUploadModalWrapper = findNattoUploadModal(wrapper);
describe('documents-upload-modal', () => {
    beforeEach(() => {
        storeMock.state.GED.DataManipulation.Upload.files = files;
        wrapper = createWrapper(false);
        nattoUploadModalWrapper = findNattoUploadModal(wrapper);
        storeMock.dispatch = jest.fn();
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('binding', () => {
        describe('watch', () => {
            it('When isDocumentUploadModalOpened changed should trace log if new value true', async () => {
                await wrapper.setProps({ modelValue: true });
                await wrapper.vm.$nextTick();
                expect(analyticsLog_1.trackEventFactory).toHaveBeenNthCalledWith(1, 'updm-select-destination-file-upload', 4);
                expect(analyticsLog_1.trackEventFactory).toHaveBeenNthCalledWith(2, 'updm-select-destination-file-format', 'txt');
                expect(analyticsLog_1.trackEventFactory).toHaveBeenNthCalledWith(3, 'updm-select-destination-file-format', 'txt');
            });
        });
        describe('props', () => {
            it('Should bind files value with child component', () => {
                const NattoUploadModalWrapper = wrapper.findComponent(NattoUploadModal_vue_1.default);
                expect(NattoUploadModalWrapper.props('files')).toHaveLength(wrapper.vm.files.length);
                expect(NattoUploadModalWrapper.props('files')).toStrictEqual(wrapper.vm.files);
            });
            it('Should init selectedFolderToUpload value with searchFolderId', async () => {
                const NattoUploadModalWrapper = wrapper.findComponent(NattoUploadModal_vue_1.default);
                expect(NattoUploadModalWrapper.props('selectedFolderToUpload')).toEqual(4521);
            });
            it('primaryCtaAction Should be validateNext when there is some files ready and selected file is not last item', () => {
                const NattoUploadModalWrapper = wrapper.findComponent(NattoUploadModal_vue_1.default);
                expect(NattoUploadModalWrapper.props('primaryCtaAction')).toEqual('validateNext');
            });
            it('primaryCtaAction Should be validate when there is some files ready and selected file is last item', () => {
                storeMock.state.GED.DataManipulation.Upload.files = [
                    new FileUpload_1.default(new File([''], 'file1.txt', { type: 'text/html' }), FileUpload_1.StateUpload.TO_UPLOAD)
                ];
                const wrapper = createWrapper(false);
                const NattoUploadModalWrapper = wrapper.findComponent(NattoUploadModal_vue_1.default);
                expect(NattoUploadModalWrapper.props('primaryCtaAction')).toEqual('validate');
            });
            it('primaryCtaAction Should be finish when all files are not ready', () => {
                storeMock.state.GED.DataManipulation.Upload.files = [
                    new FileUpload_1.default(new File([''], 'file1.txt', { type: 'text/html' }), FileUpload_1.StateUpload.UPLOADED),
                    new FileUpload_1.default(new File([''], 'file2.txt', { type: 'text/html' }), FileUpload_1.StateUpload.ERROR),
                    new FileUpload_1.default(new File([''], 'file3.txt', { type: 'text/html' }), FileUpload_1.StateUpload.UPLOADING)
                ];
                const wrapper = createWrapper(false);
                const NattoUploadModalWrapper = wrapper.findComponent(NattoUploadModal_vue_1.default);
                expect(NattoUploadModalWrapper.props('primaryCtaAction')).toEqual('finish');
            });
            it('Should bind disabledCategories value with child component', () => {
                const NattoUploadModalWrapper = wrapper.findComponent(NattoUploadModal_vue_1.default);
                expect(NattoUploadModalWrapper.props('disabledCategories')).toEqual(wrapper.vm.disabledCategories);
            });
            describe('events', () => {
                it('Should dispatch setSelectedFolderToUpload when change-selected-folderId is emitted', async () => {
                    await nattoUploadModalWrapper.vm.$emit('change-selected-folderId', 27);
                    expect(storeMock.dispatch).toHaveBeenCalledWith('GED/DataManipulation/Upload/setSelectedFolderToUpload', 27);
                });
                it('Should dispatch setSelectedFolderToUpload when searchFolderId changes', async () => {
                    storeMock.state.GED.Search.filters.folderId = 27;
                    await wrapper.vm.$nextTick();
                    expect(storeMock.dispatch).toHaveBeenCalledWith('GED/DataManipulation/Upload/setSelectedFolderToUpload', 27);
                });
                it('Should dispatch setFileDestination action when validate event is emitted', async () => {
                    const NattoUploadModalWrapper = wrapper.findComponent(NattoUploadModal_vue_1.default);
                    await NattoUploadModalWrapper.vm.$emit('validate');
                    expect(storeMock.dispatch).toHaveBeenCalledWith('GED/DataManipulation/Upload/setFileDestination', { index: 0, destinationId: 4521 });
                });
                it('Should emit reset event when on-modal-close event is emitted', async () => {
                    const NattoUploadModalWrapper = wrapper.findComponent(NattoUploadModal_vue_1.default);
                    await NattoUploadModalWrapper.vm.$emit('on-modal-close');
                    expect(wrapper.emitted('reset')).toBeTruthy();
                });
                it('Should dispatch setFileState action when secondary-click event is emitted', async () => {
                    const NattoUploadModalWrapper = wrapper.findComponent(NattoUploadModal_vue_1.default);
                    await NattoUploadModalWrapper.vm.$emit('secondary-click');
                    // Should not send index 0 because status is uploading
                    expect(storeMock.dispatch).toHaveBeenNthCalledWith(1, 'GED/DataManipulation/Upload/setFileDestination', { destinationId: 4521, index: 1 });
                    expect(storeMock.dispatch).toHaveBeenNthCalledWith(2, 'GED/DataManipulation/Upload/setFileState', { error: undefined, fileState: 1, index: 1 });
                    expect(storeMock.dispatch).toHaveBeenNthCalledWith(3, 'GED/DataManipulation/Upload/setFileDestination', { destinationId: 4521, index: 2 });
                    expect(storeMock.dispatch).toHaveBeenNthCalledWith(4, 'GED/DataManipulation/Upload/setFileState', { error: undefined, fileState: 1, index: 2 });
                    expect(storeMock.dispatch).toHaveBeenNthCalledWith(5, 'GED/DataManipulation/Upload/setFileDestination', { destinationId: 4521, index: 3 });
                    expect(storeMock.dispatch).toHaveBeenNthCalledWith(6, 'GED/DataManipulation/Upload/setFileState', { error: undefined, fileState: 1, index: 3 });
                    expect(storeMock.dispatch).toHaveBeenNthCalledWith(7, 'GED/DataManipulation/Upload/uploadDocuments', [1, 2, 3]);
                    await (0, test_utils_1.flushPromises)();
                    expect(storeMock.dispatch).toHaveBeenNthCalledWith(8, 'GED/Search/fetchDocuments');
                });
            });
        });
    });
});
//# sourceMappingURL=DocumentsUploadModal.spec.js.map