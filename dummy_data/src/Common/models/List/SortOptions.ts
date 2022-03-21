export type SortOptionsAPI = Record<'sort', string> | undefined

class SortOptions {
  sortBy: string
  sortDirection: 'descending' | 'ascending' | null
  /**
   *@param {string|null} [sortBy]
   *@param {string|null} [sortDirection=undefined]
   */
  constructor(
    { sortBy = 'updated', sortDirection = 'descending' } = {} as {
      sortBy: string
      sortDirection: 'descending' | 'ascending' | null
    }
  ) {
    this.sortBy = sortBy
    this.sortDirection = sortDirection
  }

  transformForAPI(): SortOptionsAPI {
    if (this.sortDirection) {
      const direction = this.sortDirection === 'ascending' ? '+' : '-'

      return {
        sort: `${direction}${this.sortBy}`
      }
    }
  }
}

export default SortOptions
