"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("@/modules/Search/store");
const DocumentsFilters_1 = require("@/modules/Search/models/Documents/Query/DocumentsFilters");
const DocumentsPaginator_1 = require("@/modules/Search/models/Documents/Query/DocumentsPaginator");
const Period_1 = require("@/Common/models/List/Period");
const PatchCommentQuery_1 = require("@/modules/Search/models/Documents/Query/PatchCommentQuery");
const fetchDocuments = async (store) => {
    await store.dispatch((0, store_1.searchModule)('fetchDocuments'));
};
const fetchAndPushDocuments = async (store) => {
    await store.dispatch((0, store_1.searchModule)('fetchAndPushDocuments'));
};
const fetchDocumentsTotalCount = (store) => {
    store.dispatch((0, store_1.searchModule)('fetchDocumentsTotalCount'));
};
const setFilters = async (store, filters) => {
    await store.dispatch((0, store_1.searchModule)('setFilters'), filters);
};
const resetFilters = (store) => setFilters(store, new DocumentsFilters_1.default({
    search: '',
    folderId: store.state.GED.Search.filters.folderId,
    findInChildFolders: false,
    period: new Period_1.default(),
    certified: 'all'
}));
const setSearchFolderId = (store, { searchFolderId, findInChildFolders }) => {
    const newFilters = new DocumentsFilters_1.default({
        ...store.state.GED.Search.filters,
        folderId: searchFolderId,
        findInChildFolders: findInChildFolders ?? store.state.GED.Search.filters.findInChildFolders
    });
    setFilters(store, newFilters);
};
const setSearch = (store, search) => {
    const newFilters = new DocumentsFilters_1.default({
        ...store.state.GED.Search.filters,
        search
    });
    setFilters(store, newFilters);
};
const setPeriod = (store, period) => {
    const newFilters = new DocumentsFilters_1.default({
        ...store.state.GED.Search.filters,
        period
    });
    setFilters(store, newFilters);
};
const setCertified = async (store, certified) => {
    const newFilters = new DocumentsFilters_1.default(store.state.GED.Search.filters);
    newFilters.certified = certified;
    await setFilters(store, newFilters);
};
const setPaginator = (store, paginator) => {
    store.dispatch((0, store_1.searchModule)('setPaginator'), paginator);
};
const setSortOptions = (store, sortOptions) => {
    store.dispatch((0, store_1.searchModule)('setSortOptions'), sortOptions);
};
const setPage = (store, pageNumber) => {
    const newPaginator = new DocumentsPaginator_1.default({
        pageNumber,
        totalItems: store.getters[(0, store_1.searchModule)('paginator')].totalItems,
        itemsPerPage: store.getters[(0, store_1.searchModule)('paginator')].itemsPerPage
    });
    setPaginator(store, newPaginator);
};
const fetchFolders = (store) => {
    store.dispatch((0, store_1.searchModule)('fetchFolders'));
};
const pushFolder = (store, folder) => {
    store.dispatch((0, store_1.searchModule)('pushFolder'), folder);
};
const dispatchDownloadDocument = async (store, documentId, callDownloadService = true) => {
    await store.dispatch((0, store_1.searchModule)('downloadDocument'), {
        documentId,
        callDownloadService
    });
};
const dispatchDownloadDocuments = async (store, documentsIds) => {
    await store.dispatch((0, store_1.searchModule)('downloadDocuments'), documentsIds);
};
const flushDocumentsPromises = async (store) => {
    const promises = [fetchDocuments(store)];
    if (store.state.GED.Search.filters.search) {
        promises.push(fetchDocumentsTotalCount(store));
    }
    await Promise.all(promises);
};
const downloadPreview = async (store, documentId) => {
    await store.dispatch((0, store_1.searchModule)('downloadPreview'), documentId);
};
const downloadVisualization = async (store, documentId) => {
    await store.dispatch((0, store_1.searchModule)('downloadVisualization'), documentId);
};
const dispatchPatchDocumentComment = async (store, documentId, value) => {
    await store.dispatch((0, store_1.searchModule)('patchDocumentComment'), new PatchCommentQuery_1.default({ documentId, value }));
};
const resetVisualization = async (store) => {
    await store.dispatch((0, store_1.searchModule)('resetVisualization'));
};
const dispatchHelpers = () => ({
    fetchDocuments,
    fetchAndPushDocuments,
    fetchDocumentsTotalCount,
    flushDocumentsPromises,
    fetchFolders,
    dispatchDownloadDocument,
    setFilters,
    resetFilters,
    setSearch,
    setSearchFolderId,
    setCertified,
    setPaginator,
    setPage,
    setPeriod,
    pushFolder,
    setSortOptions,
    dispatchDownloadDocuments,
    dispatchPatchDocumentComment,
    downloadPreview,
    downloadVisualization,
    resetVisualization
});
exports.default = dispatchHelpers;
//# sourceMappingURL=dispatchHelpers.js.map