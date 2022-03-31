"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const documents = (state) => state.documents;
const documentsTotalCount = (state) => state.documentsTotalCount;
const areAllDocumentsLoaded = (state) => state.documents.collection.length === state.paginator.totalItems;
const folders = (state) => state.folders;
const filters = (state) => state.filters;
const paginator = (state) => state.paginator;
const sortOptions = (state) => state.sortOptions;
const searchActive = (state) => state.filters.search.length > 0;
const activeFiltersCount = (state) => state.filters.GetActiveFiltersCount();
const areAnyFilters = (state) => state.filters.areAnyFilters;
const previewDocumentImage = (state) => state.previewDocumentImage;
const isPreviewLoading = (state) => state.isPreviewLoading;
const multipleDownloadLoading = (state) => state.multipleDownloadLoading;
const isDownloading = (state) => state.isDownloading;
const visualization = (state) => state.visualization;
exports.default = {
    documents,
    documentsTotalCount,
    areAllDocumentsLoaded,
    folders,
    filters,
    paginator,
    sortOptions,
    searchActive,
    activeFiltersCount,
    previewDocumentImage,
    isPreviewLoading,
    multipleDownloadLoading,
    isDownloading,
    areAnyFilters,
    visualization
};
//# sourceMappingURL=getters.js.map