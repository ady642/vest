import DocumentsPaginator from '@/modules/Search/models/Documents/Query/DocumentsPaginator'
import DocumentsSortOptions from '@/modules/Search/models/Documents/Query/DocumentsSortOptions'
import DocumentsFilters from '@/modules/Search/models/Documents/Query/DocumentsFilters'
import Account from '@/modules/Account/models/Account'

export type DocumentsQueryAPI = {
  accountNumberOrId: string
  folderId: number | undefined
  findInChildFolders: boolean | undefined
  skip: number
  limit: number
  search?: string
  sort?: string
  updatedStart?: string
  updatedEnd?: string
  comments?: string
}

export interface DocumentsQueryParams {
  account: Account
  paginator: DocumentsPaginator
  sortOptions: DocumentsSortOptions
  filters: DocumentsFilters
}

export default class DocumentsQuery {
  private account: Account
  private paginator: DocumentsPaginator
  private sortOptions: DocumentsSortOptions
  private filters: DocumentsFilters

  /**
   *@param {Account} [string]
   *@param {Paginator} [paginator]
   *@param {SortOptions} [sortOptions]
   *@param {DocumentsFilters} [filters]
   */
  constructor(
    {
      account,
      paginator = new DocumentsPaginator(),
      sortOptions = new DocumentsSortOptions(),
      filters = new DocumentsFilters()
    } = {} as DocumentsQueryParams
  ) {
    this.account = account
    this.paginator = paginator
    this.sortOptions = sortOptions
    this.filters = filters
  }

  transformForAPI(): DocumentsQueryAPI {
    return {
      accountNumberOrId: this.account.id,
      ...this.paginator.transformForAPI(),
      ...this.sortOptions.transformForAPI(),
      ...this.filters.transformForAPI()
    }
  }
}
