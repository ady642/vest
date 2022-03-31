"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REMOVE_DOCUMENT_IN_PENDING_LIST = exports.REMOVE_DOCUMENT = exports.SET_DOCUMENT_STATUS = exports.SET_IS_FILE_RESTORING = exports.SET_TOTAL_LOADING = exports.SET_TRASH_PAGINATOR = exports.SET_TRASH_DOCUMENTS_TOTAL_COUNT = exports.SET_TRASH_DOCUMENTS = void 0;
exports.SET_TRASH_DOCUMENTS = 'SET_TRASH_DOCUMENTS';
exports.SET_TRASH_DOCUMENTS_TOTAL_COUNT = 'SET_TRASH_DOCUMENTS_TOTAL_COUNT';
exports.SET_TRASH_PAGINATOR = 'SET_TRASH_PAGINATOR';
exports.SET_TOTAL_LOADING = 'SET_TOTAL_LOADING';
exports.SET_IS_FILE_RESTORING = 'SET_IS_FILE_RESTORING';
exports.SET_DOCUMENT_STATUS = 'SET_DOCUMENT_STATUS';
exports.REMOVE_DOCUMENT = 'REMOVE_DOCUMENT';
exports.REMOVE_DOCUMENT_IN_PENDING_LIST = 'REMOVE_DOCUMENT_IN_PENDING_LIST';
exports.default = {
    [exports.SET_TRASH_DOCUMENTS]: (state, documents) => {
        if (documents.isLoading) {
            state.documents.cancelToken = documents.cancelToken;
        }
        state.documents.state = documents.state;
        state.documents.collection = documents.collection;
    },
    [exports.SET_TRASH_DOCUMENTS_TOTAL_COUNT]: (state, documentsTotalCount) => {
        state.documentsTotalCount = documentsTotalCount;
    },
    [exports.SET_TRASH_PAGINATOR]: (state, paginator) => {
        state.paginator = paginator;
    },
    [exports.SET_TOTAL_LOADING]: (state, isLoading) => {
        state.totalLoading = isLoading;
    },
    [exports.SET_IS_FILE_RESTORING](state, payload) {
        state.isFileRestoring = payload;
    },
    [exports.SET_DOCUMENT_STATUS](state, payload) {
        const document = state.pendingList.collection.find((x) => x.id === payload.documentId);
        if (document) {
            document.restorationStatus = payload.status;
        }
    },
    [exports.REMOVE_DOCUMENT_IN_PENDING_LIST](state, documentId) {
        if (!documentId) {
            console.error('Document Id cant be empty');
            return;
        }
        state.pendingList.collection = state.pendingList.collection.filter((document) => document.id !== documentId);
    }
};
//# sourceMappingURL=mutations.js.map