"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DownloadQuery {
    constructor({ accountId, documentId } = {}) {
        this.accountId = accountId;
        this.documentId = documentId;
    }
    transformForAPI() {
        return {
            accountId: this.accountId,
            documentId: this.documentId
        };
    }
}
exports.default = DownloadQuery;
//# sourceMappingURL=DownloadQuery.js.map