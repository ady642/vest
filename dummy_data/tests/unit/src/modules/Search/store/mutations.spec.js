"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mutations_1 = require("@/modules/Search/store/mutations");
const Documents_1 = require("@/modules/Search/models/Documents/Inputs/Documents");
const DocumentAPIMock_1 = require("../mocks/DocumentAPIMock");
const CategoryAPIMock_1 = require("../mocks/CategoryAPIMock");
const Folders_1 = require("@/modules/Search/models/Folders/Inputs/Folders");
const DocumentsFilters_1 = require("@/modules/Search/models/Documents/Query/DocumentsFilters");
const Paginator_1 = require("@/Common/models/List/Paginator");
const Period_1 = require("@/Common/models/List/Period");
const constants_1 = require("@/Common/constants");
const Folder_1 = require("@/modules/Search/models/Folders/Inputs/Folder");
const DocumentsSortOptions_1 = require("@/modules/Search/models/Documents/Query/DocumentsSortOptions");
const Properties_1 = require("@/modules/Search/models/Documents/Inputs/Properties");
const Document_1 = require("@/modules/Search/models/Documents/Inputs/Document");
describe('Documents mutations', () => {
    it('SET_SORT_OPTIONS', () => {
        const state = {
            sortOptions: new DocumentsSortOptions_1.default()
        };
        mutations_1.default.SET_SORT_OPTIONS(state, new DocumentsSortOptions_1.default({
            sortBy: 'custom',
            sortDirection: 'ascending'
        }));
        expect(state.sortOptions.sortBy).toBe('custom');
        expect(state.sortOptions.sortDirection).toBe('ascending');
    });
    it('SET_DOCUMENTS', () => {
        const state = {
            documents: Documents_1.default.loading('this cancel token')
        };
        // When the SET_DOCUMENTS mutation is called
        mutations_1.default.SET_DOCUMENTS(state, Documents_1.default.loaded([{ ...DocumentAPIMock_1.documentAPIMock }]));
        // Then documents state must be equal to payload
        expect(state.documents).toEqual({
            cancelToken: 'this cancel token',
            collection: [
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
            ],
            state: 'loaded'
        });
    });
    it('PUSH_DOCUMENTS', () => {
        const state = {
            documents: Documents_1.default.loaded([{ ...DocumentAPIMock_1.documentAPIMock }])
        };
        // When the PUSH_DOCUMENTS mutation is called
        mutations_1.default.PUSH_DOCUMENTS(state, Documents_1.default.loaded([{ ...DocumentAPIMock_1.documentAPIMock }]));
        // Then documents state must be equal to documents that was here before and the payload
        expect(state.documents).toEqual({
            collection: [
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
                },
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
            ],
            state: 'loaded'
        });
    });
    it('SET_DOCUMENTS_TOTAL_COUNT', () => {
        const state = {
            documentsTotalCount: 0
        };
        // When the SET_DOCUMENTS_TOTAL_COUNT mutation is called
        mutations_1.default.SET_DOCUMENTS_TOTAL_COUNT(state, 4545);
        // Then documentsTotalCount state must be equal to 4545
        expect(state.documentsTotalCount).toEqual(4545);
    });
    it('SET_FOLDERS', () => {
        const state = {
            folders: Folders_1.default.loading()
        };
        // When the SET_FOLDERS mutation is called
        mutations_1.default.SET_FOLDERS(state, Folders_1.default.loaded([{ ...CategoryAPIMock_1.categoryMock }]));
        // Then documents state must be equal to payload
        expect(state.folders).toEqual({
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
    it('SET_FILTERS', () => {
        const state = {
            filters: new DocumentsFilters_1.default()
        };
        // When the SET_FOLDERS mutation is called
        mutations_1.default.SET_FILTERS(state, new DocumentsFilters_1.default({
            search: 'ss',
            folderId: 99,
            findInChildFolders: true,
            period: new Period_1.default()
        }));
        // Then documents state must be equal to payload
        expect(state.filters).toEqual(new DocumentsFilters_1.default({
            search: 'ss',
            folderId: 99,
            findInChildFolders: true,
            period: new Period_1.default()
        }));
    });
    it('SET_PAGINATOR', () => {
        const state = {
            paginator: new Paginator_1.default()
        };
        // When the SET_PAGINATOR mutation is called
        mutations_1.default.SET_PAGINATOR(state, new Paginator_1.default({
            pageNumber: 2,
            itemsPerPage: 10,
            totalItems: 0
        }));
        // Then paginator state must be equal to payload
        expect(state.paginator).toEqual(new Paginator_1.default({
            pageNumber: 2,
            itemsPerPage: 10,
            totalItems: 0
        }));
    });
    it('REMOVE_FOLDER', () => {
        const state = {
            folders: Folders_1.default.loaded([
                {
                    id: 1,
                    name: 'Compta',
                    parent: { id: 0 },
                    children: [
                        {
                            id: 2,
                            name: 'Achat',
                            parent: { id: 1 },
                            children: [],
                            properties: {},
                            permissions: []
                        }
                    ],
                    properties: {},
                    permissions: []
                }
            ])
        };
        // When the REMOVE_FOLDER mutation is called
        mutations_1.default.REMOVE_FOLDER(state, 2);
        // Then the folder must be deleted
        expect(state.folders).toEqual({
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
    it('PUSH_FOLDER', () => {
        const state = {
            folders: Folders_1.default.loaded([
                {
                    id: 1122,
                    name: 'Comptabilité',
                    parent: { id: 0 },
                    children: [],
                    permissions: [],
                    properties: {}
                }
            ])
        };
        // When the PUSH_FOLDER mutation is called
        mutations_1.default.PUSH_FOLDER(state, new Folder_1.default({
            id: 55,
            name: 'B',
            parent: { id: 1122 },
            children: [],
            permissions: [],
            properties: {}
        }));
        mutations_1.default.PUSH_FOLDER(state, new Folder_1.default({
            id: 66,
            name: 'a',
            parent: { id: 1122 },
            children: [],
            permissions: [],
            properties: {}
        }));
        // Then documents state must be equal to documents that was here before and the payload and in the correct order(sort)
        expect(state.folders).toEqual({
            collection: [
                {
                    id: 1122,
                    name: 'Comptabilité',
                    parentId: 0,
                    children: [
                        {
                            id: 66,
                            name: 'a',
                            parentId: 1122,
                            children: [],
                            permissions: [],
                            properties: {}
                        },
                        {
                            id: 55,
                            name: 'B',
                            parentId: 1122,
                            children: [],
                            permissions: [],
                            properties: {}
                        }
                    ],
                    permissions: [],
                    properties: {}
                }
            ],
            state: 'loaded'
        });
    });
    it('PUSH_FOLDER When folder exist already should not add', () => {
        const state = {
            folders: Folders_1.default.loaded([
                {
                    id: 1122,
                    name: 'Comptabilité',
                    parent: { id: 0 },
                    children: [],
                    permissions: [],
                    properties: {}
                }
            ])
        };
        // When the PUSH_FOLDER mutation is called
        mutations_1.default.PUSH_FOLDER(state, new Folder_1.default({
            id: 55,
            name: 'test',
            parent: { id: 1122 },
            children: [],
            permissions: [],
            properties: {}
        }));
        mutations_1.default.PUSH_FOLDER(state, new Folder_1.default({
            id: 55,
            name: 'test',
            parent: { id: 1122 },
            children: [],
            permissions: [],
            properties: {}
        }));
        // Then documents state must be equal to documents that was here before and the payload
        expect(state.folders).toEqual({
            collection: [
                {
                    id: 1122,
                    name: 'Comptabilité',
                    parentId: 0,
                    children: [
                        {
                            id: 55,
                            name: 'test',
                            parentId: 1122,
                            children: [],
                            permissions: [],
                            properties: {}
                        }
                    ],
                    permissions: [],
                    properties: {}
                }
            ],
            state: 'loaded'
        });
    });
    it('SET_PREVIEW', () => {
        const state = {
            previewDocumentImage: new Blob([''])
        };
        const newBlob = new Blob(['test']);
        mutations_1.default[mutations_1.SET_PREVIEW](state, newBlob);
        expect(state.previewDocumentImage).toBe(newBlob);
    });
    it('SET_PREVIEW_LOADING', () => {
        const state = {
            isPreviewLoading: false
        };
        mutations_1.default[mutations_1.SET_PREVIEW_LOADING](state, true);
        expect(state.isPreviewLoading).toBe(true);
    });
    it('SET_MULTIPLE_DOWNLOAD_LOADING', () => {
        const state = {
            multipleDownloadLoading: false
        };
        mutations_1.default[mutations_1.SET_MULTIPLE_DOWNLOAD_LOADING](state, true);
        expect(state.multipleDownloadLoading).toBe(true);
    });
    it('SET_IS_LOADING', () => {
        const state = {
            isDownloading: false
        };
        mutations_1.default[mutations_1.SET_IS_DOWNLOADING](state, true);
        expect(state.isDownloading).toBe(true);
    });
});
//# sourceMappingURL=mutations.spec.js.map