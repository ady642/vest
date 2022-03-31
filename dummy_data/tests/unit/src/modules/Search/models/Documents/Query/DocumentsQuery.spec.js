"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DocumentsQuery_1 = require("@/modules/Search/models/Documents/Query/DocumentsQuery");
const Account_1 = require("@/modules/Account/models/Account");
const DocumentsFilters_1 = require("@/modules/Search/models/Documents/Query/DocumentsFilters");
const DocumentsSortOptions_1 = require("@/modules/Search/models/Documents/Query/DocumentsSortOptions");
const DocumentsPaginator_1 = require("@/modules/Search/models/Documents/Query/DocumentsPaginator");
const Period_1 = require("@/Common/models/List/Period");
let documentsQuery;
describe('DocumentsQuery', () => {
    test('default value', () => {
        // When a new documentsQuery is created without value
        documentsQuery = new DocumentsQuery_1.default();
        // Then
        expect(documentsQuery).toEqual({
            account: undefined,
            paginator: { pageNumber: 1, itemsPerPage: 100, totalItems: 0 },
            sortOptions: { sortBy: 'updated', sortDirection: 'descending' },
            filters: {
                search: '',
                folderId: 0,
                findInChildFolders: false,
                period: new Period_1.default(),
                certified: 'all'
            }
        });
    });
    test('mapping', () => {
        // When a new documentsQuery is created
        const myPeriod = new Period_1.default({
            startDate: '2019-01-19T10:00:00+00:00',
            endDate: '2019-03-19T10:00:00+00:00'
        });
        documentsQuery = new DocumentsQuery_1.default({
            account: new Account_1.default({ id: '1001' }),
            filters: new DocumentsFilters_1.default({
                search: 'test',
                folderId: 1,
                findInChildFolders: true,
                period: myPeriod
            }),
            sortOptions: new DocumentsSortOptions_1.default({
                sortBy: 'date',
                sortDirection: 'ascending'
            }),
            paginator: new DocumentsPaginator_1.default({
                pageNumber: 4,
                itemsPerPage: 10,
                totalItems: 0
            })
        });
        // Then
        expect(documentsQuery).toEqual({
            account: { id: '1001' },
            paginator: { pageNumber: 4, itemsPerPage: 10, totalItems: 0 },
            sortOptions: { sortBy: 'date', sortDirection: 'ascending' },
            filters: {
                search: 'test',
                folderId: 1,
                findInChildFolders: true,
                period: myPeriod,
                certified: 'all'
            }
        });
    });
    describe('transformForAPI', () => {
        test('with data', () => {
            // When a new documentsQuery is created
            const myPeriod = new Period_1.default({
                startDate: '2019-01-19T10:00:00+00:00',
                endDate: '2019-03-19T10:00:00+00:00'
            });
            documentsQuery = new DocumentsQuery_1.default({
                account: new Account_1.default({ id: '1001' }),
                filters: new DocumentsFilters_1.default({
                    search: 'test',
                    folderId: 1,
                    findInChildFolders: true,
                    period: myPeriod
                }),
                sortOptions: new DocumentsSortOptions_1.default({
                    sortBy: 'date',
                    sortDirection: 'ascending'
                }),
                paginator: new DocumentsPaginator_1.default({
                    pageNumber: 4,
                    itemsPerPage: 10,
                    totalItems: 0
                })
            });
            // Then documentsQuery
            const documentsQueryTransformedForAPI = documentsQuery.transformForAPI();
            expect(documentsQueryTransformedForAPI).toEqual({
                accountNumberOrId: '1001',
                folderId: 1,
                findInChildFolders: true,
                search: 'test',
                limit: 10,
                skip: 30,
                sort: '+date',
                updatedStart: '2019-01-19T10:00:00+00:00',
                updatedEnd: '2019-03-19T10:00:00+00:00'
            });
        });
        test('without data', () => {
            // When a new documentsQuery is created without data (just account id that is required)
            documentsQuery = new DocumentsQuery_1.default({
                account: new Account_1.default({ id: '1001' })
            });
            // Then documentsQuery
            const documentsQueryTransformedForAPI = documentsQuery.transformForAPI();
            expect(documentsQueryTransformedForAPI).toEqual({
                accountNumberOrId: '1001',
                folderId: undefined,
                findInChildFolders: undefined,
                search: undefined,
                limit: 100,
                skip: 0,
                sort: '-updated',
                updatedStart: undefined,
                updatedEnd: undefined
            });
        });
    });
});
//# sourceMappingURL=DocumentsQuery.spec.js.map