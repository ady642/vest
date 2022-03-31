"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const store_1 = require("@/modules/DataManipulation/Upload/store");
const selectedFolderToUpload = (store) => (0, vue_1.computed)(() => store.getters[(0, store_1.uploadModule)('selectedFolderToUpload')]);
const getFiles = (store) => (0, vue_1.computed)(() => store.getters[(0, store_1.uploadModule)('files')]);
const isUploading = (store) => (0, vue_1.computed)(() => store.getters[(0, store_1.uploadModule)('isUploading')]);
const hasPermissionToUploadFile = (store, folderId) => store.getters[(0, store_1.uploadModule)('hasPermissionToUploadFile')](folderId);
const hasAccessDs = (store) => store.getters[(0, store_1.uploadModule)('hasAccessDs')];
const gettersHelpers = () => ({
    selectedFolderToUpload,
    getFiles,
    isUploading,
    hasPermissionToUploadFile,
    hasAccessDs
});
exports.default = gettersHelpers;
//# sourceMappingURL=getterHelpers.js.map