import DocumentServices from '@/modules/Search/services'
import DocumentsQuery from '@/modules/Search/models/Documents/Query/DocumentsQuery'
import { api } from '@kpmg/mypulse-shared-dependencies'
import DocumentsPaginator from '@/modules/Search/models/Documents/Query/DocumentsPaginator'
import DocumentsFilters from '@/modules/Search/models/Documents/Query/DocumentsFilters'
import DocumentsSortOptions from '@/modules/Search/models/Documents/Query/DocumentsSortOptions'
import Account from '@/modules/Account/models/Account'
import DownloadQuery from '@/modules/Search/models/Documents/Query/DownloadQuery'
import Period from '@/Common/models/List/Period'
import PatchQuery from '@/modules/Search/models/Documents/Query/PatchQuery'

describe('DocumentServices', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call api.ds.get with documents get API when I call the the fetchDocument service', () => {
    // Given the documentsQuery is set
    const documentsQuery = new DocumentsQuery({
      account: new Account({ id: '1001' }),
      paginator: new DocumentsPaginator({
        pageNumber: 2,
        itemsPerPage: 10,
        totalItems: 20
      }),
      filters: new DocumentsFilters({
        search: 'test',
        findInChildFolders: true,
        folderId: 0,
        period: new Period()
      }),
      sortOptions: new DocumentsSortOptions({
        sortBy: 'date',
        sortDirection: 'ascending'
      })
    })

    // When I call the fetchDocuments service
    DocumentServices.fetchDocuments(documentsQuery.transformForAPI())

    // Then api.ds.get must have been called with good payload
    expect(api.ds.get).toHaveBeenCalledWith('/documents/search', {
      params: {
        skip: 10,
        limit: 10,
        sort: '+date',
        search: 'test',
        accountNumberOrId: '1001',
        findInChildFolders: true,
        folderId: undefined,
        certified: undefined
      }
    })
  })

  it('should call api.ds.get with folders get API when I call the the fetchFolders service', () => {
    // When I call the fetchFolders service
    DocumentServices.fetchFolders('123456')

    // Then api.ds.get must have been called with good path
    expect(api.ds.get).toHaveBeenCalledWith('/123456/folders')
  })

  it('should call api.ds.get with download document GET API when the downloadDocument service is called', () => {
    // When the downloadDocument service is called
    DocumentServices.downloadDocument(
      new DownloadQuery({
        accountId: '1001',
        documentId: 'tgh'
      }).transformForAPI()
    )

    // Then api.ds.get must have been called with good query
    expect(api.ds.get).toHaveBeenCalledWith('/1001/documents/tgh/content', {
      responseType: 'blob'
    })
  })

  it('should call api.ds.post with download documents POST API when the downloadDocuments service is called', () => {
    // When the downloadDocument service is called
    DocumentServices.downloadDocuments('1001', ['testId', 'testId2'])

    // Then api.ds.post must have been called with good query
    expect(api.ds.post).toHaveBeenCalledWith(
      '/1001/archive',
      { ids: ['testId', 'testId2'] },
      { responseType: 'blob' }
    )
  })

  it('should call api.ds.patch with patch document PATCH API when the patchDocument service is called', () => {
    // When the patchDocument service is called
    DocumentServices.patchDocument(
      new PatchQuery({
        accountId: '1001',
        documentId: 'tgh',
        operation: 'op1',
        path: 'path1',
        value: 'some value'
      })
    )

    // Then api.ds.patch must have been called with good query
    expect(api.ds.patch).toHaveBeenCalledWith('/1001/documents/tgh', [
      { op: 'op1', path: 'path1', value: 'some value' }
    ])
  })

  it('should call api.ds.get with right url and responseType: buffer', () => {
    // When the downloadPreview service is called
    DocumentServices.downloadPreview(
      new DownloadQuery({
        accountId: '1234',
        documentId: '27'
      })
    )

    // Then api.ds.get must have been called with right parameters
    expect(api.ds.get).toHaveBeenCalledWith('/1234/documents/27/preview', {
      responseType: 'arraybuffer'
    })
  })
})
