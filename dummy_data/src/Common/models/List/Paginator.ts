export type PaginatorAPI = Record<'skip' | 'limit', number>
export type PaginatorParams = {
  pageNumber: number
  itemsPerPage?: number
  totalItems?: number
}
export default class Paginator {
  pageNumber: number
  itemsPerPage: number
  totalItems: number
  /**
   *@param {number} [pageNumber=1]
   *@param {number} [itemsPerPage=100]
   *@param {number}
   */
  constructor(
    { pageNumber, itemsPerPage = 100, totalItems = 0 } = {
      pageNumber: 1,
      itemsPerPage: 100,
      totalItems: 0
    } as PaginatorParams
  ) {
    this.pageNumber = pageNumber
    this.itemsPerPage = itemsPerPage
    this.totalItems = totalItems
  }

  setPageNumber(pageNumber: number): void {
    this.pageNumber = pageNumber
  }

  setTotalItems(totalItems: number): void {
    this.totalItems = +totalItems
  }

  transformForAPI(): PaginatorAPI {
    return {
      skip: (this.pageNumber - 1) * this.itemsPerPage,
      limit: this.itemsPerPage
    }
  }
}
