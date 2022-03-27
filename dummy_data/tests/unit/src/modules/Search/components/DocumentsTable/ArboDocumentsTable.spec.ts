import { ComponentPublicInstance, WritableComputedRef } from 'vue'
import { flushPromises, VueWrapper } from '@vue/test-utils'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { documentAPIMock } from 'dummy_data/tests/unit/src/modules/Search/mocks/DocumentAPIMock'
import { NattoTableWrapper } from 'dummy_data/tests/unit/src/Common/components/Table/NattoTable.spec'
import { DocumentsFoldersBrowserTypeWrapper } from 'dummy_data/tests/unit/src/modules/Search/components/Navigation/DocumentsFoldersBrowser.spec'
import ArboDocumentsTable from '@/modules/Search/components/DocumentsTable/ArboDocumentsTable.vue'
import Folders from '@/modules/Search/models/Folders/Inputs/Folders'
import Documents from '@/modules/Search/models/Documents/Inputs/Documents'
import DocumentsFoldersBrowser from '@/modules/Search/components/Navigation/DocumentsFoldersBrowser.vue'
import NattoTable from '@/Common/components/Table/NattoTable.vue'
import DocumentsInFolderAndChildBar from '@/modules/Search/components/Filters/InfoBars/DocumentsInFolderAndChildBar.vue'
import DocumentsInAllFoldersBar from '@/modules/Search/components/Filters/InfoBars/DocumentsInAllFoldersBar.vue'
import constants from '@/Common/constants'
import DocumentActionsElement from '@/modules/Search/components/DocumentsTable/DocumentsTableElements/DocumentActionsElement.vue'
import DeleteFileModalConfirmation from '@/modules/DataManipulation/Delete/DeleteFile/components/Modals/DeleteFileModalConfirmation.vue'
import DocumentSyncStatusElement from '@/modules/Search/components/DocumentsTable/DocumentsTableElements/DocumentSyncStatusElement.vue'
import DocumentsSortOptions from '@/modules/Search/models/Documents/Query/DocumentsSortOptions'
import NattoDropZone from '@/Common/components/Upload/NattoDropZone.vue'
import { createSearchStoreMocked } from 'tests/unit/__mocks__/storeMock'
import useStyleguideStubs from 'dummy_data/tests/unit/utils/useStyleguideStubs'
import {
  findDeleteFileModalConfirmation,
  findMultipleDocumentsCtas
} from 'dummy_data/tests/unit/utils/finders'
import { searchModule } from '@/modules/Search/store'
import { DocumentFromAPI } from '@/Common/types/document'
import { LifeCycleStatus } from '@/modules/Search/models/Documents/Inputs/Document'
import { DocumentActionsElementWrapper } from './DocumentTableElements/DocumentActionsElement.spec'

const { MpTable } = useStyleguideStubs()

type ArboDocumentsTableProps = {
  folders: Folders
  documents: Documents
  searchFolderId: number
  documentsTotalInFolderAndChild: number
  documentsTotalInAllFolders: number
  documentsPerPage: number
  search: string
  isCollabUser: boolean
  pageNumber: number
  sortOptions: DocumentsSortOptions
  isTableDropZoneDisabled: boolean
}

export type ArboDocumentsTableWrapper = VueWrapper<
  ComponentPublicInstance<
    ArboDocumentsTableProps,
    {
      searchFolder: WritableComputedRef<number>
      state: {
        isDeleteFileModalConfirmationOpened: boolean
        selectedDocumentsIds: string[]
        isSynchronizedDocument: boolean
      }
      areAllSelected: boolean
    }
  >
>

const defaultProps: ArboDocumentsTableProps = {
  documents: Documents.loaded([{ ...documentAPIMock }]),
  folders: Folders.loading(),
  searchFolderId: 27,
  documentsPerPage: 10,
  pageNumber: 1,
  documentsTotalInFolderAndChild: 5201,
  documentsTotalInAllFolders: 75201,
  search: 'test',
  isCollabUser: false,
  sortOptions: new DocumentsSortOptions({
    sortBy: 'name',
    sortDirection: 'ascending'
  }),
  isTableDropZoneDisabled: false
}

