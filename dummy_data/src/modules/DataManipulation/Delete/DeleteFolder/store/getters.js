"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("@/modules/DataManipulation/Upload/store");
const store_2 = require("@/modules/Search/store");
const useArrayHelpers_1 = require("@/Common/hooks/useArrayHelpers");
const constants_1 = require("@/Common/constants");
const { hasFileUploading, hasFileUploadingInIt } = (0, useArrayHelpers_1.default)();
const isFolderDeletable = (state, getters, rootState, rootGetters) => (folderIdToDelete) => {
    if (!folderIdToDelete) {
        return false;
    }
    const children = rootGetters[(0, store_2.searchModule)('folders')].getFolderById(folderIdToDelete)?.children;
    if (children === undefined) {
        return false;
    }
    const files = rootGetters[(0, store_1.uploadModule)('files')];
    const hasFileIn = hasFileUploadingInIt({
        folderId: folderIdToDelete,
        files
    });
    const hasFileDeep = hasFileUploading({
        folders: children,
        files
    });
    return !(hasFileIn || hasFileDeep);
};
const hasPermissionToDeleteFolder = (state, getters, rootState, rootGetters) => (folderId) => {
    if (!folderId) {
        return false;
    }
    return rootGetters['GED/DataManipulation/hasPermissionToManipulateFolder']({
        folderId,
        permissionName: constants_1.default.CAN_DELETE_FOLDER
    });
};
const isFolderDeleting = (state) => state.isFolderDeleting;
exports.default = {
    isFolderDeletable,
    hasPermissionToDeleteFolder,
    isFolderDeleting
};
//# sourceMappingURL=getters.js.map