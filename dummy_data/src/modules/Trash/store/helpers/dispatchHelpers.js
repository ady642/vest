"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("@/modules/Trash/store");
const TrashDocumentsPaginator_1 = require("@/modules/Trash/models/Query/TrashDocumentsPaginator");
const fetchTrashDocuments = async (store) => {
    await store.dispatch((0, store_1.trashModule)('fetchTrashDocuments'));
};
const fetchAndPushTrashDocuments = (store) => {
    store.dispatch((0, store_1.trashModule)('fetchAndPushTrashDocuments'));
};
const fetchTrashDocumentsTotalCount = (store) => {
    store.dispatch((0, store_1.trashModule)('fetchTrashDocumentsTotalCount'));
};
const removeFromPendingList = (store, documentId) => {
    store.dispatch((0, store_1.trashModule)('removeFromPendingList'), documentId);
};
const setTrashPaginator = (store, paginator) => {
    store.dispatch((0, store_1.trashModule)('setTrashPaginator'), paginator);
};
const setPage = (store, pageNumber) => {
    const newPaginator = new TrashDocumentsPaginator_1.default({
        pageNumber,
        totalItems: store.getters[(0, store_1.trashModule)('paginator')].totalItems,
        itemsPerPage: store.getters[(0, store_1.trashModule)('paginator')].itemsPerPage
    });
    setTrashPaginator(store, newPaginator);
};
const flushTrashDocumentsPromises = async (store) => {
    const promises = [fetchTrashDocuments(store)];
    await Promise.all(promises);
};
const setRestoreNotification = (store, notification) => {
    store.dispatch((0, store_1.trashModule)('setRestoreNotification'), notification);
};
const closeRestoreNotification = (store) => {
    store.dispatch((0, store_1.trashModule)('closeRestoreNotification'));
};
const cancelFilesRestore = (store) => {
    store.dispatch((0, store_1.trashModule)('cancelFilesRestore'));
};
const restoreFileByModal = async (store, documentId) => {
    await store.dispatch((0, store_1.trashModule)('restoreFileByModal'), documentId);
};
const pushInPendingList = (store, document) => {
    store.dispatch((0, store_1.trashModule)('pushInRestorePendingList'), document);
};
const setPendingListDocumentStatus = (store, documentId, status) => {
    store.dispatch((0, store_1.trashModule)('setPendingListDocumentStatus'), {
        documentId,
        status
    });
};
const dispatchHelpers = (store) => ({
    fetchTrashDocuments: () => fetchTrashDocuments(store),
    fetchAndPushTrashDocuments: () => fetchAndPushTrashDocuments(store),
    fetchTrashDocumentsTotalCount: () => fetchTrashDocumentsTotalCount(store),
    setTrashPaginator: (paginator) => setTrashPaginator(store, paginator),
    flushTrashDocumentsPromises: () => flushTrashDocumentsPromises(store),
    setPage: (pageNumber) => setPage(store, pageNumber),
    restoreFileByModal: (documentId) => restoreFileByModal(store, documentId),
    setRestoreNotification,
    closeRestoreNotification,
    cancelFilesRestore,
    pushInPendingList,
    setPendingListDocumentStatus,
    removeFromPendingList: (documentId) => removeFromPendingList(store, documentId)
});
exports.default = dispatchHelpers;
//# sourceMappingURL=dispatchHelpers.js.map