import ArboView from '@/modules/Search/views/ArboView.vue'
import ArboViewLayout from '@/modules/Search/components/Layouts/ArboViewLayout.vue'
import BasicLayout from '@/modules/Search/components/Layouts/BasicLayout.vue'
import ArboHeader from '@/modules/Search/components/Headers/ArboHeader.vue'
import NattoPagination from '@/Common/components/Paging/NattoPagination.vue'
import DocumentsTable from '@/modules/Search/components/DocumentsTable/DocumentsTable.vue'
import Folders from '@/modules/Search/models/Folders/Inputs/Folders'
import Documents from '@/modules/Search/models/Documents/Inputs/Documents'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import Paginator from '@/Common/models/List/Paginator'
import DocumentsFoldersBrowser from '@/modules/Search/components/Navigation/DocumentsFoldersBrowser.vue'
import useElementStubs from 'dummy_data/tests/unit/utils/useElementStubs'
import ArboDocumentsTable from '@/modules/Search/components/DocumentsTable/ArboDocumentsTable.vue'
import { ArboDocumentsTableWrapper } from 'dummy_data/tests/unit/src/modules/Search/components/DocumentsTable/ArboDocumentsTable.spec'
import DocumentsSearchFilters from '@/modules/Search/components/Filters/DocumentsSearchFilters.vue'
import DocumentsFilters from '@/modules/Search/models/Documents/Query/DocumentsFilters'
import FileUpload, {
  StateUpload
} from '@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload'
import Period from '@/Common/models/List/Period'
import constants from '@/Common/constants'
import { createSearchStoreMocked } from 'tests/unit/__mocks__/storeMock'
import { flushPromises, VueWrapper } from '@vue/test-utils'
import { ComponentPublicInstance } from 'vue'
import { DocumentsSearchFiltersWrapper } from '../components/Filters/DocumentsSearchFilters.spec'
import {
  pageViewFactory,
  trackEventFactory
} from '@/Common/helpers/analyticsLog'
import { router } from '@kpmg/mypulse-shared-dependencies'
import GedCardUploadBox from '@/Common/components/Home/Card/GedCardContent/UploadBox/GedCardUploadBox.vue'
import DocumentsSortOptions from '@/modules/Search/models/Documents/Query/DocumentsSortOptions'
import { createFileStoreMock } from 'dummy_data/tests/unit/__mocks__/storeMock/createStoreMock'
import DocumentsPaginator from '@/modules/Search/models/Documents/Query/DocumentsPaginator'
import { DocumentDetailsDrawerTypeWrapper } from '../components/Drawer/DocumentDetailsDrawer.spec'
import Document, {
  LifeCycleStatus
} from '@/modules/Search/models/Documents/Inputs/Document'
import { DocumentFromAPI } from '@/Common/types/document'
import { findDocumentDetailsDrawer } from '../../../../utils/finders'

jest.mock('@/Common/helpers/analyticsLog', () => ({
  trackEventFactory: jest.fn(),
  pageViewFactory: jest.fn()
}))

/****
 * Wrapper types
 */
type ArboViewProps = {
  isDocumentUploadModalOpened: boolean
}

type ArboViewSetup = {
  handleFilesDropped: (filesData: File[]) => void
  isTableDropZoneDisabled: boolean
  canUpload: boolean
  hasAccessDs: boolean
  activeFiltersCount: number
  folders: Folders
  documents: Documents
  documentsTotalCount: number
  paginator: DocumentsPaginator
  handleChangeInput: () => void
  pageChanged: () => void
  handleFilesOnChange: () => void
  searchFolderId: number
  dispatchDownloadDocument: (documentId: string) => void
  filters: DocumentsFilters
  goToMainView: () => void
  dispatchSetSearchFolderId: () => void
  handleChangeFilters: () => void
  handleResetFilters: () => void
  isUploading: boolean
  sortOptions: DocumentsSortOptions
  sortTableHandler: () => void
}

export type ArboViewWrapper = VueWrapper<
  ComponentPublicInstance<ArboViewProps, ArboViewSetup>
>

const { ElPagination } = useElementStubs()

