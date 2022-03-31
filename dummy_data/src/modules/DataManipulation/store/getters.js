"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hasPermissionToManipulateFolder = (state, getters, rootState, rootGetters) => ({ folderId, permissionName }) => {
    if (!folderId) {
        return false;
    }
    const folder = rootGetters['GED/Search/folders'].getFolderById(folderId);
    const hasPermission = folder?.permissions.includes(permissionName);
    return hasPermission ?? false;
};
exports.default = {
    hasPermissionToManipulateFolder
};
//# sourceMappingURL=getters.js.map