import Period from '@/Common/models/List/Period'

interface FiltersInterface {
  search: string
  period: Period
}

export type FiltersAPI =
  | {
      search?: string
      updatedStart?: string
      updatedEnd?: string
    }
  | undefined

export default class Filters {
  search: string
  period: Period
  /**
   *@param {string} [search]
   */
  constructor({ search = '', period = new Period() } = {} as FiltersInterface) {
    this.search = search
    this.period = period
  }

  transformForAPI(): FiltersAPI {
    if (this.search || this.period) {
      return {
        search: this.search ?? undefined,
        updatedStart: this.period.startDate ?? undefined,
        updatedEnd: this.period?.endDate ?? undefined
      }
    }
  }
}
