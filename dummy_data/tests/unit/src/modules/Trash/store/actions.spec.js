"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("@/modules/Trash/services");
const TrashDocumentAPIMock_1 = require("../mocks/TrashDocumentAPIMock");
const actions_1 = require("@/modules/Trash/store/actions");
const TrashDocumentsPaginator_1 = require("@/modules/Trash/models/Query/TrashDocumentsPaginator");
const TrashDocuments_1 = require("@/modules/Trash/models/Inputs/TrashDocuments");
const createTrashStoreMock_1 = require("dummy_data/tests/unit/__mocks__/storeMock/createTrashStoreMock");
const TrashDocumentAPIMock_2 = require("../mocks/TrashDocumentAPIMock");
const constants_1 = require("@/Common/constants");
const mutations_1 = require("@/modules/Trash/store/mutations");
let commit = jest.fn();
let dispatch = jest.fn();
let storeMock = (0, createTrashStoreMock_1.createTrashStoreMock)();
const state = storeMock.state.GED.Trash;
const documentsData = TrashDocuments_1.default.loaded(TrashDocumentAPIMock_2.TrashDocumentAPILightMockList);
describe('trash-store-actions', () => {
    beforeEach(() => {
        storeMock = (0, createTrashStoreMock_1.createTrashStoreMock)();
        storeMock.state.GED.Trash.paginator = new TrashDocumentsPaginator_1.default({
            pageNumber: 1,
            itemsPerPage: 10,
            totalItems: 100
        });
        commit = jest.fn();
        dispatch = jest.fn();
        jest.spyOn(services_1.default, 'fetchTrashDocuments').mockReturnValue({
            data: TrashDocumentAPIMock_1.TrashDocumentAPIMockList,
            headers: {
                'content-range': 'documents 1-10/1000'
            }
        });
    });
    test('fetchTrashDocuments', async () => {
        await actions_1.default.fetchTrashDocuments({
            commit,
            dispatch,
            state: storeMock.state.GED.Trash,
            rootState: {
                app: {
                    account: {
                        AccountId: '75545'
                    }
                }
            }
        });
        expect(commit).toHaveBeenNthCalledWith(1, 'SET_TRASH_DOCUMENTS', {
            cancelToken: { cancel: expect.anything(), token: 'the cancel token' },
            collection: [],
            state: 'loading'
        });
        expect(commit).toHaveBeenNthCalledWith(2, 'SET_TRASH_DOCUMENTS', TrashDocuments_1.default.loaded(TrashDocumentAPIMock_1.TrashDocumentAPIMockList));
    });
    test('fetchTrashDocuments when exceptions', async () => {
        jest.clearAllMocks();
        jest.spyOn(services_1.default, 'fetchTrashDocuments').mockImplementation(() => {
            throw new Error('error');
        });
        await actions_1.default.fetchTrashDocuments({
            commit,
            dispatch,
            state: storeMock.state.GED.Trash,
            rootState: {
                app: {
                    account: {
                        AccountId: '75545'
                    }
                }
            }
        });
        expect(commit).toHaveBeenNthCalledWith(1, 'SET_TRASH_DOCUMENTS', {
            cancelToken: { cancel: expect.anything(), token: 'the cancel token' },
            collection: [],
            state: 'loading'
        });
        expect(commit).toHaveBeenNthCalledWith(2, 'SET_TRASH_DOCUMENTS', TrashDocuments_1.default.errored());
    });
    test('fetchTrashDocumentsTotalCount', async () => {
        await actions_1.default.fetchTrashDocumentsTotalCount({
            commit,
            rootState: {
                app: {
                    account: {
                        AccountId: '75545'
                    }
                }
            }
        });
        expect(commit).toHaveBeenCalledWith('SET_TRASH_DOCUMENTS_TOTAL_COUNT', 1000);
    });
    test('fetchTrashDocumentsTotalCount when exceptions', async () => {
        jest.clearAllMocks();
        jest.spyOn(services_1.default, 'fetchTrashDocuments').mockImplementation(() => {
            throw new Error('error');
        });
        const action = async () => await actions_1.default.fetchTrashDocumentsTotalCount({
            commit,
            rootState: {
                app: {
                    account: {
                        AccountId: '75545'
                    }
                }
            }
        });
        await expect(action()).rejects.toThrow('error');
    });
    test('setTrashPaginator', async () => {
        await actions_1.default.setTrashPaginator({
            commit
        }, new TrashDocumentsPaginator_1.default({
            pageNumber: 1,
            itemsPerPage: 10,
            totalItems: 100
        }));
        expect(commit).toHaveBeenCalledWith('SET_TRASH_PAGINATOR', {
            pageNumber: 1,
            itemsPerPage: 10,
            totalItems: 100
        });
    });
    describe('RestoreFile actions', () => {
        it('Should call RestoreFileServices.RestoreFile service', async () => {
            state.documents = documentsData;
            const document = documentsData.collection[0];
            // Given the service return no value
            jest
                .spyOn(services_1.default, 'restoreFile')
                .mockResolvedValue({ data: document.id });
            // When I call the restoreFileByModal action
            await actions_1.default.restoreFileByModal({
                state,
                commit,
                dispatch,
                rootState: {
                    app: {
                        account: {
                            AccountId: '75545'
                        }
                    }
                }
            }, 'cf28d738-8715-4d0f-b87e-2872f0d559ef');
            // Then
            expect(dispatch).toBeCalledWith('pushInRestorePendingList', document);
            expect(dispatch).toBeCalledWith('GED/Search/fetchFolders', null, {
                root: true
            });
            expect(services_1.default.restoreFile).toBeCalledWith('75545', 'cf28d738-8715-4d0f-b87e-2872f0d559ef');
            expect(commit).toHaveBeenCalledTimes(3);
            expect(commit).toHaveBeenCalledWith('SET_IS_FILE_RESTORING', true);
            expect(commit).toHaveBeenCalledWith('REMOVE_DOCUMENT_IN_PENDING_LIST', 'cf28d738-8715-4d0f-b87e-2872f0d559ef');
            expect(commit).toHaveBeenCalledWith('SET_IS_FILE_RESTORING', false);
        });
        it('Should set document status in pending list when error is prouced', async () => {
            state.documents = documentsData;
            // Given the service return no value
            jest.spyOn(services_1.default, 'restoreFile').mockImplementation(() => {
                throw new Error('bad-exception');
            });
            // When I call the restoreFileByModal action
            await actions_1.default.restoreFileByModal({
                state,
                commit,
                dispatch,
                rootState: {
                    app: {
                        account: {
                            AccountId: '75545'
                        }
                    }
                }
            }, 'cf28d738-8715-4d0f-b87e-2872f0d559ef');
            // Then
            expect(dispatch).toBeCalledWith('setPendingListDocumentStatus', {
                documentId: 'cf28d738-8715-4d0f-b87e-2872f0d559ef',
                status: constants_1.default.RESTORE_FAILED
            });
        });
    });
    describe('pushInRestorePendingList', () => {
        it('Should push document and set document status', async () => {
            await actions_1.default.pushInRestorePendingList({ state, commit }, documentsData.collection[0]);
            expect(commit).toBeCalledWith('SET_DOCUMENT_STATUS', {
                status: constants_1.default.RESTORE_IN_PROGRESS,
                documentId: documentsData.collection[0].id
            });
        });
    });
    describe('popFromRestorePendingList', () => {
        it('Should delete item from pendingList', async () => {
            state.pendingList = documentsData;
            await actions_1.default.removeFromPendingList({ commit }, 'cf28d738-8715-4d0f-b87e-2872f0d559ef');
            expect(commit).toHaveBeenCalledWith(mutations_1.REMOVE_DOCUMENT_IN_PENDING_LIST, 'cf28d738-8715-4d0f-b87e-2872f0d559ef');
        });
    });
    describe('setPendingListDocumentStatus', () => {
        it('Should commit SET_DOCUMENT_STATUS', async () => {
            storeMock = (0, createTrashStoreMock_1.createTrashStoreMock)();
            state.pendingList = documentsData;
            await actions_1.default.setPendingListDocumentStatus({ state, commit }, 'cf28d738-8715-4d0f-b87e-2872f0d559ef', constants_1.default.RESTORE_FAILED);
            expect(commit).toBeCalledWith('SET_DOCUMENT_STATUS', {
                status: constants_1.default.RESTORE_FAILED,
                documentId: 'cf28d738-8715-4d0f-b87e-2872f0d559ef'
            });
        });
    });
});
//# sourceMappingURL=actions.spec.js.map