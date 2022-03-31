"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TrashDocumentsPaginator_1 = require("@/modules/Trash/models/Query/TrashDocumentsPaginator");
const TrashDocumentsQueryAPI_1 = require("@/modules/Trash/models/Query/TrashDocumentsQueryAPI");
const TrashSortOptions_1 = require("@/modules/Trash/models/Query/TrashSortOptions");
describe('TrashDocumentsQueryAPI', () => {
    test('TrashDocumentsQuery.transformForAPI', () => {
        // create instance of trash documents query and check its properties
        const trashDocumentsQuery = new TrashDocumentsQueryAPI_1.default({
            paginator: new TrashDocumentsPaginator_1.default({
                pageNumber: 1,
                itemsPerPage: 10,
                totalItems: 100
            }),
            sortOptions: new TrashSortOptions_1.default()
        });
        const apiQuery = trashDocumentsQuery.transformForAPI();
        expect(apiQuery.skip).toBe(0);
        expect(apiQuery.limit).toBe(10);
        expect(apiQuery.sort).toBe('-deleted');
    });
});
//# sourceMappingURL=TrashDocumentsQueryAPI.spec.js.map