"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TrashDocumentsPaginator_1 = require("@/modules/Trash/models/Query/TrashDocumentsPaginator");
const TrashDocumentsQueryAPI_1 = require("@/modules/Trash/models/Query/TrashDocumentsQueryAPI");
const TrashSortOptions_1 = require("@/modules/Trash/models/Query/TrashSortOptions");
const services_1 = require("@/modules/Trash/services");
const mypulse_shared_dependencies_1 = require("@kpmg/mypulse-shared-dependencies");
const RestoreFileRequest_1 = require("@/modules/Trash/models/Query/RestoreFileRequest");
describe('TrashServices', () => {
    test('fetchTrashDocuments', () => {
        const trashDocumentsQuery = new TrashDocumentsQueryAPI_1.default({
            paginator: new TrashDocumentsPaginator_1.default({
                pageNumber: 1,
                itemsPerPage: 10,
                totalItems: 100
            }),
            sortOptions: new TrashSortOptions_1.default()
        });
        services_1.default.fetchTrashDocuments('testmodel6', trashDocumentsQuery.transformForAPI());
        expect(mypulse_shared_dependencies_1.api.ds.get).toHaveBeenCalledWith('/testmodel6/trash', {
            params: { limit: 10, skip: 0, sort: '-deleted' }
        });
    });
    it('restoreFile', () => {
        services_1.default.restoreFile('545421', '12345');
        const data = new RestoreFileRequest_1.default(['12345']);
        expect(mypulse_shared_dependencies_1.api.ds.post).toHaveBeenCalledWith('/545421/trash/restore', data);
    });
});
//# sourceMappingURL=index.spec.js.map