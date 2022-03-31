"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PatchQuery {
    constructor({ accountId, documentId, operation, path, value } = {}) {
        this.accountId = accountId;
        this.documentId = documentId;
        this.operation = operation;
        this.path = path;
        this.value = value;
    }
}
exports.default = PatchQuery;
//# sourceMappingURL=PatchQuery.js.map