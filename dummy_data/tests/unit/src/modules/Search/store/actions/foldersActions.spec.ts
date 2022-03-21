import FoldersActions from '@/modules/Search/store/actions'
import DocumentsServices from '@/modules/Search/services'
import DocumentsFilters from '@/modules/Search/models/Documents/Query/DocumentsFilters'
import DocumentsPaginator from '@/modules/Search/models/Documents/Query/DocumentsPaginator'
import DocumentsSortOptions from '@/modules/Search/models/Documents/Query/DocumentsSortOptions'
import { categoryMock } from '../../mocks/CategoryAPIMock'
import { CreateFolderStateInterface } from '../../../../../../../src/modules/DataManipulation/Create/CreateFolder/store/state'
import { SearchStateInterface } from '@/modules/Search/store/types'
import Documents from '@/modules/Search/models/Documents/Inputs/Documents'
import RootSearchStateInterface from '@/store/types/rootState'
import Folders from '@/modules/Search/models/Folders/Inputs/Folders'
import { DocumentFromAPI } from '@/Common/types/document'
import { UploadStateInterface } from '@/modules/DataManipulation/Upload/store/state'
import Period from '@/Common/models/List/Period'
import { DeleteFoldersStateInterface } from '@/modules/DataManipulation/Delete/DeleteFolder/store/state'
import { DeleteFileStateInterface } from '@/modules/DataManipulation/Delete/DeleteFile/store/state'
import { TrashStateInterface } from '@/modules/Trash/store/state'
import { MailToGedStateInterface } from '@/modules/DataManipulation/MailToGed/store/state'

let commit = jest.fn()

const state: SearchStateInterface = {
  folders: Folders.loaded([]),
  documents: Documents.loaded([
    { id: 'testId', name: 'testName' } as DocumentFromAPI
  ]),
  documentsTotalCount: 4454,
  filters: new DocumentsFilters({
    search: 'ss',
    folderId: 99,
    findInChildFolders: true,
    period: new Period()
  }),
  paginator: new DocumentsPaginator({
    pageNumber: 2,
    itemsPerPage: 10,
    totalItems: 0
  }),
  sortOptions: new DocumentsSortOptions({
    sortBy: 'date',
    sortDirection: 'ascending'
  }),
  isPreviewLoading: false,
  previewDocumentImage: new Blob([]),
  multipleDownloadLoading: false,
  isDownloading: false
}

const rootState: RootSearchStateInterface = {
  app: {
    account: {
      AccountId: '1001'
    }
  },
  GED: {
    Trash: {} as TrashStateInterface,
    Search: state,
    DataManipulation: {
      MailToGed: {} as MailToGedStateInterface,
      Upload: {} as UploadStateInterface,
      DeleteFolders: {} as DeleteFoldersStateInterface,
      DeleteFile: {} as DeleteFileStateInterface,
      CreateFolder: {} as CreateFolderStateInterface
    }
  }
}

describe('foldersActions', () => {
  beforeEach(() => {
    commit = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('fetchFolders', () => {
    it('should call the fetchFolders services and WHEN RESOLVED commit the result', async () => {
      // Given the service return a resolved value
      jest.spyOn(DocumentsServices, 'fetchFolders').mockReturnValue({
        data: [{ ...categoryMock }]
      } as never)

      // When I call the fetchFolders action
      await FoldersActions.fetchFolders({
        rootState,
        commit,
        state
      })

      // Then fetchFolders service must be called
      expect(DocumentsServices.fetchFolders).toHaveBeenCalledWith('1001')
      expect(commit).toHaveBeenNthCalledWith(1, 'SET_FOLDERS', {
        collection: [],
        state: 'loading'
      })
      expect(commit).toHaveBeenNthCalledWith(2, 'SET_FOLDERS', {
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

    it('should call the fetchFolders services and WHEN there is an exception commit errored result', async () => {
      // Given the service return a resolved value
      jest.spyOn(DocumentsServices, 'fetchFolders').mockImplementation(() => {
        throw new Error('special one')
      })

      // When I call the fetchDocuments action
      await FoldersActions.fetchFolders({
        rootState,
        commit,
        state
      })

      // Then fetchDocuments service must be called
      expect(DocumentsServices.fetchFolders).toHaveBeenCalledWith('1001')
      expect(commit).toHaveBeenNthCalledWith(1, 'SET_FOLDERS', {
        collection: [],
        state: 'loading'
      })
      expect(commit).toHaveBeenNthCalledWith(2, 'SET_FOLDERS', {
        collection: [],
        state: 'errored'
      })
    })
  })
})
