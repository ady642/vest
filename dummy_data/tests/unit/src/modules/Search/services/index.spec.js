"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("@/modules/Search/services");
const DocumentsQuery_1 = require("@/modules/Search/models/Documents/Query/DocumentsQuery");
const mypulse_shared_dependencies_1 = require("@kpmg/mypulse-shared-dependencies");
const DocumentsPaginator_1 = require("@/modules/Search/models/Documents/Query/DocumentsPaginator");
const DocumentsFilters_1 = require("@/modules/Search/models/Documents/Query/DocumentsFilters");
const DocumentsSortOptions_1 = require("@/modules/Search/models/Documents/Query/DocumentsSortOptions");
const Account_1 = require("@/modules/Account/models/Account");
const DownloadQuery_1 = require("@/modules/Search/models/Documents/Query/DownloadQuery");
const Period_1 = require("@/Common/models/List/Period");
const PatchQuery_1 = require("@/modules/Search/models/Documents/Query/PatchQuery");
describe('DocumentServices', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should call api.ds.get with documents get API when I call the the fetchDocument service', () => {
        // Given the documentsQuery is set
        const documentsQuery = new DocumentsQuery_1.default({
            account: new Account_1.default({ id: '1001' }),
            paginator: new DocumentsPaginator_1.default({
                pageNumber: 2,
                itemsPerPage: 10,
                totalItems: 20
            }),
            filters: new DocumentsFilters_1.default({
                search: 'test',
                findInChildFolders: true,
                folderId: 0,
                period: new Period_1.default()
            }),
            sortOptions: new DocumentsSortOptions_1.default({
                sortBy: 'date',
                sortDirection: 'ascending'
            })
        });
        // When I call the fetchDocuments service
        services_1.default.fetchDocuments(documentsQuery.transformForAPI());
        // Then api.ds.get must have been called with good payload
        expect(mypulse_shared_dependencies_1.api.ds.get).toHaveBeenCalledWith('/documents/search', {
            params: {
                skip: 10,
                limit: 10,
                sort: '+date',
                search: 'test',
                accountNumberOrId: '1001',
                findInChildFolders: true,
                folderId: undefined,
                certified: undefined
            }
        });
    });
    it('should call api.ds.get with folders get API when I call the the fetchFolders service', () => {
        // When I call the fetchFolders service
        services_1.default.fetchFolders('123456');
        // Then api.ds.get must have been called with good path
        expect(mypulse_shared_dependencies_1.api.ds.get).toHaveBeenCalledWith('/123456/folders');
    });
    it('should call api.ds.get with download document GET API when the downloadDocument service is called', () => {
        // When the downloadDocument service is called
        services_1.default.downloadDocument(new DownloadQuery_1.default({
            accountId: '1001',
            documentId: 'tgh'
        }).transformForAPI());
        // Then api.ds.get must have been called with good query
        expect(mypulse_shared_dependencies_1.api.ds.get).toHaveBeenCalledWith('/1001/documents/tgh/content', {
            responseType: 'blob'
        });
    });
    it('should call api.ds.post with download documents POST API when the downloadDocuments service is called', () => {
        // When the downloadDocument service is called
        services_1.default.downloadDocuments('1001', ['testId', 'testId2']);
        // Then api.ds.post must have been called with good query
        expect(mypulse_shared_dependencies_1.api.ds.post).toHaveBeenCalledWith('/1001/archive', { ids: ['testId', 'testId2'] }, { responseType: 'blob' });
    });
    it('should call api.ds.patch with patch document PATCH API when the patchDocument service is called', () => {
        // When the patchDocument service is called
        services_1.default.patchDocument(new PatchQuery_1.default({
            accountId: '1001',
            documentId: 'tgh',
            operation: 'op1',
            path: 'path1',
            value: 'some value'
        }));
        // Then api.ds.patch must have been called with good query
        expect(mypulse_shared_dependencies_1.api.ds.patch).toHaveBeenCalledWith('/1001/documents/tgh', [
            { op: 'op1', path: 'path1', value: 'some value' }
        ]);
    });
    it('should call api.ds.get with right url and responseType: buffer', () => {
        // When the downloadPreview service is called
        services_1.default.downloadPreview(new DownloadQuery_1.default({
            accountId: '1234',
            documentId: '27'
        }));
        // Then api.ds.get must have been called with right parameters
        expect(mypulse_shared_dependencies_1.api.ds.get).toHaveBeenCalledWith('/1234/documents/27/preview', {
            responseType: 'arraybuffer'
        });
    });
});
//# sourceMappingURL=index.spec.js.map