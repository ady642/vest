import TrashDocumentsPaginator from '@/modules/Trash/models/Query/TrashDocumentsPaginator'
import TrashDocumentsQuery from '@/modules/Trash/models/Query/TrashDocumentsQueryAPI'
import TrashSortOptions from '@/modules/Trash/models/Query/TrashSortOptions'

describe('TrashDocumentsQueryAPI', () => {
  test('TrashDocumentsQuery.transformForAPI', () => {
    // create instance of trash documents query and check its properties
    const trashDocumentsQuery = new TrashDocumentsQuery({
      paginator: new TrashDocumentsPaginator({
        pageNumber: 1,
        itemsPerPage: 10,
        totalItems: 100
      }),
      sortOptions: new TrashSortOptions()
    })

    const apiQuery = trashDocumentsQuery.transformForAPI()

    expect(apiQuery.skip).toBe(0)
    expect(apiQuery.limit).toBe(10)
    expect(apiQuery.sort).toBe('-deleted')
  })
})
