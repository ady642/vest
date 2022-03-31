"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TrashDocument {
    constructor({ id = null, name = '', deleted = '', deletedBy = '', path = [], folderId = 0 } = {}) {
        this.id = id;
        this.name = name;
        this.deleted = deleted;
        this.path = Array.isArray(path) ? path : [path];
        this.deletedBy = deletedBy;
        this.restorationStatus = '';
        this.folderId = folderId;
    }
}
exports.default = TrashDocument;
//# sourceMappingURL=TrashDocument.js.map