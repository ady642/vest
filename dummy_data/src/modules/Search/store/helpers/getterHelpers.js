"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const store_1 = require("@/modules/Search/store");
const documents = (store) => (0, vue_1.computed)(() => store.getters[(0, store_1.searchModule)('documents')]);
const documentsTotalCount = (store) => (0, vue_1.computed)(() => store.getters[(0, store_1.searchModule)('documentsTotalCount')]);
const areAllDocumentsLoaded = (store) => (0, vue_1.computed)(() => store.getters[(0, store_1.searchModule)('areAllDocumentsLoaded')]);
const folders = (store) => (0, vue_1.computed)(() => store.getters[(0, store_1.searchModule)('folders')]);
const filters = (store) => (0, vue_1.computed)(() => store.getters[(0, store_1.searchModule)('filters')]);
const paginator = (store) => (0, vue_1.computed)(() => store.getters[(0, store_1.searchModule)('paginator')]);
const sortOptions = (store) => (0, vue_1.computed)(() => store.getters[(0, store_1.searchModule)('sortOptions')]);
const accountId = (store) => (0, vue_1.computed)(() => store.getters['app/account']);
const searchFolderId = (store) => (0, vue_1.computed)(() => filters(store).value.folderId);
const getActiveFiltersCount = (store) => (0, vue_1.computed)(() => store.getters[(0, store_1.searchModule)('activeFiltersCount')]);
const searchActive = (store) => (0, vue_1.computed)(() => store.getters[(0, store_1.searchModule)('searchActive')]);
const getPreviewDocumentImage = (store) => (0, vue_1.computed)(() => store.getters[(0, store_1.searchModule)('previewDocumentImage')]);
const isPreviewLoading = (store) => (0, vue_1.computed)(() => store.getters[(0, store_1.searchModule)('isPreviewLoading')]);
const isMultipleDownloadLoading = (store) => (0, vue_1.computed)(() => store.getters[(0, store_1.searchModule)('multipleDownloadLoading')]);
const isDownloading = (store) => (0, vue_1.computed)(() => store.getters[(0, store_1.searchModule)('isDownloading')]);
const areAnyFilters = (store) => (0, vue_1.computed)(() => store.getters[(0, store_1.searchModule)('areAnyFilters')]);
const visualization = (store) => (0, vue_1.computed)(() => store.getters[(0, store_1.searchModule)('visualization')]);
const gettersHelpers = () => ({
    documents,
    documentsTotalCount,
    areAllDocumentsLoaded,
    accountId,
    folders,
    filters,
    paginator,
    sortOptions,
    searchFolderId,
    getActiveFiltersCount,
    searchActive,
    getPreviewDocumentImage,
    isPreviewLoading,
    isMultipleDownloadLoading,
    isDownloading,
    areAnyFilters,
    visualization
});
exports.default = gettersHelpers;
//# sourceMappingURL=getterHelpers.js.map