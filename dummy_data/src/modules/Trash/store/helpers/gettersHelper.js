"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("@/modules/Trash/store");
const vue_1 = require("vue");
const documents = (store) => (0, vue_1.computed)(() => store.getters[(0, store_1.trashModule)('documents')]);
const documentsTotalCount = (store) => (0, vue_1.computed)(() => store.getters[(0, store_1.trashModule)('documentsTotalCount')]);
const areAllDocumentsLoaded = (store) => (0, vue_1.computed)(() => store.getters[(0, store_1.trashModule)('areAllDocumentsLoaded')]);
const paginator = (store) => (0, vue_1.computed)(() => store.getters[(0, store_1.trashModule)('paginator')]);
const totalLoading = (store) => (0, vue_1.computed)(() => store.getters[(0, store_1.trashModule)('totalLoading')]);
const isFileRestoring = (store) => (0, vue_1.computed)(() => store.getters[(0, store_1.trashModule)('isFileRestoring')]);
const pendingList = (store) => (0, vue_1.computed)(() => store.getters[(0, store_1.trashModule)('pendingList')]);
const totalPendingRestoration = (store) => (0, vue_1.computed)(() => {
    return store.getters[(0, store_1.trashModule)('totalPendingRestoration')];
});
const isInPendingList = (store, trashDocumentId) => store.getters[(0, store_1.trashModule)('isInPendingList')](trashDocumentId);
const gettersHelpers = (store) => ({
    documents: () => documents(store),
    documentsTotalCount: () => documentsTotalCount(store),
    areAllDocumentsLoaded: () => areAllDocumentsLoaded(store),
    paginator: () => paginator(store),
    totalLoading: () => totalLoading(store),
    isFileRestoring: () => isFileRestoring(store),
    pendingList: () => pendingList(store),
    totalPendingRestoration: () => totalPendingRestoration(store),
    isInPendingList: (trashDocumentId) => isInPendingList(store, trashDocumentId)
});
exports.default = gettersHelpers;
//# sourceMappingURL=gettersHelper.js.map