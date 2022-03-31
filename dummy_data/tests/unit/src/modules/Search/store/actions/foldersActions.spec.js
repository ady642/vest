"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_1 = require("@/modules/Search/store/actions");
const services_1 = require("@/modules/Search/services");
const DocumentsFilters_1 = require("@/modules/Search/models/Documents/Query/DocumentsFilters");
const DocumentsPaginator_1 = require("@/modules/Search/models/Documents/Query/DocumentsPaginator");
const DocumentsSortOptions_1 = require("@/modules/Search/models/Documents/Query/DocumentsSortOptions");
const CategoryAPIMock_1 = require("../../mocks/CategoryAPIMock");
const Documents_1 = require("@/modules/Search/models/Documents/Inputs/Documents");
const Folders_1 = require("@/modules/Search/models/Folders/Inputs/Folders");
const Period_1 = require("@/Common/models/List/Period");
let commit = jest.fn();
const state = {
    folders: Folders_1.default.loaded([]),
    documents: Documents_1.default.loaded([
        { id: 'testId', name: 'testName' }
    ]),
    documentsTotalCount: 4454,
    filters: new DocumentsFilters_1.default({
        search: 'ss',
        folderId: 99,
        findInChildFolders: true,
        period: new Period_1.default()
    }),
    paginator: new DocumentsPaginator_1.default({
        pageNumber: 2,
        itemsPerPage: 10,
        totalItems: 0
    }),
    sortOptions: new DocumentsSortOptions_1.default({
        sortBy: 'date',
        sortDirection: 'ascending'
    }),
    isPreviewLoading: false,
    previewDocumentImage: new Blob([]),
    multipleDownloadLoading: false,
    isDownloading: false
};
const rootState = {
    app: {
        account: {
            AccountId: '1001'
        }
    },
    GED: {
        Trash: {},
        Search: state,
        DataManipulation: {
            MailToGed: {},
            Upload: {},
            DeleteFolders: {},
            DeleteFile: {},
            CreateFolder: {}
        }
    }
};
describe('foldersActions', () => {
    beforeEach(() => {
        commit = jest.fn();
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('fetchFolders', () => {
        it('should call the fetchFolders services and WHEN RESOLVED commit the result', async () => {
            // Given the service return a resolved value
            jest.spyOn(services_1.default, 'fetchFolders').mockReturnValue({
                data: [{ ...CategoryAPIMock_1.categoryMock }]
            });
            // When I call the fetchFolders action
            await actions_1.default.fetchFolders({
                rootState,
                commit,
                state
            });
            // Then fetchFolders service must be called
            expect(services_1.default.fetchFolders).toHaveBeenCalledWith('1001');
            expect(commit).toHaveBeenNthCalledWith(1, 'SET_FOLDERS', {
                collection: [],
                state: 'loading'
            });
            expect(commit).toHaveBeenNthCalledWith(2, 'SET_FOLDERS', {
                collection: [
                    {
                        id: 1,
                        name: 'Compta',
                        parentId: 0,
                        children: [],
                        properties: {},
                        permissions: []
                    }
                ],
                state: 'loaded'
            });
        });
        it('should call the fetchFolders services and WHEN there is an exception commit errored result', async () => {
            // Given the service return a resolved value
            jest.spyOn(services_1.default, 'fetchFolders').mockImplementation(() => {
                throw new Error('special one');
            });
            // When I call the fetchDocuments action
            await actions_1.default.fetchFolders({
                rootState,
                commit,
                state
            });
            // Then fetchDocuments service must be called
            expect(services_1.default.fetchFolders).toHaveBeenCalledWith('1001');
            expect(commit).toHaveBeenNthCalledWith(1, 'SET_FOLDERS', {
                collection: [],
                state: 'loading'
            });
            expect(commit).toHaveBeenNthCalledWith(2, 'SET_FOLDERS', {
                collection: [],
                state: 'errored'
            });
        });
    });
});
//# sourceMappingURL=foldersActions.spec.js.map