"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PreviewModalHeader_vue_1 = require("@/modules/Search/components/Modals/PreviewModal/PreviewModalHeader/PreviewModalHeader.vue");
const NattoDialog_vue_1 = require("@/Common/components/Modals/NattoDialog.vue");
const Document_1 = require("@/modules/Search/models/Documents/Inputs/Document");
const PreviewModal_vue_1 = require("@/modules/Search/components/Modals/PreviewModal/PreviewModal.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const test_utils_1 = require("@vue/test-utils");
const storeMock_1 = require("tests/unit/__mocks__/storeMock");
const store_1 = require("@/modules/Search/store");
const store_2 = require("@/modules/DataManipulation/Delete/DeleteFile/store");
const createWrapper = ({ props = defaultProps, store = (0, storeMock_1.createDeleteFileStoreMocked)() } = {}) => (0, wrapperFactory_1.default)(PreviewModal_vue_1.default, {
    props,
    global: {
        plugins: [store],
        renderStubDefaultSlot: true
    }
});
const findPreviewModalHeader = (wrapper) => wrapper.findComponent(PreviewModalHeader_vue_1.default);
const defaultDocument = new Document_1.default();
defaultDocument.id = 'columbo';
const defaultProps = {
    modelValue: true,
    document: defaultDocument
};
let wrapper = createWrapper();
let previewModalHeaderWrapper = findPreviewModalHeader(wrapper);
describe('PreviewModal', () => {
    beforeEach(() => {
        wrapper = createWrapper();
        previewModalHeaderWrapper = findPreviewModalHeader(wrapper);
    });
    describe('bindings with PreviewModalHeader', () => {
        test('props bindings', () => {
            const document = new Document_1.default();
            document.id = 'columbo';
            document.name = 'test';
            document.type = '.pdf';
            const wrapper = createWrapper({
                props: {
                    ...defaultProps,
                    document
                },
                store: (0, storeMock_1.createDeleteFileStoreMocked)({
                    isFileDeleting: true,
                    isFileDeletable: true
                })
            });
            previewModalHeaderWrapper = findPreviewModalHeader(wrapper);
            expect(previewModalHeaderWrapper.props()).toStrictEqual({
                document,
                isDocumentDeleting: true,
                isDocumentDeletable: true
            });
        });
        describe('events', () => {
            it('should close the modal when the cross is clicked', async () => {
                await previewModalHeaderWrapper.vm.$emit('close-click');
                expect(wrapper.emitted('update:modelValue')).toStrictEqual([[false]]);
            });
            it('should dispatch downloadDocument with columbo when PreviewModalHeader emits download', async () => {
                const store = (0, storeMock_1.createDeleteFileStoreMocked)();
                store.dispatch = jest.fn();
                wrapper = createWrapper({
                    store
                });
                previewModalHeaderWrapper = findPreviewModalHeader(wrapper);
                await previewModalHeaderWrapper.vm.$emit('download');
                expect(store.dispatch).toHaveBeenCalledWith((0, store_1.searchModule)('downloadDocument'), 'columbo');
            });
            it('should dispatch deleteFile with columbo, close the modal and fetch the documents when PreviewModalHeader emits delete', async () => {
                const store = (0, storeMock_1.createDeleteFileStoreMocked)({
                    isFileDeletable: true,
                    isFileDeleting: false
                });
                store.dispatch = jest.fn();
                wrapper = createWrapper({
                    store
                });
                previewModalHeaderWrapper = findPreviewModalHeader(wrapper);
                await previewModalHeaderWrapper.vm.$emit('delete');
                await (0, test_utils_1.flushPromises)();
                expect(store.dispatch).toHaveBeenNthCalledWith(1, (0, store_2.deleteFileModule)('deleteFiles'), ['columbo']);
                expect(wrapper.emitted('update:modelValue')).toStrictEqual([[false]]);
                expect(wrapper.emitted('delete')).toHaveLength(1);
                expect(store.dispatch).toHaveBeenNthCalledWith(2, (0, store_1.searchModule)('fetchDocuments'));
            });
            it('should not dispatch deleteFile with columbo, close the modal and fetch the documents when document is not deletable', async () => {
                const store = (0, storeMock_1.createDeleteFileStoreMocked)();
                store.dispatch = jest.fn();
                wrapper = createWrapper({
                    store: (0, storeMock_1.createDeleteFileStoreMocked)({
                        isFileDeleting: false,
                        isFileDeletable: false
                    })
                });
                previewModalHeaderWrapper = findPreviewModalHeader(wrapper);
                await previewModalHeaderWrapper.vm.$emit('delete');
                await (0, test_utils_1.flushPromises)();
                expect(store.dispatch).not.toHaveBeenCalled();
                expect(wrapper.emitted('update:modelValue')).toBeFalsy();
                expect(wrapper.emitted('delete')).toBeFalsy();
            });
        });
    });
    describe('props binding', () => {
        describe('natto-dialog', () => {
            test('modelValue', () => {
                expect(wrapper.findComponent(NattoDialog_vue_1.default).props('modelValue')).toBe(true);
            });
        });
        describe('img', () => {
            test('src', () => {
                const wrapper = createWrapper({
                    store: (0, storeMock_1.createDeleteFileStoreMocked)({
                        previewDocumentImage: 'preview-url'
                    })
                });
                const imgWrapper = wrapper.find('img');
                expect(imgWrapper.attributes('src')).toBe('preview-url');
            });
        });
    });
});
//# sourceMappingURL=PreviewModal.spec.js.map