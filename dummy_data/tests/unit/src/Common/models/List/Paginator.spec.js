"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Paginator_1 = require("@/Common/models/List/Paginator");
let paginator;
describe('Paginator', () => {
    test('default value', () => {
        paginator = new Paginator_1.default();
        expect(paginator.pageNumber).toBe(1);
        expect(paginator.itemsPerPage).toBe(100);
        expect(paginator.totalItems).toBe(0);
    });
    test('mapping', () => {
        paginator = new Paginator_1.default({
            pageNumber: 4,
            itemsPerPage: 20,
            totalItems: 100
        });
        expect(paginator.pageNumber).toBe(4);
        expect(paginator.itemsPerPage).toBe(20);
        expect(paginator.totalItems).toBe(100);
    });
    test('transformForAPI', () => {
        paginator = new Paginator_1.default({
            pageNumber: 4,
            itemsPerPage: 20,
            totalItems: 100
        });
        const paginatorTransformedForAPI = paginator.transformForAPI();
        expect(paginatorTransformedForAPI.skip).toBe(60);
        expect(paginatorTransformedForAPI.limit).toBe(20);
    });
});
//# sourceMappingURL=Paginator.spec.js.map