import TrashDocumentsPaginator from '@/modules/Trash/models/Query/TrashDocumentsPaginator'
import TrashDocumentsQuery from '@/modules/Trash/models/Query/TrashDocumentsQueryAPI'
import TrashSortOptions from '@/modules/Trash/models/Query/TrashSortOptions'
import TrashServices from '@/modules/Trash/services'
import { api } from '@kpmg/mypulse-shared-dependencies'
import RestoreFileRequest from '@/modules/Trash/models/Query/RestoreFileRequest'

describe('TrashServices', () => {
  test('fetchTrashDocuments', () => {
    const trashDocumentsQuery = new TrashDocumentsQuery({
      paginator: new TrashDocumentsPaginator({
        pageNumber: 1,
        itemsPerPage: 10,
        totalItems: 100
      }),
      sortOptions: new TrashSortOptions()
    })

    TrashServices.fetchTrashDocuments(
      'testmodel6',
      trashDocumentsQuery.transformForAPI()
    )
    expect(api.ds.get).toHaveBeenCalledWith('/testmodel6/trash', {
      params: { limit: 10, skip: 0, sort: '-deleted' }
    })
  })
  it('restoreFile', () => {
    TrashServices.restoreFile('545421', '12345')

    const data = new RestoreFileRequest(['12345'])

    expect(api.ds.post).toHaveBeenCalledWith('/545421/trash/restore', data)
  })
})
