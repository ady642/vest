"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mypulse_shared_dependencies_1 = require("@kpmg/mypulse-shared-dependencies");
const deleteFolder = async (accountId, folderId) => {
    await mypulse_shared_dependencies_1.api.ds.delete(`/${accountId}/folders/${folderId}?keepFolder=false`);
};
exports.default = {
    deleteFolder
};
//# sourceMappingURL=index.js.map