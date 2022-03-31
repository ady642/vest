"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getters_1 = require("@/modules/Search/store/getters");
const DocumentAPIMock_1 = require("../mocks/DocumentAPIMock");
const CategoryAPIMock_1 = require("../mocks/CategoryAPIMock");
const Documents_1 = require("@/modules/Search/models/Documents/Inputs/Documents");
const Folders_1 = require("@/modules/Search/models/Folders/Inputs/Folders");
const DocumentsFilters_1 = require("@/modules/Search/models/Documents/Query/DocumentsFilters");
const Paginator_1 = require("@/Common/models/List/Paginator");
const DocumentsPaginator_1 = require("@/modules/Search/models/Documents/Query/DocumentsPaginator");
const Period_1 = require("@/Common/models/List/Period");
const constants_1 = require("@/Common/constants");
const DocumentsSortOptions_1 = require("@/modules/Search/models/Documents/Query/DocumentsSortOptions");
const Properties_1 = require("@/modules/Search/models/Documents/Inputs/Properties");
const Document_1 = require("@/modules/Search/models/Documents/Inputs/Document");
let state = {};
describe('Documents getters', () => {
    it('should return sort options when I called sortOptions getter', () => {
        const sortOptions = new DocumentsSortOptions_1.default({
            sortBy: 'name',
            sortDirection: 'ascending'
        });
        state = {
            sortOptions: sortOptions
        };
        expect(getters_1.default.sortOptions(state)).toEqual(sortOptions);
    });
    it('should return documents when I called documents getter', () => {
        // Given documents state is set
        state = {
            documents: Documents_1.default.loaded([DocumentAPIMock_1.documentAPIMock])
        };
        // When I call the documents getter
        const documents = getters_1.default.documents(state);
        // Then documents must be equal to state.documents
        expect(documents).toEqual({
            state: 'loaded',
            collection: [
                {
                    comments: DocumentAPIMock_1.documentAPIMock.comments,
                    createdBy: DocumentAPIMock_1.documentAPIMock.createdBy,
                    id: DocumentAPIMock_1.documentAPIMock.id,
                    folderId: DocumentAPIMock_1.documentAPIMock.folder.id,
                    name: DocumentAPIMock_1.documentAPIMock.name,
                    creationDate: DocumentAPIMock_1.documentAPIMock.creationDate,
                    path: DocumentAPIMock_1.documentAPIMock.folder.path,
                    properties: new Properties_1.default({ syncStatus: constants_1.default.PENDING_SYNC }),
                    restorationStatus: '',
                    size: DocumentAPIMock_1.documentAPIMock.size,
                    type: DocumentAPIMock_1.documentAPIMock.type,
                    updatedDate: DocumentAPIMock_1.documentAPIMock.updated,
                    preview: '',
                    lifecycleStatus: Document_1.LifeCycleStatus.Treated
                }
            ]
        });
    });
    it('should return documentsTotalCount when I called documentsTotalCount getter', () => {
        // Given documentsTotalCount state is set
        state = {
            documentsTotalCount: 5401
        };
        // When I call the documentsTotalCount getter
        const documentsTotalCount = getters_1.default.documentsTotalCount(state);
        // Then documents must be equal to state.documentsTotalCount
        expect(documentsTotalCount).toEqual(5401);
    });
    it('should return folders when I called folders getter', () => {
        // Given folders state is set
        state = {
            folders: Folders_1.default.loaded([CategoryAPIMock_1.categoryMock])
        };
        // When I call the folders getter
        const folders = getters_1.default.folders(state);
        // Then folders must be equal to state.folders
        expect(folders).toEqual({
            state: 'loaded',
            collection: [
                {
                    id: 1,
                    name: 'Compta',
                    parentId: 0,
                    children: [],
                    properties: {},
                    permissions: []
                }
            ]
        });
    });
    it('should return filters when I called filters getter', () => {
        // Given documents state is set
        state = {
            filters: new DocumentsFilters_1.default({
                search: 'ss',
                folderId: 99,
                findInChildFolders: true,
                period: new Period_1.default()
            })
        };
        // When I call the filters getter
        const filters = getters_1.default.filters(state);
        // Then documents must be equal to state.filters
        expect(filters).toEqual({
            findInChildFolders: true,
            folderId: 99,
            search: 'ss',
            period: new Period_1.default(),
            certified: 'all'
        });
    });
    it('should return paginator when I called paginator getter', () => {
        // Given paginator state is set
        state = {
            paginator: new Paginator_1.default({
                pageNumber: 2,
                itemsPerPage: 10,
                totalItems: 0
            })
        };
        // When I call the paginator getter
        const paginator = getters_1.default.paginator(state);
        // Then documents must be equal to state.paginator
        expect(paginator).toEqual({
            pageNumber: 2,
            itemsPerPage: 10,
            totalItems: 0
        });
    });
    describe('areAllDocumentsLoaded', () => {
        const allDocumentsCases = [
            { totalItems: 1, areAllDocuments: true },
            { totalItems: 2, areAllDocuments: false }
        ];
        it.each(allDocumentsCases)('should $areAllDocuments true when totalItems is equal to $totalItems', ({ totalItems, areAllDocuments }) => {
            state = {
                documents: Documents_1.default.loaded([DocumentAPIMock_1.documentAPIMock]),
                paginator: new DocumentsPaginator_1.default({
                    totalItems,
                    itemsPerPage: 10,
                    pageNumber: 1
                })
            };
            const areAllDocumentsLoaded = getters_1.default.areAllDocumentsLoaded(state);
            expect(areAllDocumentsLoaded).toEqual(areAllDocuments);
        });
    });
    describe('activeFiltersCount', () => {
        const activeFiltersCount = [
            {
                filters: new DocumentsFilters_1.default({
                    search: '',
                    period: new Period_1.default({
                        startDate: '2012-05-04',
                        endDate: ''
                    }),
                    folderId: 45,
                    findInChildFolders: false
                }),
                expectedActiveFiltersCount: 1
            },
            {
                filters: new DocumentsFilters_1.default({
                    search: '',
                    period: new Period_1.default(),
                    folderId: 45,
                    findInChildFolders: false
                }),
                expectedActiveFiltersCount: 0
            }
        ];
        it.each(activeFiltersCount)('should $activeFiltersCounts 1 when period is set', ({ filters, expectedActiveFiltersCount }) => {
            state = {
                filters
            };
            const activeFiltersCounts = getters_1.default.activeFiltersCount(state);
            expect(activeFiltersCounts).toEqual(expectedActiveFiltersCount);
        });
    });
    describe('searchActive', () => {
        const searchActiveCases = [
            {
                filters: new DocumentsFilters_1.default({
                    search: 'test',
                    period: new Period_1.default(),
                    folderId: 45,
                    findInChildFolders: false
                }),
                expectedSearchActive: true
            },
            {
                filters: new DocumentsFilters_1.default({
                    search: '',
                    period: new Period_1.default(),
                    folderId: 45,
                    findInChildFolders: false
                }),
                expectedSearchActive: false
            }
        ];
        it.each(searchActiveCases)('should $searchActive be true when search is set', ({ filters, expectedSearchActive }) => {
            state = {
                filters
            };
            const searchActive = getters_1.default.searchActive(state);
            expect(searchActive).toEqual(expectedSearchActive);
        });
    });
    it('should return preview when I called preview getter', () => {
        // Given preview state is set
        state = {
            previewDocumentImage: new Blob(['test'])
        };
        // When I call the preview getter
        const previewDocumentImage = getters_1.default.previewDocumentImage(state);
        // Then preview must be equal to state.preview
        expect(previewDocumentImage).toEqual(new Blob(['test']));
    });
    it('should return previewLoading when I called previewLoading getter', () => {
        // Given isPreviewLoading state is set
        state = {
            isPreviewLoading: true
        };
        // When I call the isPreviewLoading getter
        const isPreviewLoading = getters_1.default.isPreviewLoading(state);
        // Then preview must be equal to state.preview
        expect(isPreviewLoading).toEqual(true);
    });
    it('should return multipleDownloadLoading when I called multipleDownloadLoading getter', () => {
        // Given multipleDownloadLoading state is set
        state = {
            multipleDownloadLoading: true
        };
        // When I call the multipleDownloadLoading getter
        const multipleDownloadLoading = getters_1.default.multipleDownloadLoading(state);
        // Then multipleDownloadLoading must be equal to state.preview
        expect(multipleDownloadLoading).toEqual(true);
    });
    it('should return isDownloading when I called isDownloading getter', () => {
        // Given isDownloading state is set
        state = {
            isDownloading: true
        };
        // When I call the multipleDownloadLoading getter
        const isDownloading = getters_1.default.isDownloading(state);
        // Then isDownloading must be equal to state.preview
        expect(isDownloading).toEqual(true);
    });
    it('should return areAnyFilters when I called areAnyFilters getter', () => {
        state = {
            filters: new DocumentsFilters_1.default({
                search: 'test'
            })
        };
        expect(getters_1.default.areAnyFilters(state)).toEqual(true);
    });
});
//# sourceMappingURL=getters.spec.js.map