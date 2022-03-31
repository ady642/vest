"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("@/modules/Search/store");
const constants_1 = require("@/Common/constants");
const lodash_1 = require("lodash");
const isFileDeleting = (state) => state.isFileDeleting;
const isFileDeletable = (state, getters, rootState, rootGetters) => (documentIdToDelete) => {
    if (!documentIdToDelete && !(0, lodash_1.isString)(documentIdToDelete)) {
        return false;
    }
    const document = rootGetters[(0, store_1.searchModule)('documents')].collection.find((doc) => doc.id === documentIdToDelete);
    if (document) {
        const syncStatus = document.properties.syncStatus;
        const folder = rootGetters[(0, store_1.searchModule)('folders')].getFolderById(document.folderId);
        if (folder) {
            const isPiaFolder = folder.properties.isPIAFolder;
            return (!((isPiaFolder && syncStatus == constants_1.default.SUCCESS_SYNC) ||
                syncStatus == constants_1.default.PENDING_SYNC) &&
                rootGetters['GED/DataManipulation/hasPermissionToManipulateFolder']({
                    folderId: folder.id,
                    permissionName: constants_1.default.CAN_DELETE_FILES
                }));
        }
    }
    return false;
};
const areDocumentsDeletable = (state, getters) => (documentIds) => documentIds.every((documentId) => getters.isFileDeletable(documentId));
exports.default = {
    isFileDeletable,
    isFileDeleting,
    areDocumentsDeletable
};
//# sourceMappingURL=getters.js.map