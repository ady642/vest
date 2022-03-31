"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Period_1 = require("@/Common/models/List/Period");
class Filters {
    /**
     *@param {string} [search]
     */
    constructor({ search = '', period = new Period_1.default() } = {}) {
        this.search = search;
        this.period = period;
    }
    transformForAPI() {
        if (this.search || this.period) {
            return {
                search: this.search ?? undefined,
                updatedStart: this.period.startDate ?? undefined,
                updatedEnd: this.period?.endDate ?? undefined
            };
        }
    }
}
exports.default = Filters;
//# sourceMappingURL=Filters.js.map