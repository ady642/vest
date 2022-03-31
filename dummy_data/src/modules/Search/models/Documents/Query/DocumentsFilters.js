"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Filters_1 = require("@/Common/models/List/Filters");
const Period_1 = require("@/Common/models/List/Period");
class DocumentsFilters extends Filters_1.default {
    constructor({ search = '', folderId = 0, findInChildFolders = false, period = new Period_1.default(), certified = 'all' } = {}) {
        super({ search, period });
        this.folderId = folderId;
        this.findInChildFolders = findInChildFolders;
        this.certified = certified;
    }
    static TextFilter(search) {
        return new DocumentsFilters({
            search
        });
    }
    static TotalFilters(search, period) {
        return new DocumentsFilters({
            search,
            period
        });
    }
    static createFromRouteQuery(routeQuery) {
        return new DocumentsFilters({
            search: routeQuery?.search ?? '',
            period: new Period_1.default({
                startDate: routeQuery?.startDate ?? '',
                endDate: routeQuery?.endDate ?? ''
            }),
            findInChildFolders: Boolean(routeQuery?.search),
            folderId: Number(routeQuery?.folderId ?? 0)
        });
    }
    transformForAPI() {
        return {
            findInChildFolders: this.findInChildFolders
                ? this.findInChildFolders
                : undefined,
            folderId: this.folderId !== 0 ? this.folderId : undefined,
            search: this.search ? this.search : undefined,
            updatedStart: this.period.startDate ? this.period?.startDate : undefined,
            updatedEnd: this.period.endDate ? this.period?.endDate : undefined,
            certified: this.certified === 'all' ? undefined : this.certified
        };
    }
    GetActiveFiltersCount() {
        let count = 0;
        if (this.period.startDate || this.period.endDate) {
            count++;
        }
        if (this.certified !== 'all') {
            count++;
        }
        return count;
    }
    get areAnyFilters() {
        return !!this.search || this.GetActiveFiltersCount() > 0;
    }
}
exports.default = DocumentsFilters;
//# sourceMappingURL=DocumentsFilters.js.map