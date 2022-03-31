"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mypulse_shared_dependencies_1 = require("@kpmg/mypulse-shared-dependencies");
const DeleteFiles = async (accountId, documentIds) => {
    await mypulse_shared_dependencies_1.api.ds.delete(`/${accountId}/documents`, {
        data: { ids: documentIds }
    });
};
exports.default = {
    DeleteFiles
};
//# sourceMappingURL=index.js.map