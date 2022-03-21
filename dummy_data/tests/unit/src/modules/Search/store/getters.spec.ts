import getters from '@/modules/Search/store/getters'
import { SearchStateInterface } from '@/modules/Search/store/types'
import { documentAPIMock } from '../mocks/DocumentAPIMock'
import { categoryMock } from '../mocks/CategoryAPIMock'
import Documents from '@/modules/Search/models/Documents/Inputs/Documents'
import Folders from '@/modules/Search/models/Folders/Inputs/Folders'
import DocumentsFilters, {
  DocumentsFiltersAPI,
  DocumentsFiltersParams
} from '@/modules/Search/models/Documents/Query/DocumentsFilters'
import Paginator from '@/Common/models/List/Paginator'
import DocumentsPaginator from '@/modules/Search/models/Documents/Query/DocumentsPaginator'
import Period from '@/Common/models/List/Period'
import constants from '@/Common/constants'
import DocumentsSortOptions from '@/modules/Search/models/Documents/Query/DocumentsSortOptions'
import Properties from '@/modules/Search/models/Documents/Inputs/Properties'
import { LifeCycleStatus } from '@/modules/Search/models/Documents/Inputs/Document'

let state = {} as SearchStateInterface

describe('Documents getters', () => {
  it('should return sort options when I called sortOptions getter', () => {
    const sortOptions = new DocumentsSortOptions({
      sortBy: 'name',
      sortDirection: 'ascending'
    })

    state = {
      sortOptions: sortOptions
    } as SearchStateInterface

    expect(getters.sortOptions(state)).toEqual(sortOptions)
  })
  it('should return documents when I called documents getter', () => {
    // Given documents state is set
    state = {
      documents: Documents.loaded([documentAPIMock])
    } as SearchStateInterface

    // When I call the documents getter
    const documents = getters.documents(state)

    // Then documents must be equal to state.documents
    expect(documents).toEqual({
      state: 'loaded',
      collection: [
        {
          comments: documentAPIMock.comments,
          createdBy: documentAPIMock.createdBy,
          id: documentAPIMock.id,
          folderId: documentAPIMock.folder.id,
          name: documentAPIMock.name,
          creationDate: documentAPIMock.creationDate,
          path: documentAPIMock.folder.path,
          properties: new Properties({ syncStatus: constants.PENDING_SYNC }),
          restorationStatus: '',
          size: documentAPIMock.size,
          type: documentAPIMock.type,
          updatedDate: documentAPIMock.updated,
          preview: '',
          lifecycleStatus: LifeCycleStatus.Treated
        }
      ]
    })
  })

  it('should return documentsTotalCount when I called documentsTotalCount getter', () => {
    // Given documentsTotalCount state is set
    state = {
      documentsTotalCount: 5401
    } as SearchStateInterface

    // When I call the documentsTotalCount getter
    const documentsTotalCount = getters.documentsTotalCount(state)

    // Then documents must be equal to state.documentsTotalCount
    expect(documentsTotalCount).toEqual(5401)
  })

  it('should return folders when I called folders getter', () => {
    // Given folders state is set
    state = {
      folders: Folders.loaded([categoryMock])
    } as SearchStateInterface

    // When I call the folders getter
    const folders = getters.folders(state)

    // Then folders must be equal to state.folders
    expect(folders).toEqual({
      state: 'loaded',
      collection: [
        {
          id: 1,
          name: 'Compta',
          parentId: 0,
          children: [],
          properties: {},
          permissions: []
        }
      ]
    })
  })

  it('should return filters when I called filters getter', () => {
    // Given documents state is set
    state = {
      filters: new DocumentsFilters({
        search: 'ss',
        folderId: 99,
        findInChildFolders: true,
        period: new Period()
      })
    } as SearchStateInterface

    // When I call the filters getter
    const filters = getters.filters(state)

    // Then documents must be equal to state.filters
    expect(filters).toEqual({
      findInChildFolders: true,
      folderId: 99,
      search: 'ss',
      period: new Period(),
      certified: 'all'
    })
  })

  it('should return paginator when I called paginator getter', () => {
    // Given paginator state is set
    state = {
      paginator: new Paginator({
        pageNumber: 2,
        itemsPerPage: 10,
        totalItems: 0
      })
    } as SearchStateInterface

    // When I call the paginator getter
    const paginator = getters.paginator(state)

    // Then documents must be equal to state.paginator
    expect(paginator).toEqual({
      pageNumber: 2,
      itemsPerPage: 10,
      totalItems: 0
    })
  })

  describe('areAllDocumentsLoaded', () => {
    const allDocumentsCases = [
      { totalItems: 1, areAllDocuments: true },
      { totalItems: 2, areAllDocuments: false }
    ]

    it.each(allDocumentsCases)(
      'should $areAllDocuments true when totalItems is equal to $totalItems',
      ({ totalItems, areAllDocuments }) => {
        state = {
          documents: Documents.loaded([documentAPIMock]),
          paginator: new DocumentsPaginator({
            totalItems,
            itemsPerPage: 10,
            pageNumber: 1
          })
        } as SearchStateInterface

        const areAllDocumentsLoaded = getters.areAllDocumentsLoaded(state)

        expect(areAllDocumentsLoaded).toEqual(areAllDocuments)
      }
    )
  })

  describe('activeFiltersCount', () => {
    const activeFiltersCount = [
      {
        filters: new DocumentsFilters({
          search: '',
          period: new Period({
            startDate: '2012-05-04',
            endDate: ''
          }),
          folderId: 45,
          findInChildFolders: false
        }),
        expectedActiveFiltersCount: 1
      },
      {
        filters: new DocumentsFilters({
          search: '',
          period: new Period(),
          folderId: 45,
          findInChildFolders: false
        }),
        expectedActiveFiltersCount: 0
      }
    ]

    it.each(activeFiltersCount)(
      'should $activeFiltersCounts 1 when period is set',
      ({ filters, expectedActiveFiltersCount }) => {
        state = {
          filters
        } as SearchStateInterface

        const activeFiltersCounts = getters.activeFiltersCount(state)

        expect(activeFiltersCounts).toEqual(expectedActiveFiltersCount)
      }
    )
  })

  describe('searchActive', () => {
    const searchActiveCases = [
      {
        filters: new DocumentsFilters({
          search: 'test',
          period: new Period(),
          folderId: 45,
          findInChildFolders: false
        }),
        expectedSearchActive: true
      },
      {
        filters: new DocumentsFilters({
          search: '',
          period: new Period(),
          folderId: 45,
          findInChildFolders: false
        }),
        expectedSearchActive: false
      }
    ]

    it.each(searchActiveCases)(
      'should $searchActive be true when search is set',
      ({ filters, expectedSearchActive }) => {
        state = {
          filters
        } as SearchStateInterface

        const searchActive = getters.searchActive(state)

        expect(searchActive).toEqual(expectedSearchActive)
      }
    )
  })

  it('should return preview when I called preview getter', () => {
    // Given preview state is set
    state = {
      previewDocumentImage: new Blob(['test'])
    } as SearchStateInterface

    // When I call the preview getter
    const previewDocumentImage = getters.previewDocumentImage(state)

    // Then preview must be equal to state.preview
    expect(previewDocumentImage).toEqual(new Blob(['test']))
  })

  it('should return previewLoading when I called previewLoading getter', () => {
    // Given isPreviewLoading state is set
    state = {
      isPreviewLoading: true
    } as SearchStateInterface

    // When I call the isPreviewLoading getter
    const isPreviewLoading = getters.isPreviewLoading(state)

    // Then preview must be equal to state.preview
    expect(isPreviewLoading).toEqual(true)
  })

  it('should return multipleDownloadLoading when I called multipleDownloadLoading getter', () => {
    // Given multipleDownloadLoading state is set
    state = {
      multipleDownloadLoading: true
    } as SearchStateInterface

    // When I call the multipleDownloadLoading getter
    const multipleDownloadLoading = getters.multipleDownloadLoading(state)

    // Then multipleDownloadLoading must be equal to state.preview
    expect(multipleDownloadLoading).toEqual(true)
  })

  it('should return isDownloading when I called isDownloading getter', () => {
    // Given isDownloading state is set
    state = {
      isDownloading: true
    } as SearchStateInterface

    // When I call the multipleDownloadLoading getter
    const isDownloading = getters.isDownloading(state)

    // Then isDownloading must be equal to state.preview
    expect(isDownloading).toEqual(true)
  })

  it('should return areAnyFilters when I called areAnyFilters getter', () => {
    state = {
      filters: new DocumentsFilters({
        search: 'test'
      } as DocumentsFiltersParams)
    } as SearchStateInterface

    expect(getters.areAnyFilters(state)).toEqual(true)
  })
})
