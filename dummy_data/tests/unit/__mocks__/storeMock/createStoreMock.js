"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFileStoreMock = void 0;
const vuex_1 = require("vuex");
const store_1 = require("@/modules/Search/store");
const store_2 = require("@/modules/DataManipulation/Upload/store");
const store_3 = require("@/modules/DataManipulation/store");
const FoldersDataMock_1 = require("../../src/modules/Search/mocks/FoldersDataMock");
const createFileStoreMock = ({ hasPermissionToUploadFile = true, hasAccessDs = true, isUploading = false, folders = (0, FoldersDataMock_1.default)().FoldersData, files = [], selectedFolderToUpload = 0 } = {}) => (0, vuex_1.createStore)({
    modules: {
        GED: {
            namespaced: true,
            modules: {
                DataManipulation: {
                    ...store_3.default,
                    namespaced: true,
                    modules: {
                        ...store_3.default.modules,
                        Upload: {
                            ...store_2.default,
                            getters: {
                                ...store_2.default.getters,
                                hasPermissionToUploadFile: (state, getters, rootState, rootGetters) => (folderId) => hasPermissionToUploadFile,
                                isUploading: () => isUploading,
                                hasAccessDs: () => hasAccessDs,
                                files: () => files,
                                selectedFolderToUpload: () => selectedFolderToUpload
                            }
                        }
                    }
                },
                Search: {
                    ...store_1.default,
                    actions: {
                        ...store_1.default.actions,
                        setSelectedFolderToUpload: jest.fn()
                    },
                    getters: {
                        ...store_1.default.getters,
                        folders: () => folders
                    }
                }
            }
        }
    }
});
exports.createFileStoreMock = createFileStoreMock;
//# sourceMappingURL=createStoreMock.js.map