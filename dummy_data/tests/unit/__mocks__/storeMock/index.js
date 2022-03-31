"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSearchStoreMocked = exports.createDeleteFileStoreMocked = exports.createFolderStoreMocked = exports.createDeleteFolderStoreMocked = void 0;
const vuex_1 = require("vuex");
const store_1 = require("@/modules/Search/store");
const store_2 = require("@/modules/DataManipulation/store");
const Folders_1 = require("@/modules/Search/models/Folders/Inputs/Folders");
const FoldersDataMock_1 = require("dummy_data/tests/unit/src/modules/Search/mocks/FoldersDataMock");
const Documents_1 = require("@/modules/Search/models/Documents/Inputs/Documents");
const DocumentsPaginator_1 = require("@/modules/Search/models/Documents/Query/DocumentsPaginator");
const DocumentsFilters_1 = require("@/modules/Search/models/Documents/Query/DocumentsFilters");
const DocumentsSortOptions_1 = require("@/modules/Search/models/Documents/Query/DocumentsSortOptions");
const createDeleteFolderStoreMocked = ({ hasPermissionToDeleteFolder = false, isFolderDeletable = false } = {}) => (0, vuex_1.createStore)({
    modules: {
        GED: {
            namespaced: true,
            modules: {
                DataManipulation: {
                    namespaced: true,
                    modules: {
                        DeleteFolders: {
                            namespaced: true,
                            actions: {
                                deleteFolderByModal: jest.fn()
                            },
                            getters: {
                                hasPermissionToDeleteFolder: (state, getters, rootState, rootGetters) => (folderId) => hasPermissionToDeleteFolder,
                                isFolderDeletable: (state, getters, rootState, rootGetters) => (folderIdToDelete) => isFolderDeletable
                            }
                        }
                    }
                }
            }
        }
    }
});
exports.createDeleteFolderStoreMocked = createDeleteFolderStoreMocked;
const createFolderStoreMocked = ({ hasPermissionToAddFolder = true, isCreatingFolder = false, folders = (0, FoldersDataMock_1.default)().FoldersData, createFolder = jest.fn() } = {}) => (0, vuex_1.createStore)({
    modules: {
        GED: {
            namespaced: true,
            modules: {
                DataManipulation: {
                    namespaced: true,
                    modules: {
                        CreateFolder: {
                            namespaced: true,
                            actions: {
                                CreateFolder: createFolder
                            },
                            getters: {
                                folders: () => folders,
                                hasPermissionToAddFolder: (state, getters, rootState, rootGetters) => (folderId) => hasPermissionToAddFolder,
                                isCreatingFolder: () => isCreatingFolder
                            }
                        }
                    }
                },
                Search: store_1.default
            }
        }
    }
});
exports.createFolderStoreMocked = createFolderStoreMocked;
const createDeleteFileStoreMocked = ({ isFileDeletable = false, isFileDeleting = false, areDocumentsDeletable = false, previewDocumentImage = 'columbo.png' } = {}) => (0, vuex_1.createStore)({
    modules: {
        GED: {
            namespaced: true,
            modules: {
                Search: {
                    namespaced: true,
                    actions: {
                        fetchDocuments: jest.fn(),
                        downloadDocument: jest.fn()
                    },
                    getters: {
                        ...store_1.default.getters,
                        previewDocumentImage: () => previewDocumentImage
                    }
                },
                DataManipulation: {
                    namespaced: true,
                    modules: {
                        DeleteFile: {
                            namespaced: true,
                            actions: {
                                deleteFile: jest.fn(),
                                deleteFiles: jest.fn()
                            },
                            getters: {
                                isFileDeletable: (state, getters, rootState, rootGetters) => (documentIdToDelete) => isFileDeletable,
                                isFileDeleting: () => isFileDeleting,
                                areDocumentsDeletable: () => () => areDocumentsDeletable
                            }
                        }
                    }
                }
            }
        }
    }
});
exports.createDeleteFileStoreMocked = createDeleteFileStoreMocked;
const createSearchStoreMocked = ({ documents = Documents_1.default.loaded([]), folders = Folders_1.default.loaded([]), paginator = new DocumentsPaginator_1.default(), searchActive = false, activeFiltersCount = 0, documentsTotalCount = 0, filters = new DocumentsFilters_1.default(), sortOptions = new DocumentsSortOptions_1.default(), areAllDocumentsLoaded = false, previewDocumentImage = 'test', multipleDownloadLoading = false, isDownloading = false, areAnyFilters = false, isPreviewLoading = false } = {}) => (0, vuex_1.createStore)({
    modules: {
        GED: {
            namespaced: true,
            modules: {
                Search: {
                    ...store_1.default,
                    state: {
                        ...store_1.default.state,
                        documents,
                        documentsTotalCount,
                        folders,
                        filters,
                        sortOptions,
                        paginator
                    },
                    getters: {
                        ...store_1.default.getters,
                        folders: () => folders,
                        searchActive: () => searchActive,
                        activeFiltersCount: () => activeFiltersCount,
                        documents: () => documents,
                        paginator: () => paginator,
                        documentsTotalCount: () => documentsTotalCount,
                        filters: () => filters,
                        sortOptions: () => sortOptions,
                        areAllDocumentsLoaded: () => areAllDocumentsLoaded,
                        previewDocumentImage: () => previewDocumentImage,
                        multipleDownloadLoading: () => multipleDownloadLoading,
                        isDownloading: () => isDownloading,
                        areAnyFilters: () => areAnyFilters,
                        isPreviewLoading: () => isPreviewLoading
                    },
                    actions: {
                        ...store_1.default.actions,
                        fetchDocumentsTotalCount: jest.fn(),
                        fetchDocuments: jest.fn(),
                        setPaginator: jest.fn(),
                        setFilters: jest.fn(),
                        downloadPreview: jest.fn(),
                        downloadDocuments: jest.fn(),
                        resetVisualization: jest.fn(),
                        downloadVisualization: jest.fn()
                    }
                },
                DataManipulation: store_2.default
            }
        }
    }
});
exports.createSearchStoreMocked = createSearchStoreMocked;
//# sourceMappingURL=index.js.map