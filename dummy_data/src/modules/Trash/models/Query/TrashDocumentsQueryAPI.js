"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TrashDocumentsPaginator_1 = require("./TrashDocumentsPaginator");
const TrashSortOptions_1 = require("./TrashSortOptions");
class TrashDocumentsQuery {
    /**
     *@param {Paginator} [paginator]
     *@param {SortOptions} [sortOptions]
     */
    constructor({ paginator = new TrashDocumentsPaginator_1.default(), sortOptions = new TrashSortOptions_1.default() } = {}) {
        this.paginator = paginator;
        this.sortOptions = sortOptions;
    }
    transformForAPI() {
        return {
            ...this.paginator.transformForAPI(),
            ...this.sortOptions.transformForAPI()
        };
    }
}
exports.default = TrashDocumentsQuery;
//# sourceMappingURL=TrashDocumentsQueryAPI.js.map