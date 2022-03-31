"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("@/Common/constants");
const documents = (state) => state.documents;
const documentsTotalCount = (state) => state.documentsTotalCount;
const totalLoading = (state) => state.totalLoading;
const areAllDocumentsLoaded = (state) => state.documents.collection.length === state.paginator.totalItems;
const paginator = (state) => state.paginator;
const isFileRestoring = (state) => state.isFileRestoring;
const pendingList = (state) => state.pendingList;
const totalPendingRestoration = (state) => state.pendingList.collection.filter((doc) => doc.restorationStatus === constants_1.default.RESTORE_IN_PROGRESS).length;
const isInPendingList = (state) => (trashDocumentId) => {
    const trashDocumentInPendingList = state.pendingList.collection.find((doc) => doc.id === trashDocumentId);
    if (!trashDocumentInPendingList) {
        return false;
    }
    return (trashDocumentInPendingList.restorationStatus ===
        constants_1.default.RESTORE_IN_PROGRESS);
};
exports.default = {
    documents,
    documentsTotalCount,
    totalLoading,
    areAllDocumentsLoaded,
    paginator,
    isFileRestoring,
    pendingList,
    totalPendingRestoration,
    isInPendingList
};
//# sourceMappingURL=getters.js.map