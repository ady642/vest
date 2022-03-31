"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const useElementStubs_1 = require("dummy_data/tests/unit/utils/useElementStubs");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const NattoTable_vue_1 = require("@/Common/components/Table/NattoTable.vue");
const createTrashStoreMock_1 = require("dummy_data/tests/unit/__mocks__/storeMock/createTrashStoreMock");
const TrashDocuments_1 = require("@/modules/Trash/models/Inputs/TrashDocuments");
const DocumentTypeElement_vue_1 = require("@/modules/Search/components/DocumentsTable/DocumentsTableElements/DocumentTypeElement.vue");
const DocumentNameElement_vue_1 = require("@/modules/Search/components/DocumentsTable/DocumentsTableElements/DocumentNameElement.vue");
const DocumentCreationDateElement_vue_1 = require("@/modules/Search/components/DocumentsTable/DocumentsTableElements/DocumentCreationDateElement.vue");
const TrashDocumentOrigin_vue_1 = require("@/modules/Trash/components/TrashDocumentsTableElements/TrashDocumentOrigin.vue");
const TrashDocumentRestore_vue_1 = require("@/modules/Trash/components/TrashDocumentsTableElements/TrashDocumentRestore.vue");
const TrashDocumentsActionsElement_vue_1 = require("@/modules/Trash/components/TrashDocumentsTableElements/TrashDocumentsActionsElement.vue");
const TrashDocumentAPIMock_1 = require("../mocks/TrashDocumentAPIMock");
const TrashDocumentsTable_vue_1 = require("@/modules/Trash/components/TrashDocumentsTable.vue");
const RestoreFileModalConfirmation_vue_1 = require("@/modules/Trash/components/Modals/RestoreFileModalConfirmation.vue");
const analyticsLog_1 = require("@/Common/helpers/analyticsLog");
jest.mock('@/Common/helpers/analyticsLog', () => ({
    trackEventFactory: jest.fn()
}));
const { ElTable } = (0, useElementStubs_1.default)();
const mainStoreMock = (0, createTrashStoreMock_1.createTrashStoreMock)();
const defaultProps = {
    documents: TrashDocuments_1.default.loaded(TrashDocumentAPIMock_1.TrashDocumentAPILightMockList),
    documentsPerPage: 10,
    documentsTotalInFolderAndChild: 5201,
    pageNumber: 520
};
const createWrapper = ({ documents, documentsPerPage, documentsTotalInFolderAndChild, pageNumber } = defaultProps, store = mainStoreMock) => (0, wrapperFactory_1.default)(TrashDocumentsTable_vue_1.default, {
    props: {
        documents,
        documentsPerPage,
        documentsTotalInFolderAndChild,
        pageNumber
    },
    global: {
        stubs: {
            NattoTable: NattoTable_vue_1.default,
            TrashDocumentsActionsElement: TrashDocumentsActionsElement_vue_1.default,
            ElTable,
            TrashDocumentRestore: TrashDocumentRestore_vue_1.default,
            TrashDocumentOrigin: TrashDocumentOrigin_vue_1.default,
            DocumentCreationDateElement: DocumentCreationDateElement_vue_1.default,
            DocumentNameElement: DocumentNameElement_vue_1.default,
            DocumentTypeElement: DocumentTypeElement_vue_1.default,
            RestoreFileModalConfirmation: RestoreFileModalConfirmation_vue_1.default
        },
        directives: {
            Loading: {},
            InfiniteScroll: {}
        },
        plugins: [store]
    }
});
const findNattoTable = (wrapper) => wrapper.findComponent(NattoTable_vue_1.default);
let wrapper = createWrapper();
let nattoTableWrapper = findNattoTable(wrapper);
describe('TrashDocumentsTable', () => {
    beforeEach(() => {
        wrapper = createWrapper();
        mainStoreMock.dispatch = jest.fn();
    });
    describe('bindings with NattoTable', () => {
        describe('props', () => {
            nattoTableWrapper = findNattoTable(wrapper);
            expect(nattoTableWrapper.vm.tableData.length).toEqual(defaultProps.documents.collection.length);
            expect(nattoTableWrapper.vm.itemsPerPage).toBe(10);
            expect(nattoTableWrapper.vm.pageNumber).toBe(520);
            expect(nattoTableWrapper.vm.itemsTotal).toBe(5201);
            expect(nattoTableWrapper.vm.paginated).toBe(true);
            expect(nattoTableWrapper.vm.loading).toBe(false);
            expect(nattoTableWrapper.vm.rowClassName).toBe(wrapper.vm.trashDocumentRowClass);
            describe('tests disabled row', () => {
                const cases = [
                    { isInPendingList: true, expectedClass: 'row--disabled' },
                    { isInPendingList: false, expectedClass: '' }
                ];
                it.each(cases)('should disabled the row if the trashDocument is in restoration', ({ isInPendingList, expectedClass }) => {
                    wrapper = createWrapper(defaultProps, (0, createTrashStoreMock_1.createTrashStoreMock)({ isInPendingList }));
                    nattoTableWrapper = findNattoTable(wrapper);
                    if (!nattoTableWrapper.vm.rowClassName) {
                        return;
                    }
                    expect(nattoTableWrapper.vm.rowClassName({
                        row: { id: 4545 },
                        rowIndex: 45688
                    })).toBe(expectedClass);
                });
            });
        });
        describe('events', () => {
            it('should emit page-opened when NattoTable emits page-opened', async () => {
                const nattoTableWrapper = wrapper.findComponent(NattoTable_vue_1.default);
                await nattoTableWrapper.vm.$emit('page-opened', 2);
                expect(wrapper.emitted('page-opened')).toHaveLength(1);
                expect(wrapper.emitted('page-opened')).toEqual([[2]]);
            });
            it('should open confirmation modal when restore-clicked is emited', async () => {
                const trashDocumentsActionsElementWrapper = wrapper.findComponent(TrashDocumentsActionsElement_vue_1.default);
                await trashDocumentsActionsElementWrapper.vm.$emit('restore-clicked', '81180f6a-7ae3-441c-b3d1-3e85ff1732fd');
                const restoreFileModalConfirmationWrapper = wrapper.findComponent(RestoreFileModalConfirmation_vue_1.default);
                expect(analyticsLog_1.trackEventFactory).toBeCalledWith('tdv-menu-restore');
                expect(restoreFileModalConfirmationWrapper.vm.documentId).toBe('81180f6a-7ae3-441c-b3d1-3e85ff1732fd');
                expect(restoreFileModalConfirmationWrapper.vm.modelValue).toBe(true);
            });
            it('should open confirmation modal when restore-icon-click is emited', async () => {
                const TrashDocumentRestoreWrapper = wrapper.findComponent(TrashDocumentRestore_vue_1.default);
                await TrashDocumentRestoreWrapper.vm.$emit('restore-icon-click', '1122');
                const restoreFileModalConfirmationWrapper = wrapper.findComponent(RestoreFileModalConfirmation_vue_1.default);
                expect(analyticsLog_1.trackEventFactory).toBeCalledWith('tdv-tab-restore');
                expect(restoreFileModalConfirmationWrapper.vm.documentId).toBe('1122');
                expect(restoreFileModalConfirmationWrapper.vm.modelValue).toBe(true);
            });
            it('should emit restore-document when restore-confirm is emited', async () => {
                const restoreFileModalConfirmationWrapper = wrapper.findComponent(RestoreFileModalConfirmation_vue_1.default);
                await restoreFileModalConfirmationWrapper.vm.$emit('restore-confirm', '1122');
                expect(wrapper.emitted('restore-document')).toHaveLength(1);
                expect(wrapper.emitted('restore-document')).toEqual([['1122']]);
            });
        });
    });
});
//# sourceMappingURL=TrashDocumentsTable.spec.js.map