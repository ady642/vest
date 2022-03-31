"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_1 = require("@/modules/Search/store/actions");
const services_1 = require("@/modules/Search/services");
const DocumentsFilters_1 = require("@/modules/Search/models/Documents/Query/DocumentsFilters");
const DocumentsPaginator_1 = require("@/modules/Search/models/Documents/Query/DocumentsPaginator");
const DocumentsSortOptions_1 = require("@/modules/Search/models/Documents/Query/DocumentsSortOptions");
const DocumentAPIMock_1 = require("../../mocks/DocumentAPIMock");
const Documents_1 = require("@/modules/Search/models/Documents/Inputs/Documents");
const Folders_1 = require("@/modules/Search/models/Folders/Inputs/Folders");
const Paginator_1 = require("@/Common/models/List/Paginator");
const Period_1 = require("@/Common/models/List/Period");
const constants_1 = require("@/Common/constants");
const PatchCommentQuery_1 = require("@/modules/Search/models/Documents/Query/PatchCommentQuery");
const documentsActions_1 = require("@/modules/Search/store/actions/documentsActions");
const Document_1 = require("@/modules/Search/models/Documents/Inputs/Document");
let commit = jest.fn();
const dispatch = jest.fn();
const state = {
    folders: Folders_1.default.loaded([]),
    documents: Documents_1.default.loaded([
        { id: 'testId', name: 'testName' }
    ]),
    documentsTotalCount: 205,
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
describe('DocumentsActions', () => {
    beforeEach(() => {
        commit = jest.fn();
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('fetchDocuments action', () => {
        const cleanDocumentsCases = [
            { cleanDocuments: true, documentMutation: 'SET_DOCUMENTS' },
            { cleanDocuments: false, documentMutation: 'PUSH_DOCUMENTS' }
        ];
        test.each(cleanDocumentsCases)('should call the fetchDocuments services and WHEN RESOLVED commit the result', async ({ cleanDocuments, documentMutation }) => {
            // Given the service return a resolved value
            jest.spyOn(services_1.default, 'fetchDocuments').mockReturnValue({
                data: [DocumentAPIMock_1.documentAPIMock],
                headers: {
                    'content-range': 'documents 1-10/1000'
                }
            });
            // When I call the fetchDocuments action
            await actions_1.default.fetchDocuments({
                rootState,
                commit,
                dispatch,
                state
            }, cleanDocuments);
            // Then fetchDocuments service must be called
            expect(services_1.default.fetchDocuments).toHaveBeenCalledWith({
                skip: 10,
                limit: 10,
                accountNumberOrId: '1001',
                search: 'ss',
                findInChildFolders: true,
                folderId: 99,
                sort: '+date',
                certified: undefined
            }, { cancel: expect.anything(), token: 'the cancel token' });
            expect(commit).toHaveBeenNthCalledWith(1, documentMutation, {
                collection: [],
                state: 'loading',
                cancelToken: { cancel: expect.anything(), token: 'the cancel token' }
            });
            expect(dispatch).toHaveBeenNthCalledWith(1, 'setPaginator', {
                pageNumber: 2,
                itemsPerPage: 10,
                totalItems: 1000
            });
            expect(commit).toHaveBeenNthCalledWith(2, documentMutation, {
                collection: [
                    {
                        comments: 'je suis le bilan comptable',
                        createdBy: '',
                        id: 'myID',
                        folderId: 45454,
                        name: 'Mon bilan comptable',
                        creationDate: '2018-05-27',
                        path: [],
                        properties: {
                            syncStatus: constants_1.default.PENDING_SYNC,
                            hasSubscribedToVault: false
                        },
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
        it('should call the fetchDocuments services and WHEN the request is canceled DONT commit errored result', async () => {
            jest.spyOn(services_1.default, 'fetchDocuments').mockImplementation(() => {
                throw new Error(); // Error without message
            });
            await actions_1.default.fetchDocuments({
                rootState,
                commit,
                dispatch,
                state
            });
            expect(commit).not.toHaveBeenNthCalledWith(2, 'SET_DOCUMENTS', {
                collection: [],
                state: 'errored'
            });
        });
        it('should call the fetchDocuments services and WHEN there is an exception commit errored result', async () => {
            jest.spyOn(services_1.default, 'fetchDocuments').mockImplementation(() => {
                throw new Error('special one');
            });
            await actions_1.default.fetchDocuments({
                rootState,
                commit,
                dispatch,
                state
            });
            expect(services_1.default.fetchDocuments).toHaveBeenCalledWith({
                skip: 10,
                limit: 10,
                accountNumberOrId: '1001',
                findInChildFolders: true,
                folderId: 99,
                search: 'ss',
                sort: '+date'
            }, { cancel: expect.anything(), token: 'the cancel token' });
            expect(commit).toHaveBeenNthCalledWith(1, 'SET_DOCUMENTS', {
                collection: [],
                state: 'loading',
                cancelToken: { cancel: expect.anything(), token: 'the cancel token' }
            });
            expect(commit).toHaveBeenNthCalledWith(2, 'SET_DOCUMENTS', {
                collection: [],
                state: 'errored'
            });
        });
    });
    describe('fetchAndPushDocuments', () => {
        it('should dispatch fetchDocuments with cleanDocuments at false', () => {
            actions_1.default.fetchAndPushDocuments({
                dispatch
            });
            expect(dispatch).toHaveBeenNthCalledWith(1, 'fetchDocuments', false);
        });
    });
    describe('setFilters', () => {
        it('should make changes and commit SET_FILTERS', () => {
            actions_1.default.setFilters({
                commit,
                state
            }, new DocumentsFilters_1.default({
                search: 'ss',
                folderId: 99,
                findInChildFolders: true,
                period: new Period_1.default()
            }));
            expect(commit).toHaveBeenNthCalledWith(1, 'SET_FILTERS', new DocumentsFilters_1.default({
                search: 'ss',
                folderId: 99,
                findInChildFolders: true,
                period: new Period_1.default()
            }));
        });
    });
    describe('setSortOptions', () => {
        it('should make changes and commit SET_SORT_OPTIONS', () => {
            actions_1.default.setSortOptions({
                commit
            }, new DocumentsSortOptions_1.default({
                sortBy: 'date',
                sortDirection: 'ascending'
            }));
            expect(commit).toHaveBeenNthCalledWith(1, 'SET_SORT_OPTIONS', new DocumentsSortOptions_1.default({
                sortBy: 'date',
                sortDirection: 'ascending'
            }));
        });
    });
    describe('setPaginator', () => {
        it('should make changes and commit SET_PAGINATOR', () => {
            actions_1.default.setPaginator({ commit }, new Paginator_1.default({
                pageNumber: 2,
                itemsPerPage: 10,
                totalItems: 0
            }));
            expect(commit).toHaveBeenNthCalledWith(1, 'SET_PAGINATOR', new Paginator_1.default({
                pageNumber: 2,
                itemsPerPage: 10,
                totalItems: 0
            }));
        });
    });
    describe('downloadDocument', () => {
        it('service resolved', async () => {
            // Given the downloadDocument service return a base64 file (string)
            jest
                .spyOn(services_1.default, 'downloadDocument')
                .mockResolvedValue({ data: 'test' });
            jest.mock('@/Common/hooks/useDownload', () => ({
                downloadFile: jest.fn()
            }));
            // When I call the downloadDocument action
            await actions_1.default.downloadDocument({
                state,
                rootState,
                commit
            }, 'testId');
            // Then the downloadDocument service must have been called and the downloaded document must be commited
            expect(commit).toHaveBeenNthCalledWith(1, 'SET_IS_DOWNLOADING', true);
            expect(services_1.default.downloadDocument).toHaveBeenCalledWith({
                accountId: '1001',
                documentId: 'testId'
            });
            expect(commit).toHaveBeenNthCalledWith(2, 'SET_IS_DOWNLOADING', false);
        });
    });
    describe('downloadDocuments', () => {
        it('service resolved', async () => {
            // Given the downloadDocuments service return a base64 file (string)
            jest
                .spyOn(services_1.default, 'downloadDocuments')
                .mockResolvedValue({ data: 'test' });
            jest.mock('@/Common/helpers/downloadDocumentsHelper', () => ({
                DownloadAsZip: jest.fn()
            }));
            // When I call the downloadDocument action
            await actions_1.default.downloadDocuments({
                rootState,
                commit
            }, ['testId']);
            // Then the downloadDocument service must have been called
            expect(commit).toHaveBeenNthCalledWith(1, 'SET_MULTIPLE_DOWNLOAD_LOADING', true);
            expect(services_1.default.downloadDocuments).toHaveBeenCalledWith('1001', [
                'testId'
            ]);
            expect(commit).toHaveBeenNthCalledWith(2, 'SET_MULTIPLE_DOWNLOAD_LOADING', false);
        });
    });
    describe('fetchDocumentsTotalCount', () => {
        it('should call the fetchDocuments services and WHEN RESOLVED commit the total', async () => {
            // Given the service return a resolved value
            jest.spyOn(services_1.default, 'fetchDocuments').mockReturnValue({
                data: [DocumentAPIMock_1.documentAPIMock],
                headers: {
                    'content-range': 'documents 1-10/2754'
                }
            });
            // When I call the fetchDocumentsTotalCount action
            await actions_1.default.fetchDocumentsTotalCount({
                rootState,
                commit,
                dispatch,
                state
            });
            // Then fetchDocuments service must be called
            expect(services_1.default.fetchDocuments).toHaveBeenCalledWith({
                search: 'ss',
                skip: 0,
                limit: 1,
                accountNumberOrId: '1001',
                sort: '-updated'
            });
            expect(commit).toHaveBeenNthCalledWith(1, 'SET_DOCUMENTS_TOTAL_COUNT', 2754);
        });
    });
    describe('patchDocumentComment', () => {
        it('service resolved', async () => {
            jest
                .spyOn(services_1.default, 'patchDocument')
                .mockResolvedValue({ data: 'test' });
            // When I call the downloadDocument action
            await actions_1.default.patchDocumentComment({
                rootState,
                commit
            }, new PatchCommentQuery_1.default({
                documentId: 'tgh',
                value: 'some value'
            }));
            // Then the downloadDocument service must have been called and the downloaded document must be commited
            expect(services_1.default.patchDocument).toHaveBeenCalledWith({
                accountId: '1001',
                documentId: 'tgh',
                operation: 'replace',
                path: '/comments',
                value: 'some value'
            });
        });
    });
    describe('downloadPreview', () => {
        it('when API return 200', async () => {
            jest.spyOn(services_1.default, 'downloadPreview').mockResolvedValue({
                data: 'test',
                headers: { 'content-type': 'head' }
            });
            await documentsActions_1.default.downloadPreview({ commit, rootState }, '27');
            expect(commit).toHaveBeenNthCalledWith(1, 'SET_PREVIEW_LOADING', true);
            expect(services_1.default.downloadPreview).toHaveBeenCalledWith({
                accountId: '1001',
                documentId: '27'
            });
            expect(commit).toHaveBeenNthCalledWith(2, 'SET_PREVIEW', 'data:head;base64,');
            expect(commit).toHaveBeenNthCalledWith(3, 'SET_PREVIEW_LOADING', false);
        });
        it('When API throw exception', async () => {
            jest
                .spyOn(services_1.default, 'downloadPreview')
                .mockRejectedValue(new Error('400'));
            await documentsActions_1.default.downloadPreview({ commit, rootState }, '27');
            expect(commit).toHaveBeenNthCalledWith(1, 'SET_PREVIEW_LOADING', true);
            expect(services_1.default.downloadPreview).toHaveBeenCalledWith({
                accountId: '1001',
                documentId: '27'
            });
            expect(commit).toHaveBeenNthCalledWith(2, 'SET_PREVIEW', null);
            expect(commit).toHaveBeenNthCalledWith(3, 'SET_PREVIEW_LOADING', false);
        });
    });
});
//# sourceMappingURL=documentsActions.spec.js.map