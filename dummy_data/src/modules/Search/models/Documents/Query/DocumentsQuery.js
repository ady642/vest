"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DocumentsPaginator_1 = require("@/modules/Search/models/Documents/Query/DocumentsPaginator");
const DocumentsSortOptions_1 = require("@/modules/Search/models/Documents/Query/DocumentsSortOptions");
const DocumentsFilters_1 = require("@/modules/Search/models/Documents/Query/DocumentsFilters");
class DocumentsQuery {
    /**
     *@param {Account} [string]
     *@param {Paginator} [paginator]
     *@param {SortOptions} [sortOptions]
     *@param {DocumentsFilters} [filters]
     */
    constructor({ account, paginator = new DocumentsPaginator_1.default(), sortOptions = new DocumentsSortOptions_1.default(), filters = new DocumentsFilters_1.default() } = {}) {
        this.account = account;
        this.paginator = paginator;
        this.sortOptions = sortOptions;
        this.filters = filters;
    }
    transformForAPI() {
        return {
            accountNumberOrId: this.account.id,
            ...this.paginator.transformForAPI(),
            ...this.sortOptions.transformForAPI(),
            ...this.filters.transformForAPI()
        };
    }
}
exports.default = DocumentsQuery;
//# sourceMappingURL=DocumentsQuery.js.map