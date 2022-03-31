"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("@/modules/Trash/services");
const TrashDocumentsQueryAPI_1 = require("../models/Query/TrashDocumentsQueryAPI");
const TrashDocuments_1 = require("../models/Inputs/TrashDocuments");
const mutations_1 = require("./mutations");
const TrashDocumentsPaginator_1 = require("../models/Query/TrashDocumentsPaginator");
const TrashSortOptions_1 = require("../models/Query/TrashSortOptions");
const store_1 = require("@/modules/Search/store");
const constants_1 = require("@/Common/constants");
const RestoreNotificationHelper_1 = require("@/modules/Trash/helpers/RestoreNotificationHelper");
const mypulse_shared_dependencies_1 = require("@kpmg/mypulse-shared-dependencies");
const useSearchNavigator_1 = require("@/modules/Search/navigator/useSearchNavigator");
const fetchTrashDocuments = async ({ commit, dispatch, state: { paginator, sortOptions }, rootState }) => {
    const cancelToken = mypulse_shared_dependencies_1.axios.CancelToken.source();
    commit(mutations_1.SET_TRASH_DOCUMENTS, TrashDocuments_1.default.loading(cancelToken));
    try {
        const documentsQuery = new TrashDocumentsQueryAPI_1.default({
            paginator,
            sortOptions
        });
        const { data, headers } = await services_1.default.fetchTrashDocuments(rootState.app.account.AccountId, documentsQuery.transformForAPI(), cancelToken);
        const total = headers['content-range'].split(/\//)[1];
        paginator.setTotalItems(total);
        await dispatch('setTrashPaginator', paginator);
        commit(mutations_1.SET_TRASH_DOCUMENTS, TrashDocuments_1.default.loaded(data));
    }
    catch (e) {
        if (e.message) {
            commit(mutations_1.SET_TRASH_DOCUMENTS, TrashDocuments_1.default.errored());
        }
    }
};
const fetchTrashDocumentsTotalCount = async ({ commit, rootState }) => {
    try {
        commit('SET_TOTAL_LOADING', true);
        const documentsQuery = new TrashDocumentsQueryAPI_1.default({
            paginator: new TrashDocumentsPaginator_1.default({
                itemsPerPage: 1,
                pageNumber: 1,
                totalItems: 1
            }),
            sortOptions: new TrashSortOptions_1.default()
        });
        const { headers } = await services_1.default.fetchTrashDocuments(rootState.app.account.AccountId, documentsQuery.transformForAPI());
        const total = headers['content-range'].split(/\//)[1];
        commit(mutations_1.SET_TRASH_DOCUMENTS_TOTAL_COUNT, Number(total));
    }
    catch (e) {
        throw new Error(e);
    }
    finally {
        commit('SET_TOTAL_LOADING', false);
    }
};
const setTrashPaginator = ({ commit }, paginatorNewValue) => {
    commit(mutations_1.SET_TRASH_PAGINATOR, paginatorNewValue);
};
const setRestoreNotification = ({ state }, notification) => {
    state.restoreNotification = notification;
};
const closeRestoreNotification = ({ state }) => {
    if (state.restoreNotification.close)
        state.restoreNotification.close();
};
const restoreFileByModal = async ({ state, commit, dispatch, rootState }, documentId) => {
    try {
        while (state.documents.isLoading) {
            await new Promise((resolve) => setTimeout(resolve, 500));
        }
        commit(mutations_1.SET_IS_FILE_RESTORING, true);
        const document = state.documents.collection.find((documents) => documents.id === documentId);
        await dispatch('pushInRestorePendingList', document);
        const { getPendingRestoreNotification, getSuccessRestoreNotification, getFailedRestoreNotification } = (0, RestoreNotificationHelper_1.default)();
        let folderId = 0;
        const { goToArboView } = (0, useSearchNavigator_1.default)();
        if (!state.restoreNotification.close) {
            state.restoreNotification = getPendingRestoreNotification(state.pendingList, document, () => {
                goToArboView({ folderId });
            }, () => {
                dispatch('closeRestoreNotification');
            });
        }
        try {
            const restoredDocument = (await services_1.default.restoreFile(rootState.app.account.AccountId, documentId)).data[0];
            folderId = restoredDocument.folderId;
            if (state.pendingList.collection.length === 1) {
                if (state.restoreNotification.close) {
                    state.restoreNotification.close();
                    state.restoreNotification = {};
                }
            }
            const success = getSuccessRestoreNotification(state.pendingList, document, () => goToArboView({ folderId }), () => {
                success.close();
            });
            await dispatch((0, store_1.searchModule)('fetchFolders'), null, { root: true });
            commit(mutations_1.REMOVE_DOCUMENT_IN_PENDING_LIST, documentId);
        }
        catch (x) {
            await dispatch('setPendingListDocumentStatus', {
                documentId: documentId,
                status: constants_1.default.RESTORE_FAILED
            });
            const failed = getFailedRestoreNotification(state.pendingList, document, () => goToArboView({ folderId }), () => {
                failed.close();
            });
        }
    }
    finally {
        commit(mutations_1.SET_IS_FILE_RESTORING, false);
    }
};
const pushInRestorePendingList = ({ state, commit }, document) => {
    if (!state.pendingList.collection.find((x) => x.id === document.id))
        state.pendingList.collection.push(document);
    commit(mutations_1.SET_DOCUMENT_STATUS, {
        status: constants_1.default.RESTORE_IN_PROGRESS,
        documentId: document.id
    });
};
const removeFromPendingList = ({ commit }, documentId) => {
    commit(mutations_1.REMOVE_DOCUMENT_IN_PENDING_LIST, documentId);
};
const setPendingListDocumentStatus = ({ state, commit }, documentId, status) => {
    if (state.pendingList.collection.find((x) => x.id === documentId))
        commit(mutations_1.SET_DOCUMENT_STATUS, {
            status: status,
            documentId: documentId
        });
};
exports.default = {
    fetchTrashDocuments,
    fetchTrashDocumentsTotalCount,
    setTrashPaginator,
    setRestoreNotification,
    closeRestoreNotification,
    restoreFileByModal,
    pushInRestorePendingList,
    setPendingListDocumentStatus,
    removeFromPendingList
};
//# sourceMappingURL=actions.js.map