const routerMock = router

const docsData = Documents.loaded([
  {
    id: 'myID',
    type: 'jpg',
    isUploadedInGedLoop: false,
    name: 'Mon bilan comptable',
    creationDate: '2018-05-27',
    account: { id: 'test', name: 'testet' },
    comments: 'je suis le bilan comptable',
    content: { href: 'https://kpmg.fr' },
    created: '2018-05-27',
    createdBy: '',
    folder: {
      id: 45454,
      path: []
    },
    preview: {
      href: ''
    },
    updatedBy: '',
    properties: {
      syncStatus: constants.SUCCESS_SYNC,
      'Scanner Source': '',
      'Total Excluding VAT': 2102
    },
    size: 54545,
    updated: '',
    folderId: 1234,
    restorationStatus: 'InProgress',
    lifecycleStatus: LifeCycleStatus.Treated
  }
])

const foldersData = Folders.loaded([
  {
    id: 1122,
    name: 'Comptabilité',
    parent: { id: 0 },
    children: [
      {
        id: 1123,
        name: 'Autre',
        parent: { id: 1222 },
        children: [],
        properties: {},
        permissions: []
      },
      {
        id: 1124,
        name: 'Caisse',
        parent: { id: 1222 },
        children: [],
        properties: {},
        permissions: []
      }
    ],
    properties: {},
    permissions: []
  }
])

const createWrapper = (
  store = createSearchStoreMocked({ folders: foldersData })
) =>
  wrapperFactory(ArboView, {
    props: {
      isDocumentUploadModalOpened: true
    },
    global: {
      plugins: [store],
      stubs: {
        ArboViewLayout,
        ArboHeader,
        NattoPagination,
        DocumentsTable,
        BasicLayout,
        DocumentsFoldersBrowser,
        ElPagination,
        DocumentsSearchFilters,
        GedCardUploadBox,
        ArboDocumentsTable
      }
    }
  })

/*
 *** Wrapper Finders
 */

const findArboDocumentsTable = (
  wrapper: ArboViewWrapper
): ArboDocumentsTableWrapper => wrapper.findComponent(ArboDocumentsTable)

const findDocumentsSearchFilters = (
  wrapper: ArboViewWrapper
): DocumentsSearchFiltersWrapper =>
  wrapper.findComponent(DocumentsSearchFilters)

let wrapper = createWrapper()
let arboDocumentsTableWrapper = findArboDocumentsTable(wrapper)
let documentDetailsDrawer = findDocumentDetailsDrawer(wrapper)
let storeMock = createSearchStoreMocked()

storeMock.dispatch = jest.fn()

