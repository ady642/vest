import mutations, {
  SET_IS_DOWNLOADING,
  SET_MULTIPLE_DOWNLOAD_LOADING,
  SET_PREVIEW,
  SET_PREVIEW_LOADING
} from '@/modules/Search/store/mutations'
import Documents from '@/modules/Search/models/Documents/Inputs/Documents'
import { documentAPIMock } from '../mocks/DocumentAPIMock'
import { categoryMock } from '../mocks/CategoryAPIMock'
import { SearchStateInterface } from '@/modules/Search/store/types'
import Folders from '@/modules/Search/models/Folders/Inputs/Folders'
import DocumentsFilters from '@/modules/Search/models/Documents/Query/DocumentsFilters'
import Paginator from '@/Common/models/List/Paginator'
import Period from '@/Common/models/List/Period'
import constants from '@/Common/constants'
import Folder from '@/modules/Search/models/Folders/Inputs/Folder'
import DocumentsSortOptions from '@/modules/Search/models/Documents/Query/DocumentsSortOptions'
import Properties from '@/modules/Search/models/Documents/Inputs/Properties'
import { LifeCycleStatus } from '@/modules/Search/models/Documents/Inputs/Document'

describe('Documents mutations', () => {
  it('SET_SORT_OPTIONS', () => {
    const state: SearchStateInterface = {
      sortOptions: new DocumentsSortOptions()
    } as SearchStateInterface

    mutations.SET_SORT_OPTIONS(
      state,
      new DocumentsSortOptions({
        sortBy: 'custom',
        sortDirection: 'ascending'
      })
    )
    expect(state.sortOptions.sortBy).toBe('custom')
    expect(state.sortOptions.sortDirection).toBe('ascending')
  })
  it('SET_DOCUMENTS', () => {
    const state = {
      documents: Documents.loading('this cancel token')
    } as SearchStateInterface

    // When the SET_DOCUMENTS mutation is called
    mutations.SET_DOCUMENTS(state, Documents.loaded([{ ...documentAPIMock }]))
    // Then documents state must be equal to payload
    expect(state.documents).toEqual({
      cancelToken: 'this cancel token',
      collection: [
        {
          comments: 'je suis le bilan comptable',
          createdBy: '',
          id: 'myID',
          folderId: 45454,
          name: 'Mon bilan comptable',
          creationDate: '2018-05-27',
          path: [],
          properties: new Properties({ syncStatus: constants.PENDING_SYNC }),
          restorationStatus: '',
          size: 54545,
          type: 'jpg',
          updatedDate: '2018-05-27',
          preview: '',
          lifecycleStatus: LifeCycleStatus.Treated
        }
      ],
      state: 'loaded'
    })
  })
  it('PUSH_DOCUMENTS', () => {
    const state = {
      documents: Documents.loaded([{ ...documentAPIMock }])
    } as SearchStateInterface

    // When the PUSH_DOCUMENTS mutation is called
    mutations.PUSH_DOCUMENTS(state, Documents.loaded([{ ...documentAPIMock }]))
    // Then documents state must be equal to documents that was here before and the payload
    expect(state.documents).toEqual({
      collection: [
        {
          comments: 'je suis le bilan comptable',
          createdBy: '',
          id: 'myID',
          folderId: 45454,
          name: 'Mon bilan comptable',
          creationDate: '2018-05-27',
          path: [],
          properties: new Properties({ syncStatus: constants.PENDING_SYNC }),
          restorationStatus: '',
          size: 54545,
          type: 'jpg',
          updatedDate: '2018-05-27',
          preview: '',
          lifecycleStatus: LifeCycleStatus.Treated
        },
        {
          comments: 'je suis le bilan comptable',
          createdBy: '',
          id: 'myID',
          folderId: 45454,
          name: 'Mon bilan comptable',
          creationDate: '2018-05-27',
          path: [],
          properties: new Properties({ syncStatus: constants.PENDING_SYNC }),
          restorationStatus: '',
          size: 54545,
          type: 'jpg',
          updatedDate: '2018-05-27',
          preview: '',
          lifecycleStatus: LifeCycleStatus.Treated
        }
      ],
      state: 'loaded'
    })
  })
  it('SET_DOCUMENTS_TOTAL_COUNT', () => {
    const state = {
      documentsTotalCount: 0
    } as SearchStateInterface

    // When the SET_DOCUMENTS_TOTAL_COUNT mutation is called
    mutations.SET_DOCUMENTS_TOTAL_COUNT(state, 4545)
    // Then documentsTotalCount state must be equal to 4545
    expect(state.documentsTotalCount).toEqual(4545)
  })
  it('SET_FOLDERS', () => {
    const state = {
      folders: Folders.loading()
    } as SearchStateInterface

    // When the SET_FOLDERS mutation is called
    mutations.SET_FOLDERS(state, Folders.loaded([{ ...categoryMock }]))
    // Then documents state must be equal to payload
    expect(state.folders).toEqual({
      collection: [
        {
          id: 1,
          name: 'Compta',
          parentId: 0,
          children: [],
          properties: {},
          permissions: []
        }
      ],
      state: 'loaded'
    })
  })
  it('SET_FILTERS', () => {
    const state = {
      filters: new DocumentsFilters()
    } as SearchStateInterface

    // When the SET_FOLDERS mutation is called
    mutations.SET_FILTERS(
      state,
      new DocumentsFilters({
        search: 'ss',
        folderId: 99,
        findInChildFolders: true,
        period: new Period()
      })
    )
    // Then documents state must be equal to payload
    expect(state.filters).toEqual(
      new DocumentsFilters({
        search: 'ss',
        folderId: 99,
        findInChildFolders: true,
        period: new Period()
      })
    )
  })
  it('SET_PAGINATOR', () => {
    const state = {
      paginator: new Paginator()
    } as SearchStateInterface

    // When the SET_PAGINATOR mutation is called
    mutations.SET_PAGINATOR(
      state,
      new Paginator({
        pageNumber: 2,
        itemsPerPage: 10,
        totalItems: 0
      })
    )
    // Then paginator state must be equal to payload
    expect(state.paginator).toEqual(
      new Paginator({
        pageNumber: 2,
        itemsPerPage: 10,
        totalItems: 0
      })
    )
  })
  it('REMOVE_FOLDER', () => {
    const state = {
      folders: Folders.loaded([
        {
          id: 1,
          name: 'Compta',
          parent: { id: 0 },
          children: [
            {
              id: 2,
              name: 'Achat',
              parent: { id: 1 },
              children: [],
              properties: {},
              permissions: []
            }
          ],
          properties: {},
          permissions: []
        }
      ])
    } as SearchStateInterface

    // When the REMOVE_FOLDER mutation is called
    mutations.REMOVE_FOLDER(state, 2)
    // Then the folder must be deleted
    expect(state.folders).toEqual({
      collection: [
        {
          id: 1,
          name: 'Compta',
          parentId: 0,
          children: [],
          properties: {},
          permissions: []
        }
      ],
      state: 'loaded'
    })
  })
  it('PUSH_FOLDER', () => {
    const state = {
      folders: Folders.loaded([
        {
          id: 1122,
          name: 'Comptabilité',
          parent: { id: 0 },
          children: [],
          permissions: [],
          properties: {}
        }
      ])
    } as SearchStateInterface

    // When the PUSH_FOLDER mutation is called
    mutations.PUSH_FOLDER(
      state,
      new Folder({
        id: 55,
        name: 'B',
        parent: { id: 1122 },
        children: [],
        permissions: [],
        properties: {}
      })
    )
    mutations.PUSH_FOLDER(
      state,
      new Folder({
        id: 66,
        name: 'a',
        parent: { id: 1122 },
        children: [],
        permissions: [],
        properties: {}
      })
    )
    // Then documents state must be equal to documents that was here before and the payload and in the correct order(sort)
    expect(state.folders).toEqual({
      collection: [
        {
          id: 1122,
          name: 'Comptabilité',
          parentId: 0,
          children: [
            {
              id: 66,
              name: 'a',
              parentId: 1122,
              children: [],
              permissions: [],
              properties: {}
            },
            {
              id: 55,
              name: 'B',
              parentId: 1122,
              children: [],
              permissions: [],
              properties: {}
            }
          ],
          permissions: [],
          properties: {}
        }
      ],
      state: 'loaded'
    })
  })

  it('PUSH_FOLDER When folder exist already should not add', () => {
    const state = {
      folders: Folders.loaded([
        {
          id: 1122,
          name: 'Comptabilité',
          parent: { id: 0 },
          children: [],
          permissions: [],
          properties: {}
        }
      ])
    } as SearchStateInterface

    // When the PUSH_FOLDER mutation is called
    mutations.PUSH_FOLDER(
      state,
      new Folder({
        id: 55,
        name: 'test',
        parent: { id: 1122 },
        children: [],
        permissions: [],
        properties: {}
      })
    )
    mutations.PUSH_FOLDER(
      state,
      new Folder({
        id: 55,
        name: 'test',
        parent: { id: 1122 },
        children: [],
        permissions: [],
        properties: {}
      })
    )
    // Then documents state must be equal to documents that was here before and the payload
    expect(state.folders).toEqual({
      collection: [
        {
          id: 1122,
          name: 'Comptabilité',
          parentId: 0,
          children: [
            {
              id: 55,
              name: 'test',
              parentId: 1122,
              children: [],
              permissions: [],
              properties: {}
            }
          ],
          permissions: [],
          properties: {}
        }
      ],
      state: 'loaded'
    })
  })

  it('SET_PREVIEW', () => {
    const state = {
      previewDocumentImage: new Blob([''])
    } as SearchStateInterface

    const newBlob = new Blob(['test'])

    mutations[SET_PREVIEW](state, newBlob)

    expect(state.previewDocumentImage).toBe(newBlob)
  })

  it('SET_PREVIEW_LOADING', () => {
    const state = {
      isPreviewLoading: false
    } as SearchStateInterface

    mutations[SET_PREVIEW_LOADING](state, true)

    expect(state.isPreviewLoading).toBe(true)
  })

  it('SET_MULTIPLE_DOWNLOAD_LOADING', () => {
    const state = {
      multipleDownloadLoading: false
    } as SearchStateInterface

    mutations[SET_MULTIPLE_DOWNLOAD_LOADING](state, true)

    expect(state.multipleDownloadLoading).toBe(true)
  })

  it('SET_IS_LOADING', () => {
    const state = {
      isDownloading: false
    } as SearchStateInterface

    mutations[SET_IS_DOWNLOADING](state, true)

    expect(state.isDownloading).toBe(true)
  })
})
