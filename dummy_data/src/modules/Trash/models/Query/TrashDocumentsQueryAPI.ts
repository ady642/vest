import TrashDocumentsPaginator from './TrashDocumentsPaginator'
import TrashSortOptions from './TrashSortOptions'

export type TrashDocumentsQueryAPI = {
  skip: number
  limit: number
  sort?: string
}

export interface TrashDocumentsQueryParams {
  paginator: TrashDocumentsPaginator
  sortOptions: TrashSortOptions
}

export default class TrashDocumentsQuery {
  private paginator: TrashDocumentsPaginator
  private sortOptions: TrashSortOptions

  /**
   *@param {Paginator} [paginator]
   *@param {SortOptions} [sortOptions]
   */
  constructor(
    {
      paginator = new TrashDocumentsPaginator(),
      sortOptions = new TrashSortOptions()
    } = {} as TrashDocumentsQueryParams
  ) {
    this.paginator = paginator
    this.sortOptions = sortOptions
  }

  transformForAPI(): TrashDocumentsQueryAPI {
    return {
      ...this.paginator.transformForAPI(),
      ...this.sortOptions.transformForAPI()
    }
  }
}
