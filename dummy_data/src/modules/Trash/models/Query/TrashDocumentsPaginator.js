"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Paginator_1 = require("@/Common/models/List/Paginator");
class TrashDocumentsPaginator extends Paginator_1.default {
    constructor({ pageNumber = 1, itemsPerPage = 10, totalItems = 0 } = {}) {
        super({ pageNumber, itemsPerPage, totalItems });
    }
}
exports.default = TrashDocumentsPaginator;
//# sourceMappingURL=TrashDocumentsPaginator.js.map