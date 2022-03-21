import SortOptions from '@/Common/models/List/SortOptions'

let sortOptions: SortOptions

describe('SortOptions', () => {
  test('default value', () => {
    sortOptions = new SortOptions()

    expect(sortOptions.sortDirection).toBe('descending')
    expect(sortOptions.sortBy).toBe('updated')
  })
  test('mapping', () => {
    sortOptions = new SortOptions({
      sortBy: 'name',
      sortDirection: 'ascending'
    })

    expect(sortOptions.sortBy).toBe('name')
    expect(sortOptions.sortDirection).toBe('ascending')
  })

  describe('transformForAPI', () => {
    test('with undefined as sort order', () => {
      sortOptions = new SortOptions({
        sortBy: 'name',
        sortDirection: null
      })

      const sortOptionsTransformedForAPI = sortOptions.transformForAPI()

      expect(sortOptionsTransformedForAPI).toBeUndefined()
    })
    test('with data', () => {
      sortOptions = new SortOptions({
        sortBy: 'name',
        sortDirection: 'ascending'
      })

      const sortOptionsTransformedForAPI = sortOptions.transformForAPI()

      expect(sortOptionsTransformedForAPI?.sort).toBe('+name')
    })
    test('without data', () => {
      sortOptions = new SortOptions()

      const sortOptionsTransformedForAPI = sortOptions.transformForAPI()

      expect(sortOptionsTransformedForAPI?.sort).toBe('-updated')
    })
  })
})
