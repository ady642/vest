"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("@/Common/constants");
const files = (state) => state.files;
const selectedFolderToUpload = (state) => state.selectedFolderToUpload;
const isUploading = (state) => state.files.some((f) => f.running()) || state.files.some((f) => f.pending());
const hasPermissionToUploadFile = (state, getters, rootState, rootGetters) => (folderId) => {
    return rootGetters['GED/DataManipulation/hasPermissionToManipulateFolder']({
        folderId,
        permissionName: constants_1.default.CAN_UPLOAD_FILES
    });
};
const hasAccessDs = (state, getters, rootState, rootGetters) => {
    const folders = rootGetters['GED/Search/folders'];
    return folders.collection.length > 0;
};
exports.default = {
    files,
    selectedFolderToUpload,
    isUploading,
    hasPermissionToUploadFile,
    hasAccessDs
};
//# sourceMappingURL=getters.js.map