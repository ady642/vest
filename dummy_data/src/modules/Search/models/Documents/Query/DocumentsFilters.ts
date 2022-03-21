import Filters from '@/Common/models/List/Filters'
import Period from '@/Common/models/List/Period'

export type DocumentsFiltersAPI = {
  search: string | undefined
  folderId: number | undefined
  findInChildFolders: boolean | undefined
  updatedStart: string | undefined
  updatedEnd: string | undefined
  certified?: boolean
}

export interface DocumentsFiltersParams {
  search: string
  folderId: number
  findInChildFolders: boolean
  period: Period
  certified?: 'all' | boolean
}

export interface DocumentsFiltersRouteParams {
  search?: string
  folderId?: string
  startDate?: string
  endDate?: string
}

export default class DocumentsFilters extends Filters {
  folderId: number
  findInChildFolders: boolean
  certified: 'all' | boolean

  constructor(
    {
      search = '',
      folderId = 0,
      findInChildFolders = false,
      period = new Period(),
      certified = 'all'
    } = {} as DocumentsFiltersParams
  ) {
    super({ search, period })
    this.folderId = folderId
    this.findInChildFolders = findInChildFolders
    this.certified = certified
  }

  static TextFilter(search: string): DocumentsFilters {
    return new DocumentsFilters({
      search
    } as DocumentsFiltersParams)
  }

  static TotalFilters(search: string, period?: Period): DocumentsFilters {
    return new DocumentsFilters({
      search,
      period
    } as DocumentsFiltersParams)
  }

  static createFromRouteQuery(
    routeQuery?: DocumentsFiltersRouteParams
  ): DocumentsFilters {
    return new DocumentsFilters({
      search: routeQuery?.search ?? '',
      period: new Period({
        startDate: routeQuery?.startDate ?? '',
        endDate: routeQuery?.endDate ?? ''
      }),
      findInChildFolders: Boolean(routeQuery?.search),
      folderId: Number(routeQuery?.folderId ?? 0)
    })
  }

  transformForAPI(): DocumentsFiltersAPI {
    return {
      findInChildFolders: this.findInChildFolders
        ? this.findInChildFolders
        : undefined,
      folderId: this.folderId !== 0 ? this.folderId : undefined,
      search: this.search ? this.search : undefined,
      updatedStart: this.period.startDate ? this.period?.startDate : undefined,
      updatedEnd: this.period.endDate ? this.period?.endDate : undefined,
      certified: this.certified === 'all' ? undefined : this.certified
    }
  }

  GetActiveFiltersCount(): number {
    let count = 0

    if (this.period.startDate || this.period.endDate) {
      count++
    }
    if (this.certified !== 'all') {
      count++
    }

    return count
  }

  get areAnyFilters(): boolean {
    return !!this.search || this.GetActiveFiltersCount() > 0
  }
}
