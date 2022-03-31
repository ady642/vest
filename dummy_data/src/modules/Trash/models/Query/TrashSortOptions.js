"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SortOptions_1 = require("@/Common/models/List/SortOptions");
class TrashSortOptions extends SortOptions_1.default {
    constructor(sortBy = 'deleted', sortDirection = 'descending') {
        super({ sortBy, sortDirection });
    }
}
exports.default = TrashSortOptions;
//# sourceMappingURL=TrashSortOptions.js.map