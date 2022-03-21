import Paginator, { PaginatorParams } from '@/Common/models/List/Paginator'

type TrashDocumentsPaginatorParams = Partial<PaginatorParams>

export default class TrashDocumentsPaginator extends Paginator {
  constructor(
    {
      pageNumber = 1,
      itemsPerPage = 10,
      totalItems = 0
    } = {} as TrashDocumentsPaginatorParams
  ) {
    super({ pageNumber, itemsPerPage, totalItems })
  }
}
