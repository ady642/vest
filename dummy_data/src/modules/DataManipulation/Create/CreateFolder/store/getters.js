"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("@/Common/constants");
const hasPermissionToAddFolder = (state, getters, rootState, rootGetters) => (folderId) => {
    return rootGetters['GED/DataManipulation/hasPermissionToManipulateFolder']({
        folderId,
        permissionName: constants_1.default.CAN_CREATE_FOLDER
    });
};
const isCreatingFolder = (state) => state.isCreatingFolder;
exports.default = {
    hasPermissionToAddFolder,
    isCreatingFolder
};
//# sourceMappingURL=getters.js.map