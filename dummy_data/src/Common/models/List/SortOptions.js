"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SortOptions {
    /**
     *@param {string|null} [sortBy]
     *@param {string|null} [sortDirection=undefined]
     */
    constructor({ sortBy = 'updated', sortDirection = 'descending' } = {}) {
        this.sortBy = sortBy;
        this.sortDirection = sortDirection;
    }
    transformForAPI() {
        if (this.sortDirection) {
            const direction = this.sortDirection === 'ascending' ? '+' : '-';
            return {
                sort: `${direction}${this.sortBy}`
            };
        }
    }
}
exports.default = SortOptions;
//# sourceMappingURL=SortOptions.js.map