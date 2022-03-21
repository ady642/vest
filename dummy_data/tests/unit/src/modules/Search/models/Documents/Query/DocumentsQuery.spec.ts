import DocumentsQuery, {
  DocumentsQueryAPI,
  DocumentsQueryParams
} from '@/modules/Search/models/Documents/Query/DocumentsQuery'
import Account from '@/modules/Account/models/Account'
import DocumentsFilters from '@/modules/Search/models/Documents/Query/DocumentsFilters'
import DocumentsSortOptions from '@/modules/Search/models/Documents/Query/DocumentsSortOptions'
import DocumentsPaginator from '@/modules/Search/models/Documents/Query/DocumentsPaginator'
import Period from '@/Common/models/List/Period'

let documentsQuery: DocumentsQuery

describe('DocumentsQuery', () => {
  test('default value', () => {
    // When a new documentsQuery is created without value
    documentsQuery = new DocumentsQuery()

    // Then
    expect(documentsQuery).toEqual({
      account: undefined,
      paginator: { pageNumber: 1, itemsPerPage: 100, totalItems: 0 },
      sortOptions: { sortBy: 'updated', sortDirection: 'descending' },
      filters: {
        search: '',
        folderId: 0,
        findInChildFolders: false,
        period: new Period(),
        certified: 'all'
      }
    })
  })
  test('mapping', () => {
    // When a new documentsQuery is created
    const myPeriod = new Period({
      startDate: '2019-01-19T10:00:00+00:00',
      endDate: '2019-03-19T10:00:00+00:00'
    })

    documentsQuery = new DocumentsQuery({
      account: new Account({ id: '1001' }),
      filters: new DocumentsFilters({
        search: 'test',
        folderId: 1,
        findInChildFolders: true,
        period: myPeriod
      }),
      sortOptions: new DocumentsSortOptions({
        sortBy: 'date',
        sortDirection: 'ascending'
      }),
      paginator: new DocumentsPaginator({
        pageNumber: 4,
        itemsPerPage: 10,
        totalItems: 0
      })
    })

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
    })
  })
  describe('transformForAPI', () => {
    test('with data', () => {
      // When a new documentsQuery is created
      const myPeriod = new Period({
        startDate: '2019-01-19T10:00:00+00:00',
        endDate: '2019-03-19T10:00:00+00:00'
      })

      documentsQuery = new DocumentsQuery({
        account: new Account({ id: '1001' }),
        filters: new DocumentsFilters({
          search: 'test',
          folderId: 1,
          findInChildFolders: true,
          period: myPeriod
        }),
        sortOptions: new DocumentsSortOptions({
          sortBy: 'date',
          sortDirection: 'ascending'
        }),
        paginator: new DocumentsPaginator({
          pageNumber: 4,
          itemsPerPage: 10,
          totalItems: 0
        })
      })

      // Then documentsQuery
      const documentsQueryTransformedForAPI = documentsQuery.transformForAPI()

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
      } as DocumentsQueryAPI)
    })

    test('without data', () => {
      // When a new documentsQuery is created without data (just account id that is required)
      documentsQuery = new DocumentsQuery({
        account: new Account({ id: '1001' })
      } as DocumentsQueryParams)

      // Then documentsQuery
      const documentsQueryTransformedForAPI = documentsQuery.transformForAPI()

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
      })
    })
  })
})