const createWrapper = (
  props = defaultProps,
  store = createSearchStoreMocked()
): ArboDocumentsTableWrapper =>
  wrapperFactory(ArboDocumentsTable, {
    props,
    global: {
      plugins: [store],
      stubs: {
        NattoDropZone,
        NattoTable,
        DocumentActionsElement,
        DeleteFileModalConfirmation,
        MpTable,
        DocumentSyncStatusElement
      },
      directives: {
        Loading: {},
        InfiniteScroll: {}
      }
    }
  })

const findNattoDropZone = (wrapper: ArboDocumentsTableWrapper) =>
  wrapper.findComponent(NattoDropZone)

let wrapper = createWrapper()
let nattoDropZoneWrapper = findNattoDropZone(wrapper)
let multipleDocumentsCtas = findMultipleDocumentsCtas(wrapper)

describe('ArboDocumentsTable', () => {
  beforeEach(() => {
    // Given ArboDocumentsTable is mounted
    wrapper = createWrapper()
    nattoDropZoneWrapper = findNattoDropZone(wrapper)
    multipleDocumentsCtas = findMultipleDocumentsCtas(wrapper)
  })

  describe('binding with natto-drop-zone', () => {
    describe('props', () => {
      it('should call uploadFiles on drop', async () => {
        // Given the isTableDropZoneDisabled prop is true
        wrapper = createWrapper({
          ...defaultProps,
          isTableDropZoneDisabled: true
        })

        nattoDropZoneWrapper = findNattoDropZone(wrapper)

        // Then the disabled prop of the NattoDropZone must also be true
        expect(nattoDropZoneWrapper.props('disabled')).toBe(true)
      })
    })
    describe('events', () => {
      it('should emit files-dropped when NattoDropZone emit files-changes', () => {
        // Given we drop a file
        const files = [new File(['test'], 'test.txt', { type: 'text/plain' })]

        // When NattoDropZone emit files-changes
        nattoDropZoneWrapper.vm.$emit('files-changes', files)

        // Then ArboDocumentsTable must emit files-dropped
        expect(wrapper.emitted('files-dropped')).toHaveLength(1)
        expect(wrapper.emitted('files-dropped')).toEqual([[files]])
      })
    })
  })

  describe('bindings with NattoTable', () => {
    describe('props', () => {
      it('static props', () => {
        const nattoTableWrapper: NattoTableWrapper =
          wrapper.findComponent(NattoTable)

        expect(nattoTableWrapper.vm.tableData).toEqual([
          {
            comments: 'je suis le bilan comptable',
            createdBy: '',
            creationDate: '2018-05-27',
            folderId: 45454,
            id: 'myID',
            name: 'Mon bilan comptable',
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
        ])
        expect(nattoTableWrapper.vm.hideHeader).toBe(true)
        expect(nattoTableWrapper.vm.itemsPerPage).toBe(10)
        expect(nattoTableWrapper.vm.itemsTotal).toBe(5201)
        expect(nattoTableWrapper.vm.pageNumber).toBe(1)
        expect(nattoTableWrapper.vm.paginated).toBe(true)
        expect(nattoTableWrapper.vm.loading).toBe(false)
        expect(nattoTableWrapper.vm.sortOptions).toEqual(
          defaultProps.sortOptions
        )
        expect(nattoTableWrapper.vm.highlightRowOnClick).toEqual(true)
        expect(nattoTableWrapper.props('isSelection')).toBe(true)
        expect(nattoTableWrapper.props('areAllSelected')).toBe(false)
      })
      describe('areAllSelected', () => {
        it.each([
          {
            documents: Documents.loading(''),
            selectionIds: [],
            areAllSelected: false
          },
          {
            documents: Documents.loading(''),
            selectionIds: ['19'],
            areAllSelected: false
          },
          {
            documents: Documents.loaded([{ id: '19' } as DocumentFromAPI]),
            selectionIds: [],
            areAllSelected: false
          },
          {
            documents: Documents.loaded([
              { id: '19' },
              { id: '27' }
            ] as DocumentFromAPI[]),
            selectionIds: ['27'],
            areAllSelected: false
          },
          {
            documents: Documents.loaded([{ id: '19' } as DocumentFromAPI]),
            selectionIds: ['19'],
            areAllSelected: true
          }
        ])(
          'areSelected must be true only if we have documents and the selectedIds is the same length as the collection',
          async ({ documents, selectionIds, areAllSelected }) => {
            wrapper = createWrapper({
              ...defaultProps,
              documents
            })

            const nattoTableWrapper: NattoTableWrapper =
              wrapper.findComponent(NattoTable)

            await nattoTableWrapper.vm.$emit('selection-change', selectionIds)

            expect(wrapper.vm.areAllSelected).toBe(areAllSelected)
          }
        )
      })
    })
    describe('events', () => {
      it('should emit page-opened when NattoTable emits page-opened', async () => {
        // When NatoTable emits page-opened
        const nattoTableWrapper: NattoTableWrapper =
          wrapper.findComponent(NattoTable)

        await nattoTableWrapper.vm.$emit('page-opened', 2)

        // Then ArboDocumentsTable must emit page-opened too
        expect(wrapper.emitted('page-opened')).toHaveLength(1)
        expect(wrapper.emitted('page-opened')).toEqual([[2]])
      })
      it('Should emit sort-arbo-table on sort-arbo-table', async () => {
        const nattoTableWrapper: NattoTableWrapper =
          wrapper.findComponent(NattoTable)

        await nattoTableWrapper.vm.$emit(
          'sort-arbo-table',
          defaultProps.sortOptions
        )

        expect(wrapper.emitted('sort-arbo-table')).toHaveLength(1)
        expect(wrapper.emitted('sort-arbo-table')).toStrictEqual([
          [defaultProps.sortOptions]
        ])
      })
      it('Should emit document-clicked when row-clicked on table ', () => {
        const nattoTableWrapper: NattoTableWrapper =
          wrapper.findComponent(NattoTable)

        nattoTableWrapper.vm.$emit('row-clicked', { id: 1, name: 'test' })
        expect(wrapper.emitted('document-clicked')).toEqual([
          [{ id: 1, name: 'test' }]
        ])
      })
      it('Should not emit document-clicked when row-clicked on table with a document.name property', () => {
        const nattoTableWrapper: NattoTableWrapper =
          wrapper.findComponent(NattoTable)

        nattoTableWrapper.vm.$emit('row-clicked', { id: 1 })
        expect(wrapper.emitted('document-clicked')).toBeFalsy()
      })
      it('should call the toggleAll method of ElTable when NattoTable emits select-all', () => {
        const nattoTableWrapper: NattoTableWrapper =
          wrapper.findComponent(NattoTable)

        nattoTableWrapper.vm.toggleAll = jest.fn()

        nattoTableWrapper.vm.$emit('select-all')

        expect(nattoTableWrapper.vm.toggleAll).toHaveBeenCalled()
      })
    })
  })

  describe('bindings with DocumentsFolderBrowser', () => {
    describe('rendering', () => {
      const displayCases = [
        { search: '', displayDocumentsFolderBrowser: true },
        { search: 'test', displayDocumentsFolderBrowser: false }
      ]

      test.each(displayCases)(
        'isSearchActive: $isSearchActive => displayDocumentsFolderBrowser: $displayDocumentsFolderBrowser',
        ({ search, displayDocumentsFolderBrowser }) => {
          wrapper = createWrapper({ ...defaultProps, search })
          expect(wrapper.findComponent(DocumentsFoldersBrowser).exists()).toBe(
            displayDocumentsFolderBrowser
          )
        }
      )
    })
    describe('props', () => {
      // Given DocumentsFolderBrowser is displayed
      wrapper = createWrapper({ ...defaultProps, search: '' })

      const documentsFoldersBrowserWrapper: DocumentsFoldersBrowserTypeWrapper =
        wrapper.findComponent(DocumentsFoldersBrowser)

      expect(documentsFoldersBrowserWrapper.vm.folders).toStrictEqual(
        Folders.loading()
      )
    })
    describe('events', () => {
      describe('goto-clicked', () => {
        it('Should set the folderId, reset the search and fetch the documents when goto-clicked fired', async () => {
          const store = createSearchStoreMocked()

          store.dispatch = jest.fn()
          wrapper = createWrapper({ ...defaultProps, search: '' }, store)
          const documentActionElementWrapper: DocumentActionsElementWrapper =
            wrapper.findComponent(DocumentActionsElement)

          await documentActionElementWrapper.vm.$emit('goto-clicked', {
            documentId: '1234',
            isSynchronizedDocument: true,
            folderId: 9876
          })

          expect(store.dispatch).toHaveBeenNthCalledWith(
            1,
            searchModule('setFilters'),
            {
              certified: 'all',
              findInChildFolders: false,
              folderId: 9876,
              period: {
                endDate: '',
                startDate: ''
              },
              search: ''
            }
          )
          expect(store.dispatch).toHaveBeenNthCalledWith(
            2,
            searchModule('setFilters'),
            {
              certified: 'all',
              findInChildFolders: false,
              folderId: 0,
              period: {
                endDate: '',
                startDate: ''
              },
              search: ''
            }
          )
          expect(store.dispatch).toHaveBeenNthCalledWith(
            3,
            searchModule('fetchDocuments')
          )
        })
      })
      describe('download-clicked', () => {
        it('Should emit on-download-document when download-clicked fired', async () => {
          // Given DocumentsFolderBrowser is displayed
          wrapper = createWrapper({ ...defaultProps, search: '' })
          const documentActionElementWrapper: VueWrapper<any> =
            wrapper.findComponent(DocumentActionsElement)

          await documentActionElementWrapper.vm.$emit('download-clicked', {
            documentId: '1234',
            isSynchronizedDocument: true
          })

          expect(wrapper.emitted('on-download-document')).toHaveLength(1)
          expect(wrapper.emitted('on-download-document')).toEqual([['1234']])
        })
      })

      describe('document-dropdown-clicked', () => {
        it.each([
          {
            selectedDocumentIds: [
              'document-id-1',
              'document-id-2',
              'document-id-3'
            ],
            selectedDocumentActionId: 'document-id-1',
            expectedSelectedDocument: ['document-id-1']
          },
          {
            selectedDocumentIds: [
              'document-id-1',
              'document-id-2',
              'document-id-3'
            ],
            selectedDocumentActionId: 'document-id-X',
            expectedSelectedDocument: ['document-id-X']
          },
          {
            selectedDocumentIds: [],
            selectedDocumentActionId: 'document-id-1',
            expectedSelectedDocument: ['document-id-1']
          }
        ])(
          'Should reset document selection when document-dropdown-clicked is fired',
          async ({
            selectedDocumentIds,
            selectedDocumentActionId,
            expectedSelectedDocument
          }) => {
            // Given DocumentsFolderBrowser is displayed
            wrapper = createWrapper({ ...defaultProps, search: '' })

            const documentActionElementWrapper: VueWrapper<any> =
              wrapper.findComponent(DocumentActionsElement)

            const nattoTableWrapper: NattoTableWrapper =
              wrapper.findComponent(NattoTable)

            nattoTableWrapper.vm.clearSelection = jest.fn()
            nattoTableWrapper.vm.mpTableRef.handleRowClick = jest.fn()
            nattoTableWrapper.vm.$emit('selection-change', selectedDocumentIds)
            documentActionElementWrapper.vm.$emit(
              'document-dropdown-clicked',
              selectedDocumentActionId
            )
            await wrapper.vm.$nextTick()

            multipleDocumentsCtas = findMultipleDocumentsCtas(wrapper)
            expect(nattoTableWrapper.vm.clearSelection).toHaveBeenCalled()
            expect(
              multipleDocumentsCtas.props('selectedDocumentsIds')
            ).toStrictEqual(expectedSelectedDocument)
          }
        )
      })
      describe('delete-clicked', () => {
        it.each([
          {
            selectedDocumentIds: [
              'document-id-1',
              'document-id-2',
              'document-id-3'
            ],
            selectedDocumentActionId: 'document-id-1',
            expectedDeletedDocumentId: ['document-id-1']
          },
          {
            selectedDocumentIds: [
              'document-id-1',
              'document-id-2',
              'document-id-3'
            ],
            selectedDocumentActionId: 'document-id-X',
            expectedDeletedDocumentId: ['document-id-X']
          },
          {
            selectedDocumentIds: [],
            selectedDocumentActionId: 'document-id-1',
            expectedDeletedDocumentId: ['document-id-1']
          }
        ])(
          'Should open delete popup for expectedDeletedDocumentId when selectedDocumentIds and deleted action is on the selectedDocumentActionId',
          async ({
            selectedDocumentActionId,
            expectedDeletedDocumentId,
            selectedDocumentIds
          }) => {
            // Given DocumentsFolderBrowser is displayed
            wrapper = createWrapper({ ...defaultProps, search: '' })
            const documentActionElementWrapper: VueWrapper<any> =
              wrapper.findComponent(DocumentActionsElement)

            const nattoTableWrapper: NattoTableWrapper =
              wrapper.findComponent(NattoTable)

            nattoTableWrapper.vm.$emit('selection-change', selectedDocumentIds)
            nattoTableWrapper.vm.clearSelection = jest.fn()
            nattoTableWrapper.vm.mpTableRef.handleRowClick = jest.fn()

            await documentActionElementWrapper.vm.$emit('delete-clicked', {
              documentId: selectedDocumentActionId,
              isSynchronizedDocument: true
            })

            const deleteFileModalConfirmationWrapper: VueWrapper<any> =
              wrapper.findComponent(DeleteFileModalConfirmation)

            expect(nattoTableWrapper.vm.clearSelection).toHaveBeenCalled()
            expect(deleteFileModalConfirmationWrapper.props('modelValue')).toBe(
              true
            )
            expect(
              deleteFileModalConfirmationWrapper.props('documentIds')
            ).toStrictEqual(expectedDeletedDocumentId)
            expect(
              deleteFileModalConfirmationWrapper.props('isSynchronizedDocument')
            ).toBe(true)
          }
        )
      })
      it('Should emit delete-file-confirmed when DeleteFileModalConfirmation emits delete-file-confirmed', async () => {
        wrapper = createWrapper({ ...defaultProps, search: '' })

        const deleteFileModalConfirmationWrapper: VueWrapper<any> =
          wrapper.findComponent(DeleteFileModalConfirmation)

        await deleteFileModalConfirmationWrapper.vm.$emit(
          'delete-file-confirmed'
        )

        expect(wrapper.emitted('delete-file-confirmed')).toHaveLength(1)
      })
      it('Should emit update:selectedFolderToUpload when DocumentsFolderBrowser emits update:selectedFolderToUpload', async () => {
        // Given DocumentsFolderBrowser is displayed
        wrapper = createWrapper({ ...defaultProps, search: '' })

        // When documentsViewHeaderWrapper emits update:selectedFolderToUpload
        const documentsFoldersBrowserWrapper: DocumentsFoldersBrowserTypeWrapper =
          wrapper.findComponent(DocumentsFoldersBrowser)

        await documentsFoldersBrowserWrapper.vm.$emit(
          'update:searchFolderId',
          27
        )

        // Then update:selectedFolderToUpload must be emitted with 27
        expect(wrapper.emitted('update:searchFolderId')).toStrictEqual([[27]])
      })
    })
  })

  describe('Bindings with DocumentsInFolderAndChildBar', () => {
    describe('Rendering', () => {
      describe('Display or NOT DocumentsInFolderAndChildBar', () => {
        const displayCases = [
          { search: '', expected: false },
          { search: 'test', expected: true }
        ]

        test.each(displayCases)(
          'Should DocumentsInFolderAndChildBar have display at $expect if isSearchActive prop is $isSearchActive',
          ({ search, expected }) => {
            wrapper = createWrapper({ ...defaultProps, search })
            expect(
              wrapper.findComponent(DocumentsInFolderAndChildBar).exists()
            ).toBe(expected)
          }
        )
      })
    })
    describe('Props', () => {
      it('Should have nbDocumentsInFolderAndChild set at 1', () => {
        const documentsInFolderAndChildBarWrapper: VueWrapper<
          ComponentPublicInstance<{ nbDocumentsInFolderAndChild: number }>
        > = wrapper.findComponent(DocumentsInFolderAndChildBar)

        expect(
          documentsInFolderAndChildBarWrapper.vm.nbDocumentsInFolderAndChild
        ).toBe(5201)
      })
    })
  })

  describe('Bindings with DocumentsInAllFolders', () => {
    describe('Rendering', () => {
      describe('Display or NOT DocumentsInAllFolders', () => {
        const displayCases = [
          { search: '', expected: false },
          { search: 'test', expected: true }
        ]

        test.each(displayCases)(
          'Should DocumentsInAllFoldersBar have display at $expect if search prop is $search',
          ({ search, expected }) => {
            wrapper = createWrapper({ ...defaultProps, search })
            expect(
              wrapper.findComponent(DocumentsInAllFoldersBar).exists()
            ).toBe(expected)
          }
        )
      })
    })
    describe('Props', () => {
      it('Should have nbDocumentsInFolderAndChild set at 75201', () => {
        const documentsInAllFoldersBarWrapper: VueWrapper<
          ComponentPublicInstance<{ nbDocumentsInAllFolders: number }>
        > = wrapper.findComponent(DocumentsInAllFoldersBar)

        expect(documentsInAllFoldersBarWrapper.vm.nbDocumentsInAllFolders).toBe(
          75201
        )
      })
    })
    describe('Events', () => {
      it('Should emit click-on-total-count when DocumentsInAllFoldersBar emit click', async () => {
        // Given DocumentsInAllFoldersBar is displayed
        wrapper = createWrapper({ ...defaultProps, search: 'test' })

        // When DocumentsInAllFoldersBar emit click
        const documentsInAllFoldersBarWrapper: VueWrapper<
          ComponentPublicInstance<{ nbDocumentsInAllFolders: number }>
        > = wrapper.findComponent(DocumentsInAllFoldersBar)

        await documentsInAllFoldersBarWrapper.vm.$emit('click')

        // Then ArboDocumentsTable should emit click-on-total-count
        expect(wrapper.emitted('click-on-total-count')).toBeTruthy()
      })
    })
  })

  describe('bindings with DocumentSyncStatusElement', () => {
    describe('rendering', () => {
      it('should not render ged sync icon when isCollabUser is false', () => {
        wrapper = createWrapper({ ...defaultProps, search: 'test' })

        expect(
          wrapper.findComponent(DocumentSyncStatusElement).exists()
        ).toBeFalsy()
      })

      it('should not render ged sync icon when isCollabUser is true', () => {
        wrapper = createWrapper({
          ...defaultProps,
          documents: Documents.loaded([documentAPIMock]),
          folders: Folders.loading(),
          searchFolderId: 27,
          documentsPerPage: 10,
          documentsTotalInFolderAndChild: 5201,
          documentsTotalInAllFolders: 75201,
          search: 'test',
          isCollabUser: true,
          pageNumber: 1
        })

        expect(
          wrapper.findComponent(DocumentSyncStatusElement).exists()
        ).toBeTruthy()
      })
    })
  })

  describe('bindings with MultipleDocumentsCtas', () => {
    test('static props', async () => {
      const nattoTableWrapper: NattoTableWrapper =
        wrapper.findComponent(NattoTable)

      nattoTableWrapper.vm.$emit('selection-change', ['27'])

      await flushPromises()

      multipleDocumentsCtas = findMultipleDocumentsCtas(wrapper)

      expect(multipleDocumentsCtas.props('selectedDocumentsIds')).toStrictEqual(
        ['27']
      )
    })
    describe('events', () => {
      it('should open the deleteFileModalConfirmation when delete-all-clicked is emitted', async () => {
        // When download-all-clicked is emitted
        multipleDocumentsCtas = findMultipleDocumentsCtas(wrapper)

        await multipleDocumentsCtas.vm.$emit('delete-all-clicked')

        expect(
          findDeleteFileModalConfirmation(wrapper).props('modelValue')
        ).toBe(true)
      })
      it('should dispatchDownloadDocuments when download-all-clicked is emitted', async () => {
        const store = createSearchStoreMocked()

        // Given a new store is init
        store.dispatch = jest.fn()

        wrapper = createWrapper(defaultProps, store)

        // When download-all-clicked is emitted
        multipleDocumentsCtas = findMultipleDocumentsCtas(wrapper)

        await multipleDocumentsCtas.vm.$emit('download-all-clicked')

        await flushPromises()

        // Then the store must dispatch the downloadDocuments action
        expect(store.dispatch).toHaveBeenCalledWith(
          searchModule('downloadDocuments'),
          []
        )
      })
    })
  })
})
