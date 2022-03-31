"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mypulse_shared_dependencies_1 = require("@kpmg/mypulse-shared-dependencies");
const RestoreFileRequest_1 = require("@/modules/Trash/models/Query/RestoreFileRequest");
const fetchTrashDocuments = async (accountIdOrNumber, documentsQuery, cancelToken) => await mypulse_shared_dependencies_1.api.ds.get(`/${accountIdOrNumber}/trash`, {
    cancelToken: cancelToken?.token,
    params: { ...documentsQuery }
});
const restoreFile = async (accountId, documentId) => {
    const ids = new Array();
    ids.push(documentId);
    const data = new RestoreFileRequest_1.default(ids);
    return await mypulse_shared_dependencies_1.api.ds.post(`/${accountId}/trash/restore`, data);
};
exports.default = {
    fetchTrashDocuments,
    restoreFile
};
//# sourceMappingURL=index.js.map