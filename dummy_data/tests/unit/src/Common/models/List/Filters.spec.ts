import Filters from '@/Common/models/List/Filters'
import Period from '@/Common/models/List/Period'

let filters: Filters

const myPeriod = new Period({
  startDate: '2019-01-19T10:00:00+00:00',
  endDate: '2019-03-19T10:00:00+00:00'
})

describe('Filters', () => {
  test('default value', () => {
    filters = new Filters()

    expect(filters.search).toBe('')
    expect(filters.period).toStrictEqual(new Period())
  })
  test('mapping', () => {
    filters = new Filters({
      search: 'test',
      period: myPeriod
    })

    expect(filters.search).toBe('test')
    expect(filters.period).toBe(myPeriod)
  })
  describe('transformForAPI', () => {
    test('with data', () => {
      filters = new Filters({
        search: 'test',
        period: myPeriod
      })

      const filtersTransformedForAPI = filters.transformForAPI()

      expect(filtersTransformedForAPI?.search).toBe('test')
      expect(filtersTransformedForAPI?.updatedStart).toBe(
        '2019-01-19T10:00:00+00:00'
      )
      expect(filtersTransformedForAPI?.updatedEnd).toBe(
        '2019-03-19T10:00:00+00:00'
      )
    })
    test('without data', () => {
      filters = new Filters()

      const filtersTransformedForAPI = filters.transformForAPI()

      expect(filtersTransformedForAPI?.search).toBe('')
      expect(filtersTransformedForAPI?.updatedStart).toBe('')
      expect(filtersTransformedForAPI?.updatedEnd).toBe('')
    })
  })
})
