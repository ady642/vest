import { VueWrapper, DOMWrapper } from '@vue/test-utils'
import { ComponentPublicInstance, DirectiveBinding } from 'vue'
import { Store } from 'vuex'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import MainViewLayout from '@/modules/Search/components/Layouts/MainViewLayout.vue'
import BasicLayout from '@/modules/Search/components/Layouts/BasicLayout.vue'
import MainView from '@/modules/Search/views/MainView.vue'
import DocumentsUploadBox from '@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Activators/DocumentsUploadBox.vue'
import WhoUploadModal from '@/modules/DataManipulation/Upload/components/WhoUploadModal/WhoUploadModal.vue'
import FolderTabs from '@/modules/Search/components/Tabs/FolderTabs.vue'
import DocumentsSearchFilters from '@/modules/Search/components/Filters/DocumentsSearchFilters.vue'
import { DocumentsSearchFiltersWrapper } from '../components/Filters/DocumentsSearchFilters.spec'
import DocumentsFilters from '@/modules/Search/models/Documents/Query/DocumentsFilters'
import { DocumentsTableWrapper } from 'tests/unit/src/modules/Search/components/DocumentsTable/DocumentsTable.spec'
import DocumentsTable from '@/modules/Search/components/DocumentsTable/DocumentsTable.vue'
import Documents from '@/modules/Search/models/Documents/Inputs/Documents'
import { documentAPIMock } from '../mocks/DocumentAPIMock'
import DocumentsPaginator from '@/modules/Search/models/Documents/Query/DocumentsPaginator'
import RootStateInterface from '@/store/types/rootState'
import FileUpload, {
  StateUpload
} from '@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload'
import Period from '@/Common/models/List/Period'
import Folders from '@/modules/Search/models/Folders/Inputs/Folders'
import { createSearchStoreMocked } from 'tests/unit/__mocks__/storeMock'
import ArboCardList from '@/modules/Search/components/Cards/ArboCardList.vue'
import useFoldersData from '../mocks/FoldersDataMock'
import TrashCard from '@/modules/Trash/components/Cards/TrashCard.vue'
import MailToGedModal from '@/modules/DataManipulation/MailToGed/components/Modals/MailToGedModal.vue'
import useMailToGedData from 'tests/unit/src/modules/DataManipulation/MailToGed/mocks/MailToGedDataMock'
import {
  pageViewFactory,
  trackEventFactory
} from '@/Common/helpers/analyticsLog'
import { createFileStoreMock } from 'tests/unit/__mocks__/storeMock/createStoreMock'
import {
  findDocumentDetailsDrawer,
  findMailToGedCard
} from 'tests/unit/utils/finders'
import Document from '@/modules/Search/models/Documents/Inputs/Document'
import { DocumentFromAPI } from '@/Common/types/document'

jest.mock('@/Common/helpers/analyticsLog', () => ({
  trackEventFactory: jest.fn(),
  pageViewFactory: jest.fn()
}))

const { MailToGedData } = useMailToGedData()

const foldersData = Folders.loaded([
  {
    id: 1122,
    name: 'Comptabilité',
    parent: { id: 0 },
    children: [
      {
        id: 1223,
        name: 'Dépôt',
        parent: { id: 1122 },
        children: [],
        properties: {
          defaultUpload: true
        },
        permissions: []
      }
    ],
    properties: {},
    permissions: []
  },
  {
    id: 1233,
    name: 'Gestion Sociale',
    parent: { id: 0 },
    children: [],
    properties: {},
    permissions: []
  }
])

const documentsData = Documents.loaded([{ ...documentAPIMock }])

let storeMock: Store<RootStateInterface> = createSearchStoreMocked()

storeMock.state.GED.DataManipulation.MailToGed.mailToGedInformations =
  MailToGedData

export type MainViewTypeWrapper = VueWrapper<any>
const defaultProps = { resetFilters: 'true' }

const createWrapper = (
  { resetFilters = 'true' } = defaultProps,
  store = storeMock,
  directives = {}
): MainViewTypeWrapper =>
  wrapperFactory(MainView, {
    props: {
      isDocumentUploadModalOpened: true,
      resetFilters
    },
    global: {
      directives,
      plugins: [store],
      stubs: {
        MainViewLayout,
        BasicLayout,
        TrashCard
      }
    }
  })

