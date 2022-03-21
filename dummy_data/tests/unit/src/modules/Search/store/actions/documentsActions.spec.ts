import DocumentsActions from '@/modules/Search/store/actions'
import DocumentsServices from '@/modules/Search/services'
import DocumentsFilters from '@/modules/Search/models/Documents/Query/DocumentsFilters'
import DocumentsPaginator from '@/modules/Search/models/Documents/Query/DocumentsPaginator'
import DocumentsSortOptions from '@/modules/Search/models/Documents/Query/DocumentsSortOptions'
import { documentAPIMock } from '../../mocks/DocumentAPIMock'
import { SearchStateInterface } from '@/modules/Search/store/types'
import Documents from '@/modules/Search/models/Documents/Inputs/Documents'
import RootSearchStateInterface from '@/store/types/rootState'
import { DocumentsQueryAPI } from '@/modules/Search/models/Documents/Query/DocumentsQuery'
import Folders from '@/modules/Search/models/Folders/Inputs/Folders'
import Paginator from '@/Common/models/List/Paginator'
import { DocumentFromAPI } from '@/Common/types/document'
import { UploadStateInterface } from '@/modules/DataManipulation/Upload/store/state'
import Period from '@/Common/models/List/Period'
import constants from '@/Common/constants'
import { DeleteFoldersStateInterface } from '@/modules/DataManipulation/Delete/DeleteFolder/store/state'
import { DeleteFileStateInterface } from '@/modules/DataManipulation/Delete/DeleteFile/store/state'
import { CreateFolderStateInterface } from '@/modules/DataManipulation/Create/CreateFolder/store/state'
import { TrashStateInterface } from '@/modules/Trash/store/state'
import { MailToGedStateInterface } from '@/modules/DataManipulation/MailToGed/store/state'
import PatchCommentQuery from '@/modules/Search/models/Documents/Query/PatchCommentQuery'
import documentsActions from '@/modules/Search/store/actions/documentsActions'
import { LifeCycleStatus } from '@/modules/Search/models/Documents/Inputs/Document'

let commit = jest.fn()
const dispatch = jest.fn()

