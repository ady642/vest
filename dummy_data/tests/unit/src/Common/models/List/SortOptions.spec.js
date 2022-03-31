"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SortOptions_1 = require("@/Common/models/List/SortOptions");
let sortOptions;
describe('SortOptions', () => {
    test('default value', () => {
        sortOptions = new SortOptions_1.default();
        expect(sortOptions.sortDirection).toBe('descending');
        expect(sortOptions.sortBy).toBe('updated');
    });
    test('mapping', () => {
        sortOptions = new SortOptions_1.default({
            sortBy: 'name',
            sortDirection: 'ascending'
        });
        expect(sortOptions.sortBy).toBe('name');
        expect(sortOptions.sortDirection).toBe('ascending');
    });
    describe('transformForAPI', () => {
        test('with undefined as sort order', () => {
            sortOptions = new SortOptions_1.default({
                sortBy: 'name',
                sortDirection: null
            });
            const sortOptionsTransformedForAPI = sortOptions.transformForAPI();
            expect(sortOptionsTransformedForAPI).toBeUndefined();
        });
        test('with data', () => {
            sortOptions = new SortOptions_1.default({
                sortBy: 'name',
                sortDirection: 'ascending'
            });
            const sortOptionsTransformedForAPI = sortOptions.transformForAPI();
            expect(sortOptionsTransformedForAPI?.sort).toBe('+name');
        });
        test('without data', () => {
            sortOptions = new SortOptions_1.default();
            const sortOptionsTransformedForAPI = sortOptions.transformForAPI();
            expect(sortOptionsTransformedForAPI?.sort).toBe('-updated');
        });
    });
});
//# sourceMappingURL=SortOptions.spec.js.map