const findDocumentsTable = (
  wrapper: MainViewTypeWrapper
): DocumentsTableWrapper => wrapper.findComponent(DocumentsTable)

const findDocumentsSearchFilters = (
  wrapper: MainViewTypeWrapper
): DocumentsSearchFiltersWrapper =>
  wrapper.findComponent(DocumentsSearchFilters)

const findWhoUploadModal = (wrapper: MainViewTypeWrapper) =>
  wrapper.findComponent(WhoUploadModal)

let wrapper = createWrapper()
let documentsDetailsDrawer = findDocumentDetailsDrawer(wrapper)
let documentsTableWrapper = findDocumentsTable(wrapper)

describe('MainView', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    storeMock = createSearchStoreMocked({
      areAnyFilters: true,
      filters: new DocumentsFilters({
        search: 'test',
        period: new Period(),
        folderId: 0,
        findInChildFolders: true
      })
    })

    wrapper = createWrapper(defaultProps, storeMock)
    documentsTableWrapper = findDocumentsTable(wrapper)
    expect(pageViewFactory).toBeCalledWith('document-pgv')
    storeMock.dispatch = jest.fn()
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('onMounted', () => {
    it('Should reset paginator and and set the folderId to 0 (all folders) and finally fetch the documents if filters.search is not undefined', async () => {
      const storeWithSearch = createSearchStoreMocked({
        filters: new DocumentsFilters({
          search: 'test',
          period: new Period(),
          folderId: 0,
          findInChildFolders: true
        })
      })

      storeWithSearch.dispatch = jest.fn()

      wrapper = await createWrapper(defaultProps, storeWithSearch)

      expect(storeWithSearch.dispatch).toHaveBeenNthCalledWith(
        1,
        'GED/Search/setPaginator',
        { pageNumber: 1, itemsPerPage: 100, totalItems: 0 }
      )
      expect(storeWithSearch.dispatch).toHaveBeenNthCalledWith(
        2,
        'GED/Search/setFilters',
        {
          search: 'test',
          folderId: 0,
          findInChildFolders: true,
          period: new Period(),
          certified: 'all'
        }
      )
      expect(storeWithSearch.dispatch).toHaveBeenNthCalledWith(
        3,
        'GED/Search/fetchDocuments'
      )
    })
    it('Should reset paginator and and set the folderId to 0 (all folders) and not fetch the documents if filters.search is undefined', async () => {
      const storeNoFilterSearchMock = createSearchStoreMocked({
        searchActive: false,
        activeFiltersCount: 0,
        folders: Folders.loaded([]),
        filters: new DocumentsFilters({
          findInChildFolders: true,
          search: undefined as never,
          period: new Period(),
          folderId: 0
        })
      })

      storeNoFilterSearchMock.dispatch = jest.fn()

      wrapper = createWrapper(defaultProps, storeNoFilterSearchMock)

      expect(storeNoFilterSearchMock.dispatch).toHaveBeenNthCalledWith(
        1,
        'GED/Search/setPaginator',
        { pageNumber: 1, itemsPerPage: 100, totalItems: 0 }
      )
      expect(storeNoFilterSearchMock.dispatch).toHaveBeenNthCalledWith(
        2,
        'GED/Search/setFilters',
        {
          search: '',
          folderId: 0,
          findInChildFolders: true,
          period: new Period(),
          certified: 'all'
        }
      )
      expect(storeNoFilterSearchMock.dispatch).not.toHaveBeenCalledWith(
        3,
        'GED/Search/fetchDocuments'
      )
    })
    it('should open the WhoUploadModal When openWhoUploadModal query param is at true', async () => {
      // Given openWhoUploadModal is at true
      // Then the WhoUploadModal must be opened
      expect(findWhoUploadModal(wrapper).props('modelValue')).toBe(true)
    })
  })

  describe('events', () => {
    describe('events from MailToGedModal', () => {
      it("Should handle more-info event when it's emitted", async () => {
        const w = { location: { origin: 'http://127.0.0.1' } } as Window
        const mockWindowOpen = jest.fn().mockReturnValue(w)

        window.open = mockWindowOpen

        // When MailToGedModal emit more-info
        const mailToGedModalWrapper: VueWrapper<ComponentPublicInstance> =
          wrapper.findComponent(MailToGedModal)

        mailToGedModalWrapper.vm.$emit('more-info')

        // Then should navigate to the correct url
        expect(mockWindowOpen).toBeCalledWith('https://www.kpmg.fr/mailtoged')
      })

      it("Should handle close event when it's emitted", async () => {
        wrapper.vm.isMailToGedOpened = true

        const mailToGedModalWrapper: VueWrapper<ComponentPublicInstance> =
          wrapper.findComponent(MailToGedModal)

        mailToGedModalWrapper.vm.$emit('close')
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.isMailToGedOpened).toBe(false)
      })
    })
    it('Should change filters store and fetch documents when tabSelectedHandler fired', async () => {
      const storeWithSearchMock = createSearchStoreMocked({
        documents: documentsData,
        areAnyFilters: true,
        filters: new DocumentsFilters({
          findInChildFolders: true,
          search: 'test',
          period: new Period(),
          folderId: 0
        })
      })

      storeWithSearchMock.dispatch = jest.fn()

      wrapper = createWrapper(defaultProps, storeWithSearchMock)

      const documentsTabsWrapper: VueWrapper<ComponentPublicInstance> =
        wrapper.findComponent(FolderTabs)

      await documentsTabsWrapper.vm.$emit('tab-selected', 99)

      // Reset the page to 1
      expect(storeWithSearchMock.dispatch).toHaveBeenNthCalledWith(
        1,
        'GED/Search/setPaginator',
        {
          itemsPerPage: 100,
          pageNumber: 1,
          totalItems: 0
        }
      )

      // Set the folderId
      expect(storeWithSearchMock.dispatch).toHaveBeenNthCalledWith(
        2,
        'GED/Search/setFilters',
        {
          findInChildFolders: true,
          folderId: 0,
          search: 'test',
          period: new Period(),
          certified: 'all'
        }
      )

      // fetch the documents
      expect(storeWithSearchMock.dispatch).toHaveBeenNthCalledWith(
        3,
        'GED/Search/fetchDocuments'
      )
    })

    it('Should change filters store, reset pagination and fetch documents when handleChangeInput fired', async () => {
      const storeWithSearchMock = createSearchStoreMocked({
        searchActive: true,
        filters: new DocumentsFilters({
          findInChildFolders: true,
          search: 'test',
          period: new Period(),
          folderId: 0
        })
      })

      wrapper = createWrapper(defaultProps, storeWithSearchMock)

      storeWithSearchMock.dispatch = jest.fn()

      const documentsSearchFiltersWrapper = findDocumentsSearchFilters(wrapper)

      await documentsSearchFiltersWrapper.vm.$emit('update:search', 'xf')

      expect(storeWithSearchMock.dispatch).toHaveBeenNthCalledWith(
        1,
        'GED/Search/setPaginator',
        {
          pageNumber: 1,
          itemsPerPage: 100,
          totalItems: 0
        }
      )
      expect(storeWithSearchMock.dispatch).toHaveBeenNthCalledWith(
        2,
        'GED/Search/setFilters',
        {
          findInChildFolders: true,
          folderId: 0,
          search: 'test',
          period: new Period(),
          certified: 'all'
        }
      )
      expect(storeWithSearchMock.dispatch).toHaveBeenNthCalledWith(
        3,
        'GED/Search/setFilters',
        {
          findInChildFolders: true,
          folderId: 0,
          search: 'xf',
          period: new Period(),
          certified: 'all'
        }
      )
    })

    it('Should emit 3 events when on-treat-by-collab event is emitted', async () => {
      const storeWithSearchMock = createSearchStoreMocked({
        searchActive: true,
        filters: new DocumentsFilters({
          findInChildFolders: true,
          search: 'test',
          period: new Period(),
          folderId: 0
        }),
        folders: foldersData
      })

      storeWithSearchMock.dispatch = jest.fn()

      wrapper = createWrapper(defaultProps, storeWithSearchMock)

      const popWrapper = wrapper.findComponent(WhoUploadModal)

      await popWrapper.vm.$emit('on-treat-by-collab', 1122)

      expect(trackEventFactory).toBeCalledWith(
        'updm-select-tree-continue-collab'
      )
      expect(wrapper.emitted()['disable-selection-categories']).toBeTruthy()
      expect(wrapper.emitted()['disable-selection-categories']).toHaveLength(1)
      expect(
        wrapper.emitted()['disable-selection-categories'][0]
      ).toStrictEqual([true])
      expect(wrapper.emitted()['upload-all-files-same-folder']).toBeTruthy()
      expect(wrapper.emitted()['upload-all-files-same-folder']).toHaveLength(1)
      // Then dispatch with setSelectedFolderToUpload action must be call with 1223
      expect(storeWithSearchMock.dispatch).toHaveBeenCalledWith(
        'GED/DataManipulation/Upload/setSelectedFolderToUpload',
        1223
      )

      expect(popWrapper.props().modelValue).toBe(false)
      expect(wrapper.props().isDocumentUploadModalOpened).toBe(true)
    })

    it('Should not emit any events when on-treat-by-collab event is emitted on folder that have 0 default folder', async () => {
      const storeWithFolders = createSearchStoreMocked({
        folders: Folders.loaded([
          {
            id: 1122,
            name: 'Comptabilité',
            parent: { id: 0 },
            children: [],
            properties: {},
            permissions: []
          },
          {
            id: 1233,
            name: 'Gestion Sociale',
            parent: { id: 0 },
            children: [],
            properties: {},
            permissions: []
          }
        ])
      })

      storeWithFolders.dispatch = jest.fn()

      wrapper = createWrapper(defaultProps, storeWithFolders)
      const popWrapper: VueWrapper<ComponentPublicInstance> =
        wrapper.findComponent(WhoUploadModal)

      await popWrapper.vm.$emit('on-treat-by-collab', 1122)

      expect(trackEventFactory).not.toBeCalledWith(
        'updm-select-tree-continue-collab'
      )
      expect(wrapper.emitted()['disable-selection-categories']).toBeFalsy()

      expect(wrapper.emitted()['upload-all-files-same-folder']).toBeFalsy()
      // Then dispatch with setSelectedFolderToUpload action must be call with 1223
      expect(storeWithFolders.dispatch).not.toHaveBeenCalledWith(
        'GED/DataManipulation/Upload/setSelectedFolderToUpload',
        1223
      )
    })

    it('Should 2 events when on-treat-by-client event is emitted and folderId should be the default one', async () => {
      const storeWithSearchMock = createSearchStoreMocked({
        searchActive: true,
        filters: new DocumentsFilters({
          findInChildFolders: true,
          search: 'test',
          period: new Period(),
          folderId: 0
        }),
        folders: foldersData
      })

      storeWithSearchMock.dispatch = jest.fn()

      wrapper = createWrapper(defaultProps, storeWithSearchMock)

      const popWrapper: VueWrapper<ComponentPublicInstance> =
        wrapper.findComponent(WhoUploadModal)

      await popWrapper.vm.$emit('on-treat-by-collab', 1122)

      await popWrapper.vm.$emit('on-treat-by-client', 1122)
      expect(trackEventFactory).toBeCalledWith(
        'updm-select-tree-continue-client'
      )
      expect(wrapper.emitted()['disable-selection-categories']).toBeTruthy()
      expect(wrapper.emitted()['disable-selection-categories']).toHaveLength(2)
      expect(wrapper.emitted()['disable-selection-categories']).toStrictEqual([
        [true],
        [false]
      ])
      // Then dispatch with setSelectedFolderToUpload action must be call with 27
      expect(storeWithSearchMock.dispatch).toHaveBeenCalledWith(
        'GED/DataManipulation/Upload/setSelectedFolderToUpload',
        1223
      )

      expect(popWrapper.props().modelValue).toBe(false)
      expect(wrapper.props().isDocumentUploadModalOpened).toBe(true)
    })

    it('Should 2 events when on-treat-by-client event is emitted and folderId should not be the default one', async () => {
      const foldersData = Folders.loaded([
        {
          id: 1122,
          name: 'Forms',
          parent: { id: 0 },
          children: [
            {
              id: 1223,
              name: 'Test',
              parent: { id: 1122 },
              children: [],
              properties: {
                defaultUpload: true
              },
              permissions: []
            }
          ],
          properties: {},
          permissions: []
        }
      ])

      const storeWithFolders = createSearchStoreMocked({
        folders: foldersData
      })

      storeWithFolders.dispatch = jest.fn()

      wrapper = createWrapper(defaultProps, storeWithFolders)

      const popWrapper: VueWrapper<ComponentPublicInstance> =
        wrapper.findComponent(WhoUploadModal)

      await popWrapper.vm.$emit('on-treat-by-client', 1122)
      expect(trackEventFactory).toBeCalledWith(
        'updm-select-tree-continue-client'
      )
      expect(wrapper.emitted()['disable-selection-categories']).toBeTruthy()
      expect(wrapper.emitted()['disable-selection-categories']).toHaveLength(1)
      expect(
        wrapper.emitted()['disable-selection-categories'][0]
      ).toStrictEqual([false])
      // Then dispatch with setSelectedFolderToUpload action must be call with 27
      expect(storeWithFolders.dispatch).toHaveBeenCalledWith(
        'GED/DataManipulation/Upload/setSelectedFolderToUpload',
        1122
      )

      expect(popWrapper.props().modelValue).toBe(false)
      expect(wrapper.props().isDocumentUploadModalOpened).toBe(true)
    })

    it('Should close upload type modal popup-folder-select-close event is emitted', async () => {
      const DocumentUploadBoxWrapper = wrapper.findComponent(DocumentsUploadBox)

      const files = [
        new FileUpload(
          new File([''], 'filename', { type: 'text/html' }),
          StateUpload.UPLOADED
        ),
        new FileUpload(
          new File([''], 'filename', { type: 'text/html' }),
          StateUpload.CANCELED
        )
      ]

      DocumentUploadBoxWrapper.vm.$emit('on-files-change', files)

      const popWrapper: VueWrapper<ComponentPublicInstance> =
        wrapper.findComponent(WhoUploadModal)

      await popWrapper.vm.$emit('popup-folder-select-close')
      await wrapper.vm.$nextTick()

      expect(trackEventFactory).toBeCalledWith('updm-select-tree-cross-close')
      expect(popWrapper.props().modelValue).toBe(false)
    })

    it('Should change filters store and fetch documents when change-filters fired', async () => {
      const storeWithSearchMock = createSearchStoreMocked({
        searchActive: true,
        filters: new DocumentsFilters({
          findInChildFolders: true,
          search: 'test',
          period: new Period(),
          folderId: 0
        })
      })

      storeWithSearchMock.dispatch = jest.fn()

      wrapper = createWrapper(defaultProps, storeWithSearchMock)

      const documentsSearchFiltersWrapper = findDocumentsSearchFilters(wrapper)

      const period = new Period({
        startDate: '2018-02-01T23:00:00.000Z',
        endDate: '2019-06-05T22:00:00.000Z'
      })

      const filters = new DocumentsFilters()

      filters.period = period
      filters.certified = true

      await documentsSearchFiltersWrapper.vm.$emit('change-filters', filters)

      expect(storeWithSearchMock.dispatch).toHaveBeenCalledWith(
        'GED/Search/setFilters',
        {
          findInChildFolders: true,
          folderId: 0,
          search: 'test',
          period,
          certified: 'all'
        }
      )
      expect(storeWithSearchMock.dispatch).toHaveBeenCalledWith(
        'GED/Search/setFilters',
        {
          findInChildFolders: true,
          folderId: 0,
          search: 'test',
          period: new Period(),
          certified: true
        }
      )
    })

    it('Should change filters store and fetch documents when reset-search-filters fired', async () => {
      const storeWithoutSearchMock = createSearchStoreMocked({
        searchActive: true,
        filters: new DocumentsFilters({
          findInChildFolders: true,
          search: '',
          period: new Period(),
          folderId: 0
        })
      })

      storeWithoutSearchMock.dispatch = jest.fn()

      wrapper = createWrapper(defaultProps, storeWithoutSearchMock)

      const documentsSearchFiltersWrapper = findDocumentsSearchFilters(wrapper)

      await documentsSearchFiltersWrapper.vm.$emit('reset-filters')

      expect(storeWithoutSearchMock.dispatch).toHaveBeenCalledWith(
        'GED/Search/setFilters',
        {
          findInChildFolders: true,
          folderId: 0,
          search: '',
          period: new Period(),
          certified: 'all'
        }
      )
    })

    it('Should fire closeGedNotification and set isUploadTypeModalOpened true when upload type modal is opeend', async () => {
      const DocumentUploadBoxWrapper = wrapper.findComponent(DocumentsUploadBox)

      const files = [
        new FileUpload(
          new File([''], 'filename', { type: 'text/html' }),
          StateUpload.UPLOADED
        ),
        new FileUpload(
          new File([''], 'filename', { type: 'text/html' }),
          StateUpload.CANCELED
        )
      ]

      DocumentUploadBoxWrapper.vm.$emit('on-files-change', files)
      await wrapper.vm.$nextTick()

      expect(trackEventFactory).toBeCalledWith('mdv-cta-upload-widget-click')
      const popWrapper: VueWrapper<ComponentPublicInstance> =
        wrapper.findComponent(WhoUploadModal)

      expect(popWrapper.props().modelValue).toBe(true)
      expect(storeMock.dispatch).toHaveBeenCalledWith(
        'GED/DataManipulation/Upload/closeGedNotification'
      )
    })

    describe('bindings', () => {
      it('Should bind filters.search with search prop of DocumentSearchInput', async () => {
        const storeSearchMock = createSearchStoreMocked({
          searchActive: true,
          filters: new DocumentsFilters({
            findInChildFolders: true,
            search: 'test',
            period: new Period(),
            folderId: 0
          })
        })

        storeSearchMock.dispatch = jest.fn()

        wrapper = createWrapper(defaultProps, storeSearchMock)

        const documentsSearchFiltersWrapper =
          findDocumentsSearchFilters(wrapper)

        expect(documentsSearchFiltersWrapper.vm.search).toBe('test')
      })

      it('Should bind activeFilters of DocumentsSearchFilters with good value when anyFilterActive ', async () => {
        const documentsSearchFiltersWrapper =
          findDocumentsSearchFilters(wrapper)

        expect(documentsSearchFiltersWrapper.vm.activeFiltersCount).toBe(0)
      })

      it('Should bind folders from store to folders property of DocumentsTabs', () => {
        const storeSearchMock = createSearchStoreMocked({
          areAnyFilters: true,
          folders: foldersData
        })

        wrapper = createWrapper(defaultProps, storeSearchMock)

        const documentsTabsWrapper: VueWrapper<ComponentPublicInstance> =
          wrapper.findComponent(FolderTabs)

        expect(documentsTabsWrapper.props().folders).toStrictEqual(foldersData)
      })

      it('Should bind folders from store to folders property of WhoUploadModal', () => {
        const storeSearchMock = createSearchStoreMocked({
          folders: foldersData
        })

        wrapper = createWrapper(defaultProps, storeSearchMock)

        const popWrapper: VueWrapper<ComponentPublicInstance> =
          wrapper.findComponent(WhoUploadModal)

        expect(popWrapper.props().folders).toStrictEqual(foldersData)

        expect(popWrapper.props().modelValue).toBe(false)
      })
    })
  })
  describe('DocumentsTable bindings', () => {
    beforeEach(() => {
      const storeSearchMock = createSearchStoreMocked({
        areAnyFilters: true,
        documents: documentsData,
        filters: new DocumentsFilters({
          findInChildFolders: true,
          search: 'test',
          period: new Period(),
          folderId: 0
        })
      })

      storeSearchMock.dispatch = jest.fn()

      wrapper = createWrapper(defaultProps, storeSearchMock)
      documentsTableWrapper = wrapper.findComponent(DocumentsTable)
    })
    describe('props', () => {
      it('Should bind props correctly', () => {
        expect(documentsTableWrapper.vm.documents).toStrictEqual(documentsData)
        expect(documentsTableWrapper.props('search')).toBe('test')
      })
      it('Should bind areAllDocumentsLoaded from store to areAllDocumentsLoaded prop of DocumentsTable', async () => {
        const storeSearchMock = createSearchStoreMocked({
          areAllDocumentsLoaded: true,
          areAnyFilters: true
        })

        wrapper = createWrapper(defaultProps, storeSearchMock)

        documentsTableWrapper = wrapper.findComponent(DocumentsTable)

        expect(documentsTableWrapper.vm.areAllDocumentsLoaded).toStrictEqual(
          true
        )
      })
    })
    describe('rendering', () => {
      it('Should be hidden when no filters are active', () => {
        const storeWithoutSearchMock = createSearchStoreMocked({
          areAnyFilters: false
        })

        wrapper = createWrapper(defaultProps, storeWithoutSearchMock)
        expect(wrapper.findComponent(DocumentsTable).exists()).toBeFalsy()
      })

      describe('ArboCard display', () => {
        const displayArboCardsCases = [
          {
            areAnyFilters: false,
            isDocumentsTableDisplayed: false
          },
          {
            areAnyFilters: true,
            isDocumentsTableDisplayed: true
          }
        ]

        it.each(displayArboCardsCases)(
          'switch between ArboCardList or DocumentsTable',
          ({ areAnyFilters, isDocumentsTableDisplayed }) => {
            // Given
            wrapper = createWrapper(
              defaultProps,
              createSearchStoreMocked({ areAnyFilters })
            )

            // Then
            expect(wrapper.findComponent(DocumentsTable).exists()).toBe(
              isDocumentsTableDisplayed
            )
            expect(wrapper.findComponent(ArboCardList).exists()).toBe(
              !isDocumentsTableDisplayed
            )
          }
        )
      })
    })
    describe('events', () => {
      it('Should call dispatch downloadDocument action with good documentId when on-download-document event is emitted from DocumensTable', async () => {
        const storeMock = createSearchStoreMocked({
          areAnyFilters: true
        })

        storeMock.dispatch = jest.fn()

        wrapper = createWrapper(defaultProps, storeMock)

        // When DocumentsTable emit a on-download-document
        documentsTableWrapper = wrapper.findComponent(DocumentsTable)
        await documentsTableWrapper.vm.$emit('on-download-document', '55')

        // Then dispatch must be called to call downloadDocument action with '55'
        expect(storeMock.dispatch).toHaveBeenCalledWith(
          'GED/Search/downloadDocument',
          '55'
        )
      })
      describe('on-scroll-to-bottom', () => {
        it('Should dispatch setPaginator with pageNumber incremented and fetchAndPushDocuments', async () => {
          // Given the pageNumber is 1 and all the documents are not loaded yet
          const storeSearchMock = createSearchStoreMocked({
            areAnyFilters: true,
            documents: documentsData,
            paginator: new DocumentsPaginator({
              totalItems: 75246,
              pageNumber: 1
            }),
            filters: new DocumentsFilters({
              findInChildFolders: true,
              search: 'test',
              period: new Period(),
              folderId: 0
            })
          })

          storeSearchMock.dispatch = jest.fn()

          wrapper = createWrapper(defaultProps, storeSearchMock)

          documentsTableWrapper = wrapper.findComponent(DocumentsTable)

          // When DocumentsTable emit a on-scroll-to-bottom
          await documentsTableWrapper.vm.$emit('on-scroll-to-bottom')

          // Then dispatch setPaginator
          expect(storeSearchMock.dispatch).toHaveBeenCalledWith(
            'GED/Search/setPaginator',
            new DocumentsPaginator({
              pageNumber: 2,
              itemsPerPage: 100,
              totalItems: 75246
            })
          )
          // And dispatch fetchAndPushDocuments
          expect(storeSearchMock.dispatch).toHaveBeenCalledWith(
            'GED/Search/fetchAndPushDocuments'
          )
        })
        it('Should early exist if all the documents are loaded', async () => {
          // Given the pageNumber is 1 and all the documents are not loaded yet
          const storeSearchMock = createSearchStoreMocked({
            areAnyFilters: true,
            documents: documentsData,
            paginator: new DocumentsPaginator({
              totalItems: 1,
              pageNumber: 1
            }),
            filters: new DocumentsFilters({
              findInChildFolders: true,
              search: 'test',
              period: new Period(),
              folderId: 0
            })
          })

          storeSearchMock.dispatch = jest.fn()

          wrapper = createWrapper(defaultProps, storeSearchMock)

          documentsTableWrapper = wrapper.findComponent(DocumentsTable)

          // When DocumentsTable emit a on-scroll-to-bottom
          await documentsTableWrapper.vm.$emit('on-scroll-to-bottom')

          // Then dispatch setPaginator
          expect(storeMock.dispatch).not.toHaveBeenNthCalledWith(
            1,
            'GED/Search/setPaginator',
            new DocumentsPaginator({
              pageNumber: 2,
              itemsPerPage: 100,
              totalItems: 0
            })
          )
          // And dispatch fetchAndPushDocuments
          expect(storeMock.dispatch).not.toHaveBeenNthCalledWith(
            2,
            'GED/Search/fetchAndPushDocuments'
          )
        })
      })
      describe('Documents upload box binding', () => {
        it.each([
          { isUploading: false, disabled: false },
          { isUploading: true, disabled: true }
        ])(
          'Should not be disabled when isUploading is false',
          ({ isUploading, disabled }) => {
            const searchFilesStore = createFileStoreMock({ isUploading })

            wrapper = createWrapper(defaultProps, searchFilesStore)

            const DocumentUploadBoxWrapper =
              wrapper.findComponent(DocumentsUploadBox)

            expect(DocumentUploadBoxWrapper.props('disabled')).toBe(disabled)
          }
        )
      })
    })
  })
  describe('MainViewLayout Bindings', () => {
    it('Should pass the correct disabled to chaild component', () => {
      const MainViewLayoutWrapper = wrapper.findComponent(MainViewLayout)

      expect(wrapper.vm.isUploading).toBe(
        MainViewLayoutWrapper.props('disabled')
      )
    })
    it('Should pass the correct hasAccessDs to chaild component', () => {
      const MainViewLayoutWrapper = wrapper.findComponent(MainViewLayout)

      expect(wrapper.vm.hasAccessDs).toBe(
        MainViewLayoutWrapper.props('hasAccessDs')
      )
    })
    it('Should pass the correct isMainViewBtn to child component', () => {
      const MainViewLayoutWrapper = wrapper.findComponent(MainViewLayout)

      expect(MainViewLayoutWrapper.props('isMainViewBtn')).toBe(true)
    })
    it('should display loading mask when folders are loading', () => {
      const log = console.log

      console.log = jest.fn()

      wrapper = createWrapper(
        defaultProps,
        createSearchStoreMocked({
          folders: Folders.loading()
        }),
        {
          Loading: (node: Node, binding: DirectiveBinding) => {
            console.log(`v-loading value : ${binding.value}`) // execute the emission of the on-scroll-to-bottom event
          }
        }
      )

      expect(console.log).toHaveBeenCalledWith('v-loading value : true')

      console.log = log
    })
  })
  describe('TrashCard bindings', () => {
    describe('rendering', () => {
      const trashCardDisplayCases = [
        {
          folders: Folders.loaded([]),
          visible: false
        },
        {
          folders: useFoldersData().FoldersData,
          visible: true
        }
      ]

      it.each(trashCardDisplayCases)(
        'it should render TrashCard if there is folder',
        async ({ folders, visible }) => {
          wrapper = createWrapper(
            defaultProps,
            createSearchStoreMocked({
              searchActive: false,
              activeFiltersCount: 0,
              folders
            })
          )
          const trashCrad: DOMWrapper<HTMLDivElement> =
            wrapper.find('.trash-card')

          await wrapper.vm.$nextTick()
          expect(trashCrad.element.style.display !== 'none').toBe(visible)
        }
      )
    })
  })
  describe('MailToGedCard', () => {
    describe('rendering', () => {
      const mailToGedCardDisplayCases = [
        {
          folders: Folders.errored(),
          visible: false
        },
        {
          folders: Folders.loading(),
          visible: false
        },
        {
          folders: Folders.loaded([]),
          visible: false
        },
        {
          folders: useFoldersData().FoldersData,
          visible: true
        }
      ]

      it.each(mailToGedCardDisplayCases)(
        'should display MailToGedCard only if folders are loaded',
        async ({ folders, visible }) => {
          wrapper = createWrapper(
            defaultProps,
            createSearchStoreMocked({
              folders
            })
          )
          const mailToGedModalWrapper = findMailToGedCard(wrapper)

          expect(mailToGedModalWrapper.exists()).toBe(visible)
        }
      )
    })
    it('Should bind mailToGedInfos correctly', () => {
      const mailToGedModalWrapper: VueWrapper<ComponentPublicInstance> =
        wrapper.findComponent(MailToGedModal)

      expect(mailToGedModalWrapper.props('mailToGedInfos')).toEqual(
        MailToGedData
      )
    })
  })
  describe('binding with DocumentDetailsDrawer', () => {
    const documentFile = new Document({
      name: 'columbo.pdf'
    } as DocumentFromAPI)

    const openDrawer = async () =>
      await documentsTableWrapper.vm.$emit('document-clicked', documentFile)

    it('props binding', async () => {
      // When ArboDocumentsTable emits document-clicked with a new Document as payload
      await openDrawer()

      // Then the payload must be bound with the DocumentDetailsDrawer prop document
      documentsDetailsDrawer = findDocumentDetailsDrawer(wrapper)
      expect(documentsDetailsDrawer.props('document')).toStrictEqual(
        documentFile
      )

      expect(documentsDetailsDrawer.props('opened')).toStrictEqual(true)
    })
  })
})