const state: SearchStateInterface = {
  folders: Folders.loaded([]),
  documents: Documents.loaded([
    { id: 'testId', name: 'testName' } as DocumentFromAPI
  ]),
  documentsTotalCount: 205,
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

describe('DocumentsActions', () => {
  beforeEach(() => {
    commit = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('fetchDocuments action', () => {
    const cleanDocumentsCases = [
      { cleanDocuments: true, documentMutation: 'SET_DOCUMENTS' },
      { cleanDocuments: false, documentMutation: 'PUSH_DOCUMENTS' }
    ]

    test.each(cleanDocumentsCases)(
      'should call the fetchDocuments services and WHEN RESOLVED commit the result',
      async ({ cleanDocuments, documentMutation }) => {
        // Given the service return a resolved value
        jest.spyOn(DocumentsServices, 'fetchDocuments').mockReturnValue({
          data: [documentAPIMock],
          headers: {
            'content-range': 'documents 1-10/1000'
          }
        } as never)

        // When I call the fetchDocuments action
        await DocumentsActions.fetchDocuments(
          {
            rootState,
            commit,
            dispatch,
            state
          },
          cleanDocuments
        )

        // Then fetchDocuments service must be called
        expect(DocumentsServices.fetchDocuments).toHaveBeenCalledWith(
          {
            skip: 10,
            limit: 10,
            accountNumberOrId: '1001',
            search: 'ss',
            findInChildFolders: true,
            folderId: 99,
            sort: '+date',
            certified: undefined
          } as DocumentsQueryAPI,
          { cancel: expect.anything(), token: 'the cancel token' }
        )
        expect(commit).toHaveBeenNthCalledWith(1, documentMutation, {
          collection: [],
          state: 'loading',
          cancelToken: { cancel: expect.anything(), token: 'the cancel token' }
        })
        expect(dispatch).toHaveBeenNthCalledWith(1, 'setPaginator', {
          pageNumber: 2,
          itemsPerPage: 10,
          totalItems: 1000
        })
        expect(commit).toHaveBeenNthCalledWith(2, documentMutation, {
          collection: [
            {
              comments: 'je suis le bilan comptable',
              createdBy: '',
              id: 'myID',
              folderId: 45454,
              name: 'Mon bilan comptable',
              creationDate: '2018-05-27',
              path: [],
              properties: {
                syncStatus: constants.PENDING_SYNC,
                hasSubscribedToVault: false
              },
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
      }
    )

    it('should call the fetchDocuments services and WHEN the request is canceled DONT commit errored result', async () => {
      jest.spyOn(DocumentsServices, 'fetchDocuments').mockImplementation(() => {
        throw new Error() // Error without message
      })

      await DocumentsActions.fetchDocuments({
        rootState,
        commit,
        dispatch,
        state
      })

      expect(commit).not.toHaveBeenNthCalledWith(2, 'SET_DOCUMENTS', {
        collection: [],
        state: 'errored'
      })
    })

    it('should call the fetchDocuments services and WHEN there is an exception commit errored result', async () => {
      jest.spyOn(DocumentsServices, 'fetchDocuments').mockImplementation(() => {
        throw new Error('special one')
      })

      await DocumentsActions.fetchDocuments({
        rootState,
        commit,
        dispatch,
        state
      })

      expect(DocumentsServices.fetchDocuments).toHaveBeenCalledWith(
        {
          skip: 10,
          limit: 10,
          accountNumberOrId: '1001',
          findInChildFolders: true,
          folderId: 99,
          search: 'ss',
          sort: '+date'
        } as DocumentsQueryAPI,
        { cancel: expect.anything(), token: 'the cancel token' }
      )
      expect(commit).toHaveBeenNthCalledWith(1, 'SET_DOCUMENTS', {
        collection: [],
        state: 'loading',
        cancelToken: { cancel: expect.anything(), token: 'the cancel token' }
      })
      expect(commit).toHaveBeenNthCalledWith(2, 'SET_DOCUMENTS', {
        collection: [],
        state: 'errored'
      })
    })
  })
  describe('fetchAndPushDocuments', () => {
    it('should dispatch fetchDocuments with cleanDocuments at false', () => {
      DocumentsActions.fetchAndPushDocuments({
        dispatch
      })

      expect(dispatch).toHaveBeenNthCalledWith(1, 'fetchDocuments', false)
    })
  })

  describe('setFilters', () => {
    it('should make changes and commit SET_FILTERS', () => {
      DocumentsActions.setFilters(
        {
          commit,
          state
        },
        new DocumentsFilters({
          search: 'ss',
          folderId: 99,
          findInChildFolders: true,
          period: new Period()
        })
      )

      expect(commit).toHaveBeenNthCalledWith(
        1,
        'SET_FILTERS',
        new DocumentsFilters({
          search: 'ss',
          folderId: 99,
          findInChildFolders: true,
          period: new Period()
        })
      )
    })
  })
  describe('setSortOptions', () => {
    it('should make changes and commit SET_SORT_OPTIONS', () => {
      DocumentsActions.setSortOptions(
        {
          commit
        },
        new DocumentsSortOptions({
          sortBy: 'date',
          sortDirection: 'ascending'
        })
      )

      expect(commit).toHaveBeenNthCalledWith(
        1,
        'SET_SORT_OPTIONS',
        new DocumentsSortOptions({
          sortBy: 'date',
          sortDirection: 'ascending'
        })
      )
    })
  })

  describe('setPaginator', () => {
    it('should make changes and commit SET_PAGINATOR', () => {
      DocumentsActions.setPaginator(
        { commit },

        new Paginator({
          pageNumber: 2,
          itemsPerPage: 10,
          totalItems: 0
        })
      )

      expect(commit).toHaveBeenNthCalledWith(
        1,
        'SET_PAGINATOR',
        new Paginator({
          pageNumber: 2,
          itemsPerPage: 10,
          totalItems: 0
        })
      )
    })
  })

  describe('downloadDocument', () => {
    it('service resolved', async () => {
      // Given the downloadDocument service return a base64 file (string)
      jest
        .spyOn(DocumentsServices, 'downloadDocument')
        .mockResolvedValue({ data: 'test' } as never)

      jest.mock('@/Common/hooks/useDownload', () => ({
        downloadFile: jest.fn()
      }))

      // When I call the downloadDocument action
      await DocumentsActions.downloadDocument(
        {
          state,
          rootState,
          commit
        },
        'testId'
      )

      // Then the downloadDocument service must have been called and the downloaded document must be commited
      expect(commit).toHaveBeenNthCalledWith(1, 'SET_IS_DOWNLOADING', true)
      expect(DocumentsServices.downloadDocument).toHaveBeenCalledWith({
        accountId: '1001',
        documentId: 'testId'
      })
      expect(commit).toHaveBeenNthCalledWith(2, 'SET_IS_DOWNLOADING', false)
    })
  })
  describe('downloadDocuments', () => {
    it('service resolved', async () => {
      // Given the downloadDocuments service return a base64 file (string)
      jest
        .spyOn(DocumentsServices, 'downloadDocuments')
        .mockResolvedValue({ data: 'test' } as never)

      jest.mock('@/Common/helpers/downloadDocumentsHelper', () => ({
        DownloadAsZip: jest.fn()
      }))

      // When I call the downloadDocument action
      await DocumentsActions.downloadDocuments(
        {
          rootState,
          commit
        },
        ['testId']
      )

      // Then the downloadDocument service must have been called
      expect(commit).toHaveBeenNthCalledWith(
        1,
        'SET_MULTIPLE_DOWNLOAD_LOADING',
        true
      )
      expect(DocumentsServices.downloadDocuments).toHaveBeenCalledWith('1001', [
        'testId'
      ])
      expect(commit).toHaveBeenNthCalledWith(
        2,
        'SET_MULTIPLE_DOWNLOAD_LOADING',
        false
      )
    })
  })
  describe('fetchDocumentsTotalCount', () => {
    it('should call the fetchDocuments services and WHEN RESOLVED commit the total', async () => {
      // Given the service return a resolved value
      jest.spyOn(DocumentsServices, 'fetchDocuments').mockReturnValue({
        data: [documentAPIMock],
        headers: {
          'content-range': 'documents 1-10/2754'
        }
      } as never)

      // When I call the fetchDocumentsTotalCount action
      await DocumentsActions.fetchDocumentsTotalCount({
        rootState,
        commit,
        dispatch,
        state
      })

      // Then fetchDocuments service must be called
      expect(DocumentsServices.fetchDocuments).toHaveBeenCalledWith({
        search: 'ss',
        skip: 0,
        limit: 1,
        accountNumberOrId: '1001',
        sort: '-updated'
      } as DocumentsQueryAPI)
      expect(commit).toHaveBeenNthCalledWith(
        1,
        'SET_DOCUMENTS_TOTAL_COUNT',
        2754
      )
    })
  })

  describe('patchDocumentComment', () => {
    it('service resolved', async () => {
      jest
        .spyOn(DocumentsServices, 'patchDocument')
        .mockResolvedValue({ data: 'test' } as never)

      // When I call the downloadDocument action
      await DocumentsActions.patchDocumentComment(
        {
          rootState,
          commit
        },
        new PatchCommentQuery({
          documentId: 'tgh',
          value: 'some value'
        })
      )

      // Then the downloadDocument service must have been called and the downloaded document must be commited
      expect(DocumentsServices.patchDocument).toHaveBeenCalledWith({
        accountId: '1001',
        documentId: 'tgh',
        operation: 'replace',
        path: '/comments',
        value: 'some value'
      })
    })
  })

  describe('downloadPreview', () => {
    it('when API return 200', async () => {
      jest.spyOn(DocumentsServices, 'downloadPreview').mockResolvedValue({
        data: 'test',
        headers: { 'content-type': 'head' }
      } as never)

      await documentsActions.downloadPreview({ commit, rootState }, '27')

      expect(commit).toHaveBeenNthCalledWith(1, 'SET_PREVIEW_LOADING', true)
      expect(DocumentsServices.downloadPreview).toHaveBeenCalledWith({
        accountId: '1001',
        documentId: '27'
      })
      expect(commit).toHaveBeenNthCalledWith(
        2,
        'SET_PREVIEW',
        'data:head;base64,'
      )
      expect(commit).toHaveBeenNthCalledWith(3, 'SET_PREVIEW_LOADING', false)
    })

    it('When API throw exception', async () => {
      jest
        .spyOn(DocumentsServices, 'downloadPreview')
        .mockRejectedValue(new Error('400'))

      await documentsActions.downloadPreview({ commit, rootState }, '27')

      expect(commit).toHaveBeenNthCalledWith(1, 'SET_PREVIEW_LOADING', true)
      expect(DocumentsServices.downloadPreview).toHaveBeenCalledWith({
        accountId: '1001',
        documentId: '27'
      })
      expect(commit).toHaveBeenNthCalledWith(2, 'SET_PREVIEW', null)
      expect(commit).toHaveBeenNthCalledWith(3, 'SET_PREVIEW_LOADING', false)
    })
  })
})
