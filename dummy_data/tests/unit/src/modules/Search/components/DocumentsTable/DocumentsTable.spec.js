"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DocumentsTable_vue_1 = require("@/modules/Search/components/DocumentsTable/DocumentsTable.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const NattoTable_vue_1 = require("@/Common/components/Table/NattoTable.vue");
const Documents_1 = require("@/modules/Search/models/Documents/Inputs/Documents");
const DocumentAPIMock_1 = require("dummy_data/tests/unit/src/modules/Search/mocks/DocumentAPIMock");
const constants_1 = require("@/Common/constants");
const DeleteFileModalConfirmation_vue_1 = require("@/modules/DataManipulation/Delete/DeleteFile/components/Modals/DeleteFileModalConfirmation.vue");
const DocumentSyncStatusElement_vue_1 = require("@/modules/Search/components/DocumentsTable/DocumentsTableElements/DocumentSyncStatusElement.vue");
const DocumentNameElement_vue_1 = require("@/modules/Search/components/DocumentsTable/DocumentsTableElements/DocumentNameElement.vue");
const Properties_1 = require("@/modules/Search/models/Documents/Inputs/Properties");
const useStyleguideStubs_1 = require("dummy_data/tests/unit/utils/useStyleguideStubs");
const Document_1 = require("@/modules/Search/models/Documents/Inputs/Document");
const mypulse_shared_dependencies_1 = require("@kpmg/mypulse-shared-dependencies");
const finders_1 = require("dummy_data/tests/unit/utils/finders");
const { MpTable } = (0, useStyleguideStubs_1.default)();
const defaultProps = {
    documents: Documents_1.default.loading('awesome cancel token'),
    hideHeader: false,
    areAllDocumentsLoaded: false,
    isCollabUser: false,
    search: 'test'
};
const createWrapper = (props = defaultProps) => (0, wrapperFactory_1.default)(DocumentsTable_vue_1.default, {
    global: {
        stubs: { NattoTable: NattoTable_vue_1.default, MpTable, DocumentSyncStatusElement: DocumentSyncStatusElement_vue_1.default },
        directives: { Loading: {}, InfiniteScroll: {} }
    },
    props
});
let wrapper = createWrapper();
const findNattoTable = (wrapper) => wrapper.findComponent(NattoTable_vue_1.default);
const findDocumentNameElement = (wrapper) => wrapper.findComponent(DocumentNameElement_vue_1.default);
let documentActionElementWrapper = (0, finders_1.findDocumentActionsElement)(wrapper);
describe('DocumentsTable', () => {
    beforeEach(() => {
        wrapper = createWrapper();
        documentActionElementWrapper = (0, finders_1.findDocumentActionsElement)(wrapper);
    });
    describe('DocumentsNameElement bindings', () => {
        test('props bindings', () => {
            const documentNameElementWrapper = findDocumentNameElement(wrapper);
            expect(documentNameElementWrapper.vm.search).toBe('test');
        });
    });
    describe('DocumentActionsElement bindings', () => {
        test('props bindings', () => {
            expect(documentActionElementWrapper.props()).toStrictEqual({
                displayGoTo: true
            });
        });
        describe('events', () => {
            it('Should open delete folder modal when delete-clicked', async () => {
                await documentActionElementWrapper.vm.$emit('delete-clicked', {
                    documentId: '1234',
                    isSynchronizedDocument: true
                });
                const deleteFileModalConfirmationWrapper = wrapper.findComponent(DeleteFileModalConfirmation_vue_1.default);
                expect(deleteFileModalConfirmationWrapper.props('modelValue')).toBe(true);
                expect(deleteFileModalConfirmationWrapper.props('documentIds')).toStrictEqual(['1234']);
                expect(deleteFileModalConfirmationWrapper.props('isSynchronizedDocument')).toBe(true);
            });
            it('Should go to arboView if goto-clicked is emitted', async () => {
                await documentActionElementWrapper.vm.$emit('goto-clicked', {
                    documentId: '1234',
                    isSynchronizedDocument: true,
                    folderId: 9876
                });
                expect(mypulse_shared_dependencies_1.router.push).toHaveBeenCalledWith({
                    name: 'ArboView',
                    query: { folderId: 9876 }
                });
            });
            it('should send an on-download-document event, when download-clicked event is sent to from DocumentActions', async () => {
                await documentActionElementWrapper.vm.$emit('download-clicked', {
                    documentId: '1234',
                    isSynchronizedDocument: true
                });
                expect(wrapper.emitted('on-download-document')).toBeTruthy();
                expect(wrapper.emitted('on-download-document')).toEqual([['1234']]);
            });
        });
    });
    describe('Natto Table bindings', () => {
        describe('props', () => {
            it('should pass props to the NattoTable props', () => {
                // Given the documents are defined
                wrapper = createWrapper({
                    documents: Documents_1.default.loaded([DocumentAPIMock_1.documentAPIMock]),
                    hideHeader: true,
                    areAllDocumentsLoaded: true,
                    isCollabUser: false
                });
                // Then the Documents.collection must be passed to the NattoTable
                const nattoTableWrapper = findNattoTable(wrapper);
                expect(nattoTableWrapper.vm.tableData).toEqual([
                    {
                        comments: 'je suis le bilan comptable',
                        createdBy: '',
                        id: 'myID',
                        folderId: 45454,
                        name: 'Mon bilan comptable',
                        creationDate: '2018-05-27',
                        path: [],
                        properties: new Properties_1.default({ syncStatus: constants_1.default.PENDING_SYNC }),
                        restorationStatus: '',
                        size: 54545,
                        type: 'jpg',
                        updatedDate: '2018-05-27',
                        preview: '',
                        lifecycleStatus: Document_1.LifeCycleStatus.Treated
                    }
                ]);
                expect(nattoTableWrapper.vm.hideHeader).toBe(true);
                expect(nattoTableWrapper.vm.cellClassName).toBe(wrapper.vm.documentsCellClassName);
                expect(nattoTableWrapper.vm.infiniteScrollFinished).toBe(true);
            });
        });
        describe('events', () => {
            it('should emit document-clicked when NattoTable emits row-clicked', () => {
                const nattoTableWrapper = findNattoTable(wrapper);
                const document = new Document_1.default();
                document.id = 'TEST';
                nattoTableWrapper.vm.$emit('row-clicked', document);
                expect(wrapper.emitted('document-clicked')).toHaveLength(1);
                expect(wrapper.emitted('document-clicked')).toStrictEqual([[document]]);
                expect(wrapper.emitted('document-clicked')).toBeTruthy();
            });
            it('should emit on-scroll-to-bottom when NattoTable emits on-scroll-to-bottom', () => {
                const nattoTableWrapper = findNattoTable(wrapper);
                nattoTableWrapper.vm.$emit('on-scroll-to-bottom');
                expect(wrapper.emitted('on-scroll-to-bottom')).toHaveLength(1);
                expect(wrapper.emitted('on-scroll-to-bottom')).toBeTruthy();
            });
            it('should return justify-center class for first column and empty string for others column', () => {
                // Given
                expect(wrapper.vm.documentsCellClassName({ columnIndex: 0 })).toBe('justify-center');
                expect(wrapper.vm.documentsCellClassName({ columnIndex: 1 })).toBe('');
            });
        });
        describe('rendering', () => {
            it('should not render ged sync icon when isCollabUser is false', () => {
                expect(wrapper.findComponent(DocumentSyncStatusElement_vue_1.default).exists()).toBeFalsy();
            });
            it('should not render ged sync icon when isCollabUser is true', () => {
                wrapper = createWrapper({
                    documents: Documents_1.default.loaded([DocumentAPIMock_1.documentAPIMock]),
                    hideHeader: true,
                    areAllDocumentsLoaded: true,
                    isCollabUser: true
                });
                expect(wrapper.findComponent(DocumentSyncStatusElement_vue_1.default).exists()).toBeTruthy();
            });
        });
    });
});
//# sourceMappingURL=DocumentsTable.spec.js.map