describe('ArboView', () => {
  beforeEach(async () => {
    // Given ArboView is mounted
    storeMock = createSearchStoreMocked()
    storeMock.dispatch = jest.fn()

    wrapper = createWrapper(storeMock)
    arboDocumentsTableWrapper = findArboDocumentsTable(wrapper)
    documentDetailsDrawer = findDocumentDetailsDrawer(wrapper)
    expect(pageViewFactory).toBeCalledWith('arboview-pgv')
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  describe('at creation', () => {
    it('init paginator and searchFolderId', async () => {
      // Given ArboView is mounted
      wrapper = createWrapper()
      // At mounted we set the searchFolderId with the value pass in props(from the router)

      expect(storeMock.dispatch).toHaveBeenCalledWith(
        'GED/Search/setPaginator',
        {
          pageNumber: 1,
          itemsPerPage: constants.ARBO_VIEW_ITEMS_PER_PAGE,
          totalItems: 0
        }
      )

      expect(storeMock.dispatch).toHaveBeenCalledWith('GED/Search/setFilters', {
        findInChildFolders: false,
        folderId: 99,
        search: '',
        period: new Period(),
        certified: 'all'
      })
    })
  })
  describe('binding with ArboDocumentsTable', () => {
    describe('props', () => {
      it('Should pass right props from store to BrowseDocumentsTable', () => {
        // When the store getters return those values
        wrapper = createWrapper(
          createSearchStoreMocked({
            folders: foldersData,
            documents: docsData,
            paginator: new Paginator({
              totalItems: 100,
              pageNumber: 1,
              itemsPerPage: 10
            }),
            documentsTotalCount: 5421,
            filters: new DocumentsFilters({
              search: 'test',
              folderId: 4521,
              period: new Period(),
              findInChildFolders: false
            })
          })
        )

        arboDocumentsTableWrapper = findArboDocumentsTable(wrapper)

        // Then those must values must be bound with ArboDocumentsTable
        expect(arboDocumentsTableWrapper.vm.folders).toEqual(foldersData)
        expect(arboDocumentsTableWrapper.vm.documents).toEqual(docsData)
        expect(
          arboDocumentsTableWrapper.vm.documentsTotalInFolderAndChild
        ).toBe(100)
        expect(arboDocumentsTableWrapper.vm.documentsTotalInAllFolders).toBe(
          5421
        )
        expect(arboDocumentsTableWrapper.vm.documentsPerPage).toBe(10)
        expect(arboDocumentsTableWrapper.vm.pageNumber).toBe(1)
        expect(arboDocumentsTableWrapper.vm.search).toBe('test')
        expect(arboDocumentsTableWrapper.vm.searchFolderId).toBe(4521)
        expect(arboDocumentsTableWrapper.vm.sortOptions).toEqual(
          new DocumentsSortOptions({
            sortBy: 'updated',
            sortDirection: 'descending'
          })
        )
      })
      test.each([
        {
          isUploading: false,
          hasPermissionToUploadFile: false,
          hasAccessDs: false,
          expectedDisabled: true
        },
        {
          isUploading: false,
          hasPermissionToUploadFile: false,
          hasAccessDs: true,
          expectedDisabled: true
        },
        {
          isUploading: false,
          hasPermissionToUploadFile: true,
          hasAccessDs: false,
          expectedDisabled: true
        },
        {
          isUploading: false,
          hasPermissionToUploadFile: true,
          hasAccessDs: true,
          expectedDisabled: false
        },
        {
          isUploading: true,
          hasPermissionToUploadFile: false,
          hasAccessDs: false,
          expectedDisabled: true
        },
        {
          isUploading: true,
          hasPermissionToUploadFile: false,
          hasAccessDs: true,
          expectedDisabled: true
        },
        {
          isUploading: true,
          hasPermissionToUploadFile: true,
          hasAccessDs: false,
          expectedDisabled: true
        },
        {
          isUploading: true,
          hasPermissionToUploadFile: true,
          hasAccessDs: true,
          expectedDisabled: true
        }
      ])(
        'isTableDropZoneDisabled binding',
        ({
          isUploading,
          hasPermissionToUploadFile,
          hasAccessDs,
          expectedDisabled
        }) => {
          // Given the wrapper is created with getters return values
          const storeFileMocked = createFileStoreMock({
            hasPermissionToUploadFile,
            isUploading,
            hasAccessDs
          })

          wrapper = createWrapper(storeFileMocked)

          arboDocumentsTableWrapper = findArboDocumentsTable(wrapper)

          // Then the prop isTableDropZoneDisabled must be set to good value
          expect(arboDocumentsTableWrapper.vm.isTableDropZoneDisabled).toBe(
            expectedDisabled
          )
        }
      )
    })
    describe('events', () => {
      it('Should uploadDocuments with state TO_UPLOAD when ArboDocumentsTable emits files-dropped', async () => {
        const store = createFileStoreMock({
          selectedFolderToUpload: 4521,
          files: [
            new FileUpload(
              new File([''], 'File1.pdf', { type: 'text/html' }),
              StateUpload.TO_UPLOAD
            ),
            new FileUpload(
              new File([''], 'File2.pdf', { type: 'text/html' }),
              StateUpload.TO_UPLOAD
            ),
            new FileUpload(
              new File([''], 'File3.pdf', { type: 'text/html' }),
              StateUpload.UPLOADED
            )
          ]
        })

        store.dispatch = jest.fn()
        wrapper = createWrapper(store)

        arboDocumentsTableWrapper = findArboDocumentsTable(wrapper)

        const arrayOfBlob = new Array<Blob>()
        const file1 = new File(arrayOfBlob, 'File1.pdf', {
          type: 'application/pdf'
        })

        const file2 = new File(arrayOfBlob, 'File2.pdf', {
          type: 'application/pdf'
        })

        await arboDocumentsTableWrapper.vm.$emit('files-dropped', [
          file1,
          file2
        ])

        await flushPromises()

        // Then setFiles should have been dispatched
        expect(store.dispatch).toHaveBeenNthCalledWith(
          4,
          'GED/DataManipulation/Upload/setFiles',
          [
            {
              file: file1,
              state: 0,
              destination: null,
              errorDescription: {}
            },
            {
              file: file2,
              state: 0,
              destination: null,
              errorDescription: {}
            }
          ]
        )

        expect(store.dispatch).toHaveBeenNthCalledWith(
          5,
          'GED/DataManipulation/Upload/setFileDestination',
          { index: 0, destinationId: 4521 }
        )
        expect(store.dispatch).toHaveBeenNthCalledWith(
          6,
          'GED/DataManipulation/Upload/setFileState',
          { index: 0, fileState: StateUpload.PENDING }
        )
        expect(store.dispatch).toHaveBeenNthCalledWith(
          7,
          'GED/DataManipulation/Upload/setFileDestination',
          { index: 1, destinationId: 4521 }
        )
        expect(store.dispatch).toHaveBeenNthCalledWith(
          8,
          'GED/DataManipulation/Upload/setFileState',
          { index: 1, fileState: StateUpload.PENDING }
        )
        expect(store.dispatch).toHaveBeenNthCalledWith(
          9,
          'GED/DataManipulation/Upload/uploadDocuments',
          [0, 1]
        )
        expect(store.dispatch).toHaveBeenNthCalledWith(
          10,
          'GED/Search/fetchDocuments'
        )

        // And on-files-droppred must be emitted
        expect(wrapper.emitted('on-files-dropped')).toHaveLength(1)
      })
      it('Should dispatch setPaginator and fetchDocuments when page-opened is emitted', async () => {
        await arboDocumentsTableWrapper.vm.$emit('page-opened', 5)

        expect(trackEventFactory).toBeCalledWith('adv-paginate', 5)
        expect(storeMock.dispatch).toHaveBeenCalledWith(
          'GED/Search/setPaginator',
          { itemsPerPage: 100, pageNumber: 5, totalItems: 0 }
        )

        expect(storeMock.dispatch).toHaveBeenCalledWith(
          'GED/Search/fetchDocuments'
        )
      })
      it('should dispatch downloadDocument when BrowseDocumentsTable emit on-download-document', async () => {
        // When ArboDocumentsTable emit on-download-document
        await arboDocumentsTableWrapper.vm.$emit(
          'on-download-document',
          'document-id'
        )

        expect(trackEventFactory).toBeCalledWith('adv-download-file')
        expect(storeMock.dispatch).toHaveBeenCalledWith(
          'GED/Search/downloadDocument',
          'document-id'
        )
      })

      it('Should dispatch with setFilters action when ArboDocumentsTable emits update:selectedFolderToUpload', async () => {
        // When ArboDocumentsTable emits update:searchFolderId
        await arboDocumentsTableWrapper.vm.$emit('update:searchFolderId', 27)

        // Then dispatch with setFilters action must be call with 27
        expect(storeMock.dispatch).toHaveBeenCalledWith(
          'GED/Search/setFilters',
          {
            findInChildFolders: false,
            folderId: 27,
            search: '',
            period: new Period(),
            certified: 'all'
          }
        )
      })

      it('Should go to main view when click on total count and dont reset filters', async () => {
        // When ArboDocumentsTable emits click-on-total-count
        await arboDocumentsTableWrapper.vm.$emit('click-on-total-count')

        // Then we should go to main view keeping the search (without reset the filters)
        expect(storeMock.dispatch).not.toHaveBeenCalledWith(
          'GED/Search/setFilters',
          {
            findInChildFolders: false,
            folderId: 4521,
            period: { endDate: '', startDate: '' },
            search: 'test'
          }
        )
        expect(routerMock.push).toHaveBeenCalledWith({
          name: 'MainView',
          query: {
            search: true
          }
        })
      })

      it('Should change filters store and fetch documents when change-filters fired', async () => {
        const documentsSearchFiltersWrapper =
          findDocumentsSearchFilters(wrapper)

        const period = new Period({
          startDate: '2018-02-01T23:00:00.000Z',
          endDate: '2019-06-05T22:00:00.000Z'
        })

        const filters = new DocumentsFilters()

        filters.period = period
        filters.certified = true

        await documentsSearchFiltersWrapper.vm.$emit('change-filters', filters)

        expect(storeMock.dispatch).toHaveBeenCalledWith(
          'GED/Search/setFilters',
          {
            findInChildFolders: false,
            folderId: 0,
            search: '',
            period,
            certified: 'all'
          }
        )
        expect(storeMock.dispatch).toHaveBeenCalledWith(
          'GED/Search/setFilters',
          {
            findInChildFolders: false,
            folderId: 0,
            search: '',
            period: new Period(),
            certified: true
          }
        )
      })

      it('Should change filters store and fetch documents when reset-search-filters fired', async () => {
        const storeMockSample = createSearchStoreMocked({
          filters: new DocumentsFilters({
            search: 'not test',
            folderId: 99,
            period: new Period({
              startDate: 'debut-de-2021',
              endDate: 'fin-de-2021'
            }),
            findInChildFolders: false
          })
        })

        wrapper = createWrapper(storeMockSample)
        const documentsSearchFiltersWrapper =
          findDocumentsSearchFilters(wrapper)

        await documentsSearchFiltersWrapper.vm.$emit('reset-filters')
        await wrapper.vm.$nextTick()

        expect(storeMock.dispatch).toHaveBeenCalledWith(
          'GED/Search/setFilters',
          {
            findInChildFolders: false,
            folderId: 99,
            search: '',
            period: new Period(),
            certified: 'all'
          }
        )
      })
      it('Should dispatch setSortOptions on sort-arbo-table', async () => {
        await arboDocumentsTableWrapper.vm.$emit(
          'sort-arbo-table',
          new DocumentsSortOptions({
            sortBy: 'name',
            sortDirection: 'ascending'
          })
        )

        expect(storeMock.dispatch).toBeCalledWith(
          'GED/Search/setSortOptions',
          new DocumentsSortOptions({
            sortBy: 'name',
            sortDirection: 'ascending'
          })
        )
      })
      it('Should dispatch fetchDocuments on sort-arbo-table', async () => {
        await arboDocumentsTableWrapper.vm.$emit(
          'sort-arbo-table',
          new DocumentsSortOptions({
            sortBy: 'name',
            sortDirection: 'ascending'
          })
        )

        expect(storeMock.dispatch).toBeCalledWith('GED/Search/fetchDocuments')
      })
    })
  })

  describe('binding with DocumentsSearchFilters', () => {
    describe('props', () => {
      it('Should pass right props to DocumentsSearchFilters', () => {
        wrapper = createWrapper(
          createSearchStoreMocked({
            filters: new DocumentsFilters({
              search: 'test',
              folderId: 4521,
              period: new Period(),
              findInChildFolders: false
            })
          })
        )

        const documentsSearchFiltersWrapper =
          findDocumentsSearchFilters(wrapper)

        expect(documentsSearchFiltersWrapper.vm.search).toBe('test')
        expect(documentsSearchFiltersWrapper.vm.activeFiltersCount).toBe(0)
      })
    })
    describe('events', () => {
      it('Should change filters store and fetch documents when handleChangeInput fired', async () => {
        // Given
        const store = createSearchStoreMocked({
          filters: new DocumentsFilters({
            search: 'not test',
            folderId: 4521,
            period: new Period(),
            findInChildFolders: false
          }),
          paginator: new DocumentsPaginator({
            pageNumber: 5
          })
        })

        store.dispatch = jest.fn()

        wrapper = createWrapper(store)

        const documentsSearchFiltersWrapper =
          findDocumentsSearchFilters(wrapper)

        await documentsSearchFiltersWrapper.vm.$emit('update:search', 'test')

        await flushPromises()

        expect(store.dispatch).toHaveBeenCalledWith('GED/Search/setFilters', {
          findInChildFolders: false,
          folderId: 4521,
          search: 'test',
          period: new Period(),
          certified: 'all'
        })
        expect(store.dispatch).toHaveBeenCalledWith('GED/Search/setPaginator', {
          itemsPerPage: 10,
          pageNumber: 1,
          totalItems: 0
        })
        expect(store.dispatch).toHaveBeenCalledWith('GED/Search/fetchDocuments')
        expect(store.dispatch).toHaveBeenCalledWith(
          'GED/Search/fetchDocumentsTotalCount'
        )
      })
    })
  })
  describe('binding with ArboHeader', () => {
    describe('binding', () => {
      it('Should pass the correct canUploadFiles to child component', async () => {
        const ArboHeaderWrapper = wrapper.findComponent(ArboHeader)

        expect(ArboHeaderWrapper.props('canUploadFiles')).toBe(false)
      })
      it('Should pass the correct hasAccessDs to child component', () => {
        // Given the store return hasAccessDs to true
        const uploadStore = createFileStoreMock({
          hasAccessDs: true
        })

        wrapper = createWrapper(uploadStore)

        // Then hasAccessDs arboHeader prop must be also true
        const ArboHeaderWrapper = wrapper.findComponent(ArboHeader)

        expect(ArboHeaderWrapper.props('hasAccessDs')).toBe(true)
      })
    })
    describe('rendering', () => {
      const arboHeaderCases = [
        { folders: Folders.loading(), arboHeaderExists: false },
        { folders: Folders.loaded([]), arboHeaderExists: true }
      ]

      it.each(arboHeaderCases)(
        'Should manage ArboHeader display in function of folders state',
        async ({ folders, arboHeaderExists }) => {
          wrapper = createWrapper(createSearchStoreMocked({ folders }))

          await wrapper.vm.$nextTick()

          const arboHeaderWrapper = wrapper.findComponent(ArboHeader)

          expect(arboHeaderWrapper.exists()).toBe(arboHeaderExists)
        }
      )
    })
    describe('events', () => {
      it('Should not be disabled when isUploading is false', async () => {
        storeMock.state.GED.DataManipulation.Upload.files = [
          new FileUpload(
            new File([''], 'filename', { type: 'text/html' }),
            StateUpload.UPLOADED
          ),
          new FileUpload(
            new File([''], 'filename', { type: 'text/html' }),
            StateUpload.CANCELED
          )
        ]

        await wrapper.vm.$nextTick()

        const ArboHeaderWrapper = wrapper.findComponent(ArboHeader)

        expect(ArboHeaderWrapper.props('disabledUpload')).toBe(false)
      })
      it('Should be disabled when isUploading is true', async () => {
        storeMock.state.GED.DataManipulation.Upload.files = [
          new FileUpload(
            new File([''], 'filename', { type: 'text/html' }),
            StateUpload.UPLOADING
          ),
          new FileUpload(
            new File([''], 'filename', { type: 'text/html' }),
            StateUpload.PENDING
          )
        ]

        await wrapper.vm.$nextTick()

        const ArboHeaderWrapper = wrapper.findComponent(ArboHeader)

        expect(ArboHeaderWrapper.props('disabledUpload')).toBe(true)
      })
      it('Should dispatch setFiles when ArboHeader emits upload-triggered', async () => {
        const store = createSearchStoreMocked({
          filters: new DocumentsFilters({
            folderId: 27,
            search: '',
            period: new Period(),
            findInChildFolders: false
          })
        })

        store.dispatch = jest.fn()
        wrapper = createWrapper(store)

        const arboHeaderWrapper = wrapper.findComponent(ArboHeader)

        const arrayOfBlob = new Array<Blob>()
        const file1 = new File(arrayOfBlob, 'File1.pdf', {
          type: 'application/pdf'
        })

        const file2 = new File(arrayOfBlob, 'File2.pdf', {
          type: 'application/pdf'
        })

        await arboHeaderWrapper.vm.$emit('upload-triggered', [file1, file2])

        await flushPromises()

        expect(trackEventFactory).toBeCalledWith('adv-cta-upload-widget-click')
        // Then setFiles should have been dispatched
        expect(store.dispatch).toHaveBeenCalledWith(
          'GED/DataManipulation/Upload/setFiles',
          [
            {
              file: file1,
              state: 0,
              destination: null,
              errorDescription: {}
            },
            {
              file: file2,
              state: 0,
              destination: null,
              errorDescription: {}
            }
          ]
        )

        // And setSelectedFolderToUpload must have been dispatched with searchFolderId value
        expect(store.dispatch).toHaveBeenCalledWith(
          'GED/DataManipulation/Upload/setSelectedFolderToUpload',
          27
        )
      })
      it('Should go to the main view when back-click ArboHeader emits back-click when currentfolder parentId is  0', async () => {
        // When ArboHeader emits back-click
        wrapper = createWrapper(
          createSearchStoreMocked({
            folders: foldersData,
            filters: new DocumentsFilters({
              search: 'test',
              folderId: 1122,
              period: new Period(),
              findInChildFolders: false
            })
          })
        )

        const arboHeaderWrapper = wrapper.findComponent(ArboHeader)

        await arboHeaderWrapper.vm.$emit('back-click')

        // Then we should go to the main view
        expect(routerMock.push).toHaveBeenCalledWith({
          name: 'MainView'
        })
        expect(storeMock.dispatch).not.toHaveBeenCalledWith(
          'GED/Search/setFilters',
          {
            findInChildFolders: false,
            folderId: 4521,
            period: { endDate: '', startDate: '' },
            search: 'test'
          }
        )
      })

      it('Should go to the main view when back-click ArboHeader emits back-click when currentfolder parentId is not 0', async () => {
        // When ArboHeader emits back-click
        const storeMock = createSearchStoreMocked({
          folders: foldersData,
          filters: new DocumentsFilters({
            search: '',
            folderId: 1123,
            period: new Period(),
            findInChildFolders: false
          })
        })

        storeMock.dispatch = jest.fn()

        wrapper = createWrapper(storeMock)

        const arboHeaderWrapper = wrapper.findComponent(ArboHeader)

        await arboHeaderWrapper.vm.$emit('back-click')

        //Then we should go back to folder parent
        expect(storeMock.dispatch).toHaveBeenCalledWith(
          'GED/Search/setFilters',
          {
            search: '',
            folderId: 1222,
            findInChildFolders: false,
            period: new Period(),
            certified: 'all'
          }
        )

        expect(storeMock.dispatch).toHaveBeenCalledWith(
          'GED/Search/fetchDocuments'
        )
      })

      it('Should emit on-selected-folder-change when ArboHeader emits update:searchFolderId', async () => {
        // When arboHeaderWrapper emits update:searchFolderId
        const arboHeaderWrapper = wrapper.findComponent(ArboHeader)

        await arboHeaderWrapper.vm.$emit('update:searchFolderId', 29)

        // Then dispatch with setFilters action must be called with 29 as folderId
        expect(storeMock.dispatch).toHaveBeenCalledWith(
          'GED/Search/setFilters',
          {
            findInChildFolders: false,
            folderId: 29,
            search: '',
            period: new Period(),
            certified: 'all'
          }
        )
      })
    })
  })

  describe('binding with DocumentDetailsDrawer', () => {
    const documentFile = new Document({
      name: 'columbo.pdf'
    } as DocumentFromAPI)

    const openDrawer = async () =>
      await arboDocumentsTableWrapper.vm.$emit('document-clicked', documentFile)

    it('props binding', async () => {
      // When ArboDocumentsTable emits document-clicked with a new Document as payload
      await openDrawer()

      // Then the payload must be bound with the DocumentDetailsDrawer prop document
      documentDetailsDrawer = findDocumentDetailsDrawer(wrapper)
      expect(documentDetailsDrawer.props('document')).toStrictEqual(
        documentFile
      )

      expect(documentDetailsDrawer.props('opened')).toStrictEqual(true)
    })
  })
})
