"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TrashDocumentsPaginator_1 = require("@/modules/Trash/models/Query/TrashDocumentsPaginator");
const TrashDocuments_1 = require("@/modules/Trash/models/Inputs/TrashDocuments");
const mutations_1 = require("@/modules/Trash/store/mutations");
const createTrashStoreMock_1 = require("dummy_data/tests/unit/__mocks__/storeMock/createTrashStoreMock");
const constants_1 = require("@/Common/constants");
const TrashDocumentAPIMock_1 = require("../mocks/TrashDocumentAPIMock");
let storeMock = (0, createTrashStoreMock_1.createTrashStoreMock)();
const documentsData = TrashDocuments_1.default.loaded(TrashDocumentAPIMock_1.TrashDocumentAPILightMockList);
describe('trash-store-mutations', () => {
    beforeEach(() => {
        storeMock = (0, createTrashStoreMock_1.createTrashStoreMock)();
        storeMock.state.GED.Trash.paginator = new TrashDocumentsPaginator_1.default({
            pageNumber: 0,
            itemsPerPage: 0,
            totalItems: 0
        });
        storeMock.state.GED.Trash.documents = TrashDocuments_1.default.loaded([]);
        storeMock.state.GED.Trash.documentsTotalCount = 0;
    });
    test('SET_TRASH_DOCUMENTS', () => {
        mutations_1.default[mutations_1.SET_TRASH_DOCUMENTS](storeMock.state.GED.Trash, TrashDocuments_1.default.loading('cancelToken'));
        expect(storeMock.state.GED.Trash.documents).toEqual(TrashDocuments_1.default.loading('cancelToken'));
    });
    test('SET_TRASH_DOCUMENTS_TOTAL_COUNT', () => {
        mutations_1.default[mutations_1.SET_TRASH_DOCUMENTS_TOTAL_COUNT](storeMock.state.GED.Trash, 55);
        expect(storeMock.state.GED.Trash.documentsTotalCount).toEqual(55);
    });
    test('SET_TRASH_PAGINATOR', () => {
        mutations_1.default[mutations_1.SET_TRASH_PAGINATOR](storeMock.state.GED.Trash, new TrashDocumentsPaginator_1.default({
            pageNumber: 1,
            itemsPerPage: 10,
            totalItems: 100
        }));
        expect(storeMock.state.GED.Trash.paginator).toEqual({
            pageNumber: 1,
            itemsPerPage: 10,
            totalItems: 100
        });
    });
    it('SET_IS_FILE_RESTORING', () => {
        const state = {
            isFileRestoring: false
        };
        mutations_1.default[mutations_1.SET_IS_FILE_RESTORING](state, true);
        expect(state.isFileRestoring).toEqual(true);
    });
    it('SET_DOCUMENT_STATUS', () => {
        const state = {
            pendingList: documentsData
        };
        mutations_1.default[mutations_1.SET_DOCUMENT_STATUS](state, {
            status: constants_1.default.RESTORE_FAILED,
            documentId: 'cf28d738-8715-4d0f-b87e-2872f0d559ef'
        });
        expect(state.pendingList.collection.some((document) => document.restorationStatus === constants_1.default.RESTORE_FAILED)).toBe(true);
    });
    describe('REMOVE_DOCUMENT_FROM_PENDING_LIST', () => {
        let state = {};
        beforeEach(() => {
            state = {
                pendingList: TrashDocuments_1.default.loaded([
                    {
                        id: 'cf28d738-8715-4d0f-b87e-2872f0d559ef',
                        name: '12 - Tableaux des offres GED DS.xlsx',
                        path: ['Comptabilité', 'KPMG', 'Publications'],
                        deleted: '2021-08-26T07:21:57.303Z',
                        deletedBy: 'Admin',
                        account: {
                            id: '93012cc8-77b9-4161-8dbd-61915d935e21',
                            name: 'JEAN LéVAGE'
                        },
                        folderId: 1
                    }
                ])
            };
        });
        it('should throw an exception if documentId is null', () => {
            console.error = jest.fn();
            mutations_1.default[mutations_1.REMOVE_DOCUMENT_IN_PENDING_LIST](state, '');
            expect(console.error).toHaveBeenCalledWith('Document Id cant be empty');
        });
        it('should remove the document of the pendingList.collection state with the id passed in parameters', () => {
            const documentIdToRemove = 'cf28d738-8715-4d0f-b87e-2872f0d559ef';
            mutations_1.default[mutations_1.REMOVE_DOCUMENT_IN_PENDING_LIST](state, documentIdToRemove);
            expect(state.pendingList.collection).toEqual([]);
        });
    });
});
//# sourceMappingURL=mutations.spec.js.map