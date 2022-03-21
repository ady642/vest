import SortOptions from '@/Common/models/List/SortOptions'

export default class TrashSortOptions extends SortOptions {
  constructor(sortBy = 'deleted', sortDirection = 'descending') {
    super({ sortBy, sortDirection } as {
      sortBy: string
      sortDirection: 'descending' | 'ascending' | null
    })
  }
}
