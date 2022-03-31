"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Paginator {
    /**
     *@param {number} [pageNumber=1]
     *@param {number} [itemsPerPage=100]
     *@param {number}
     */
    constructor({ pageNumber, itemsPerPage = 100, totalItems = 0 } = {
        pageNumber: 1,
        itemsPerPage: 100,
        totalItems: 0
    }) {
        this.pageNumber = pageNumber;
        this.itemsPerPage = itemsPerPage;
        this.totalItems = totalItems;
    }
    setPageNumber(pageNumber) {
        this.pageNumber = pageNumber;
    }
    setTotalItems(totalItems) {
        this.totalItems = +totalItems;
    }
    transformForAPI() {
        return {
            skip: (this.pageNumber - 1) * this.itemsPerPage,
            limit: this.itemsPerPage
        };
    }
}
exports.default = Paginator;
//# sourceMappingURL=Paginator.js.map