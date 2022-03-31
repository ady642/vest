"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mypulse_shared_dependencies_1 = require("@kpmg/mypulse-shared-dependencies");
const uploadDocument = async (documentUploadQuery) => {
    const formData = new FormData();
    formData.append('file', documentUploadQuery.file);
    return await mypulse_shared_dependencies_1.api.ds.post(`/${documentUploadQuery.accountNumberOrId}/folders/${documentUploadQuery.folderId}/documents?notify=true`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};
exports.default = {
    uploadDocument
};
//# sourceMappingURL=index.js.map