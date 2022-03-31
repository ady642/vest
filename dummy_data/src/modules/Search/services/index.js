"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mypulse_shared_dependencies_1 = require("@kpmg/mypulse-shared-dependencies");
const downloadDocumentsHelper_1 = require("@/Common/helpers/downloadDocumentsHelper");
const fetchDocuments = async (documentsQuery, cancelToken) => await mypulse_shared_dependencies_1.api.ds.get('/documents/search', {
    cancelToken: cancelToken?.token,
    params: documentsQuery
});
const fetchFolders = async (accountIdOrNumber) => await mypulse_shared_dependencies_1.api.ds.get(`/${accountIdOrNumber}/folders`);
const downloadPreview = async ({ accountId, documentId }) => await mypulse_shared_dependencies_1.api.ds.get(`/${accountId}/documents/${documentId}/preview`, {
    responseType: 'arraybuffer'
});
const downloadDocument = async ({ accountId, documentId }) => await mypulse_shared_dependencies_1.api.ds.get(`/${accountId}/documents/${documentId}/content`, {
    responseType: 'blob'
});
const patchDocument = async ({ accountId, documentId, operation, path, value }) => await mypulse_shared_dependencies_1.api.ds.patch(`/${accountId}/documents/${documentId}`, [
    { op: operation, path: path, value: value }
]);
const downloadDocuments = async (accountId, documentsIds) => {
    const ids = {
        ids: documentsIds
    };
    const response = await mypulse_shared_dependencies_1.api.ds.post(`/${accountId}/archive`, ids, {
        responseType: 'blob'
    });
    if (response?.data) {
        (0, downloadDocumentsHelper_1.DownloadAsZip)(response?.data, 'myPulse.zip');
    }
};
exports.default = {
    fetchDocuments,
    fetchFolders,
    downloadDocument,
    patchDocument,
    downloadPreview,
    downloadDocuments
};
//# sourceMappingURL=index.js.map