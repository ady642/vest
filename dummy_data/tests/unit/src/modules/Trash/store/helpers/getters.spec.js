"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gettersHelper_1 = require("@/modules/Trash/store/helpers/gettersHelper");
const TrashDocuments_1 = require("@/modules/Trash/models/Inputs/TrashDocuments");
const TrashDocumentsPaginator_1 = require("@/modules/Trash/models/Query/TrashDocumentsPaginator");
const createTrashStoreMock_1 = require("dummy_data/tests/unit/__mocks__/storeMock/createTrashStoreMock");
const TrashDocumentAPIMock_1 = require("../../mocks/TrashDocumentAPIMock");
let storeMock = (0, createTrashStoreMock_1.createTrashStoreMock)();
const documentsData = TrashDocuments_1.default.loaded(TrashDocumentAPIMock_1.TrashDocumentAPILightMockList);
describe('gettersHelpers', () => {
    beforeEach(() => {
        storeMock = (0, createTrashStoreMock_1.createTrashStoreMock)();
        storeMock.state.GED.Trash.documents = documentsData;
        storeMock.state.GED.Trash.documentsTotalCount = 4;
        storeMock.state.GED.Trash.paginator = new TrashDocumentsPaginator_1.default({
            pageNumber: 1,
            itemsPerPage: 10,
            totalItems: 100
        });
    });
    test('documents', () => {
        const { documents } = (0, gettersHelper_1.default)(storeMock);
        expect(documents().value).toEqual(storeMock.state.GED.Trash.documents);
    });
    test('documentsTotalCount', () => {
        const { documentsTotalCount } = (0, gettersHelper_1.default)(storeMock);
        expect(documentsTotalCount().value).toEqual(1905);
    });
    test('paginator', () => {
        const { paginator } = (0, gettersHelper_1.default)(storeMock);
        expect(paginator().value).toEqual(storeMock.state.GED.Trash.paginator);
    });
    test('areAllDocumentsLoaded', () => {
        const { areAllDocumentsLoaded } = (0, gettersHelper_1.default)(storeMock);
        expect(areAllDocumentsLoaded().value).toBe(false);
    });
});
//# sourceMappingURL=getters.spec.js.map