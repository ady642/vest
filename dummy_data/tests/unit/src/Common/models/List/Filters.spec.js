"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Filters_1 = require("@/Common/models/List/Filters");
const Period_1 = require("@/Common/models/List/Period");
let filters;
const myPeriod = new Period_1.default({
    startDate: '2019-01-19T10:00:00+00:00',
    endDate: '2019-03-19T10:00:00+00:00'
});
describe('Filters', () => {
    test('default value', () => {
        filters = new Filters_1.default();
        expect(filters.search).toBe('');
        expect(filters.period).toStrictEqual(new Period_1.default());
    });
    test('mapping', () => {
        filters = new Filters_1.default({
            search: 'test',
            period: myPeriod
        });
        expect(filters.search).toBe('test');
        expect(filters.period).toBe(myPeriod);
    });
    describe('transformForAPI', () => {
        test('with data', () => {
            filters = new Filters_1.default({
                search: 'test',
                period: myPeriod
            });
            const filtersTransformedForAPI = filters.transformForAPI();
            expect(filtersTransformedForAPI?.search).toBe('test');
            expect(filtersTransformedForAPI?.updatedStart).toBe('2019-01-19T10:00:00+00:00');
            expect(filtersTransformedForAPI?.updatedEnd).toBe('2019-03-19T10:00:00+00:00');
        });
        test('without data', () => {
            filters = new Filters_1.default();
            const filtersTransformedForAPI = filters.transformForAPI();
            expect(filtersTransformedForAPI?.search).toBe('');
            expect(filtersTransformedForAPI?.updatedStart).toBe('');
            expect(filtersTransformedForAPI?.updatedEnd).toBe('');
        });
    });
});
//# sourceMappingURL=Filters.spec.js.map