"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TrashDocumentAPIMock_1 = require("../mocks/TrashDocumentAPIMock");
const getters_1 = require("@/modules/Trash/store/getters");
const TrashDocumentsPaginator_1 = require("@/modules/Trash/models/Query/TrashDocumentsPaginator");
const TrashDocuments_1 = require("@/modules/Trash/models/Inputs/TrashDocuments");
const createTrashStoreMock_1 = require("dummy_data/tests/unit/__mocks__/storeMock/createTrashStoreMock");
let storeMock = (0, createTrashStoreMock_1.createTrashStoreMock)();
describe('trash-store-getters', () => {
    beforeEach(() => {
        storeMock = (0, createTrashStoreMock_1.createTrashStoreMock)();
        storeMock.state.GED.Trash.paginator = new TrashDocumentsPaginator_1.default({
            pageNumber: 1,
            itemsPerPage: 10,
            totalItems: 20
        });
        storeMock.state.GED.Trash.documents = TrashDocuments_1.default.loaded(TrashDocumentAPIMock_1.TrashDocumentAPIMockList);
        storeMock.state.GED.Trash.documentsTotalCount = 20;
    });
    test('documents', () => {
        expect(getters_1.default.documents(storeMock.state.GED.Trash)).toEqual(storeMock.state.GED.Trash.documents);
    });
    test('pendingList', () => {
        expect(getters_1.default.pendingList(storeMock.state.GED.Trash)).toEqual(storeMock.state.GED.Trash.pendingList);
    });
    test('totalPendingRestoration', () => {
        expect(getters_1.default.totalPendingRestoration(storeMock.state.GED.Trash)).toEqual(storeMock.state.GED.Trash.totalPendingRestoration);
    });
    test('documentsTotalCount', () => {
        expect(getters_1.default.documentsTotalCount(storeMock.state.GED.Trash)).toEqual(storeMock.state.GED.Trash.documentsTotalCount);
    });
    test('paginator', () => {
        expect(getters_1.default.paginator(storeMock.state.GED.Trash)).toEqual(storeMock.state.GED.Trash.paginator);
    });
    test('areAllDocumentsLoaded-when-are-loaded', () => {
        expect(getters_1.default.areAllDocumentsLoaded(storeMock.state.GED.Trash)).toEqual(false);
    });
    test('areAllDocumentsLoaded-when-are-not-loaded', () => {
        storeMock.state.GED.Trash.paginator.totalItems = 150;
        expect(getters_1.default.areAllDocumentsLoaded(storeMock.state.GED.Trash)).toEqual(false);
    });
    describe('isFileRestoring', () => {
        const restoringCases = [
            { isFileRestoring: false, expected: false },
            { isFileRestoring: true, expected: true }
        ];
        it.each(restoringCases)('is should return $expected if isFolderDeleting = $isFolderDeleting', ({ isFileRestoring, expected }) => {
            const state = {
                isFileRestoring
            };
            expect(getters_1.default.isFileRestoring(state)).toBe(expected);
        });
    });
    describe('isInPendingList', () => {
        const cases = [
            {
                trashDocumentId: '2705',
                restorationStatus: 'InProgress',
                expectedIsInPendingList: true
            },
            {
                trashDocumentId: '1501',
                restorationStatus: 'InProgress',
                expectedIsInPendingList: false
            },
            {
                trashDocumentId: '2705',
                restorationStatus: 'Failed',
                expectedIsInPendingList: false
            }
        ];
        it.each(cases)('isPendingList cases', ({ restorationStatus, trashDocumentId, expectedIsInPendingList }) => {
            const pendingList = TrashDocuments_1.default.loaded([
                {
                    id: trashDocumentId,
                    account: {
                        id: '454',
                        name: 'Columbo'
                    },
                    name: 'The document in progress',
                    deleted: '2020-10-05',
                    deletedBy: 'Sina',
                    path: ['/Kpmg/Achats'],
                    folderId: 8754
                }
            ]);
            const state = {
                pendingList
            };
            state.pendingList.collection[0].restorationStatus = restorationStatus;
            expect(getters_1.default.isInPendingList(state)('2705')).toBe(expectedIsInPendingList);
        });
    });
});
//# sourceMappingURL=getters.spec.js.map