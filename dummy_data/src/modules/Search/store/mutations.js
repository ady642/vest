"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SET_VISUALIZATION = exports.SET_IS_DOWNLOADING = exports.SET_MULTIPLE_DOWNLOAD_LOADING = exports.SET_DOCUMENT_COMMENT = exports.SET_PREVIEW_LOADING = exports.SET_PREVIEW = exports.PUSH_FOLDER = exports.SET_SORT_OPTIONS = exports.REMOVE_FOLDER = exports.SET_PAGINATOR = exports.SET_FILTERS = exports.SET_FOLDERS = exports.SET_DOCUMENTS_TOTAL_COUNT = exports.PUSH_DOCUMENTS = exports.SET_DOCUMENTS = void 0;
const useArrayHelpers_1 = require("@/Common/hooks/useArrayHelpers");
exports.SET_DOCUMENTS = 'SET_DOCUMENTS';
exports.PUSH_DOCUMENTS = 'PUSH_DOCUMENTS';
exports.SET_DOCUMENTS_TOTAL_COUNT = 'SET_DOCUMENTS_TOTAL_COUNT';
exports.SET_FOLDERS = 'SET_FOLDERS';
exports.SET_FILTERS = 'SET_FILTERS';
exports.SET_PAGINATOR = 'SET_PAGINATOR';
exports.REMOVE_FOLDER = 'REMOVE_FOLDER';
exports.SET_SORT_OPTIONS = 'SET_SORT_OPTIONS';
exports.PUSH_FOLDER = 'PUSH_FOLDER';
exports.SET_PREVIEW = 'SET_PREVIEW';
exports.SET_PREVIEW_LOADING = 'SET_PREVIEW_LOADING';
exports.SET_DOCUMENT_COMMENT = 'SET_DOCUMENT_COMMENT';
exports.SET_MULTIPLE_DOWNLOAD_LOADING = 'SET_MULTIPLE_DOWNLOAD_LOADING';
exports.SET_IS_DOWNLOADING = 'SET_IS_DOWNLOADING';
exports.SET_VISUALIZATION = 'SET_VISUALIZATION';
const { sortArrayByAlphabeticalOrder } = (0, useArrayHelpers_1.default)();
exports.default = {
    [exports.SET_DOCUMENTS]: (state, documents) => {
        if (documents.isLoading) {
            state.documents.cancelToken = documents.cancelToken;
        }
        state.documents.state = documents.state;
        state.documents.collection = documents.collection;
    },
    [exports.SET_DOCUMENT_COMMENT]: (state, data) => {
        state.documents.updateDocumentComment(data.documentId, data.comment);
    },
    [exports.PUSH_DOCUMENTS]: (state, documents) => {
        if (documents.isLoading) {
            state.documents.cancelToken = documents.cancelToken;
        }
        state.documents.state = documents.state;
        state.documents.collection = [
            ...state.documents.collection,
            ...documents.collection
        ];
    },
    [exports.SET_DOCUMENTS_TOTAL_COUNT]: (state, documentsTotalCount) => {
        state.documentsTotalCount = documentsTotalCount;
    },
    [exports.SET_FOLDERS]: (state, folders) => {
        state.folders = folders;
    },
    [exports.SET_FILTERS]: (state, filters) => {
        state.filters = filters;
    },
    [exports.SET_PAGINATOR]: (state, paginator) => {
        state.paginator = paginator;
    },
    [exports.SET_SORT_OPTIONS]: (state, sortOptions) => {
        state.sortOptions = sortOptions;
    },
    [exports.PUSH_FOLDER]: (state, folder) => {
        let children = state.folders.getFolderById(folder.parentId ?? 0)?.children || [];
        if (!children.some((child) => child.id === folder.id)) {
            children.push(folder);
            children =
                children.length > 0
                    ? sortArrayByAlphabeticalOrder(children, 'name')
                    : [];
            state.folders.getFolderById(folder.parentId ?? 0)?.setChildren(children);
        }
    },
    [exports.REMOVE_FOLDER]: (state, folderIdToDelete) => {
        state.folders.removeFolder(folderIdToDelete);
    },
    [exports.SET_PREVIEW]: (state, preview) => {
        state.previewDocumentImage = preview;
    },
    [exports.SET_PREVIEW_LOADING]: (state, payload) => {
        state.isPreviewLoading = payload;
    },
    [exports.SET_MULTIPLE_DOWNLOAD_LOADING]: (state, payload) => {
        state.multipleDownloadLoading = payload;
    },
    [exports.SET_IS_DOWNLOADING]: (state, payload) => {
        state.isDownloading = payload;
    },
    [exports.SET_VISUALIZATION]: (state, payload) => {
        state.visualization = payload;
    }
};
//# sourceMappingURL=mutations.js.map