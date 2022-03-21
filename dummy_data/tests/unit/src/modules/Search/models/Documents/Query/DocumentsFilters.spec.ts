import Period from '@/Common/models/List/Period'
import DocumentsFilters from '@/modules/Search/models/Documents/Query/DocumentsFilters'

describe('DocumentsFilters', () => {
  it('Should bind values from constructor to target properties', () => {
    const documentFilters = new DocumentsFilters({
      findInChildFolders: true,
      folderId: 123,
      search: 'search',
      period: new Period({
        endDate: '2018-01-01',
        startDate: '2018-01-01'
      })
    })

    expect(documentFilters.findInChildFolders).toBe(true)
    expect(documentFilters.folderId).toBe(123)
    expect(documentFilters.search).toBe('search')
    expect(documentFilters.period.startDate).toBe('2018-01-01')
    expect(documentFilters.period.endDate).toBe('2018-01-01')
  })

  it('GetActiveFiltersCount function Should return 0 when no filter active', () => {
    const documentFilters = new DocumentsFilters({
      findInChildFolders: true,
      folderId: 123,
      search: 'search',
      period: new Period()
    })

    expect(documentFilters.GetActiveFiltersCount()).toBe(0)
  })

  it('GetActiveFiltersCount function Should return the correct count', () => {
    const documentFilters = new DocumentsFilters({
      findInChildFolders: true,
      folderId: 123,
      search: 'search',
      period: new Period({
        endDate: '2018-01-01',
        startDate: '2018-01-01'
      })
    })

    expect(documentFilters.GetActiveFiltersCount()).toBe(1)
  })

  it('TextFilter Function should create DocumentFilters with search property and empty others properties', () => {
    const response = DocumentsFilters.TextFilter('search')

    expect(response.search).toBe('search')
    expect(response.findInChildFolders).toBe(false)
    expect(response.folderId).toBe(0)
    expect(response.period.endDate).toBe('')
    expect(response.period.startDate).toBe('')
  })
  it('TotalFilters Function should create DocumentFilters with search property and period property and check others have default value', () => {
    const documentFilters = DocumentsFilters.TotalFilters(
      'search',
      new Period({
        startDate: '2018-01-01',
        endDate: '2018-01-01'
      })
    )

    expect(documentFilters.search).toBe('search')
    expect(documentFilters.findInChildFolders).toBe(false)
    expect(documentFilters.folderId).toBe(0)
    expect(documentFilters.period.startDate).toBe('2018-01-01')
    expect(documentFilters.period.endDate).toBe('2018-01-01')
  })
  describe('createFromRouteQuery', () => {
    it('should create a DocumentsFilters object with params from route query', () => {
      const documentsFilters = DocumentsFilters.createFromRouteQuery({
        search: 'test',
        folderId: '945',
        startDate: '2018-01-01',
        endDate: '2018-01-31'
      })

      expect(documentsFilters.search).toBe('test')
      expect(documentsFilters.findInChildFolders).toBe(true)
      expect(documentsFilters.folderId).toBe(945)
      expect(documentsFilters.period.startDate).toBe('2018-01-01')
      expect(documentsFilters.period.endDate).toBe('2018-01-31')
    })
    it('should create a DocumentsFilters object if no params from route query', () => {
      const documentsFilters = DocumentsFilters.createFromRouteQuery()

      expect(documentsFilters.search).toBe('')
      expect(documentsFilters.findInChildFolders).toBe(false)
      expect(documentsFilters.folderId).toBe(0)
      expect(documentsFilters.period.startDate).toBe('')
      expect(documentsFilters.period.endDate).toBe('')
    })
  })
  describe('areAnyFilters', () => {
    it.each([
      { search: '', period: new Period(), areAnyFiltersExpected: false },
      {
        search: '',
        period: new Period({
          endDate: '2018-01-01',
          startDate: '2018-01-01'
        }),
        areAnyFiltersExpected: true
      },
      { search: 'test', period: new Period(), areAnyFiltersExpected: true },
      {
        search: 'test',
        period: new Period({
          endDate: '2018-01-01',
          startDate: '2018-01-01'
        }),
        areAnyFiltersExpected: true
      }
    ])(
      'should be true if search is active or any other filters',
      ({ search, period, areAnyFiltersExpected }) => {
        const documentFilters = new DocumentsFilters({
          findInChildFolders: true,
          folderId: 123,
          search,
          period
        })

        expect(documentFilters.areAnyFilters).toBe(areAnyFiltersExpected)
      }
    )
  })
  describe('transformForAPI', () => {
    it('should return the filters transformed to be used by the services', () => {
      const documentFilters = new DocumentsFilters({
        findInChildFolders: true,
        folderId: 123,
        search: 'search',
        period: new Period({
          endDate: '2018-01-01',
          startDate: '2018-01-01'
        })
      })

      expect(documentFilters.transformForAPI()).toStrictEqual({
        certified: undefined,
        findInChildFolders: true,
        folderId: 123,
        search: 'search',
        updatedEnd: '2018-01-01',
        updatedStart: '2018-01-01'
      })
    })
    describe('certify', () => {
      it.each([
        { certified: 'all', expectedCertied: undefined },
        { certified: false, expectedCertied: false },
        { certified: true, expectedCertied: true }
      ])('should set certify at true', ({ certified, expectedCertied }) => {
        const documentFilters = new DocumentsFilters()

        documentFilters.certified = certified as 'all' | boolean

        expect(documentFilters.transformForAPI().certified).toBe(
          expectedCertied
        )
      })
    })
  })
})
