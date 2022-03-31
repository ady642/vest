"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_utils_1 = require("@vue/test-utils");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const DocumentAPIMock_1 = require("dummy_data/tests/unit/src/modules/Search/mocks/DocumentAPIMock");
const ArboDocumentsTable_vue_1 = require("@/modules/Search/components/DocumentsTable/ArboDocumentsTable.vue");
const Folders_1 = require("@/modules/Search/models/Folders/Inputs/Folders");
const Documents_1 = require("@/modules/Search/models/Documents/Inputs/Documents");
const DocumentsFoldersBrowser_vue_1 = require("@/modules/Search/components/Navigation/DocumentsFoldersBrowser.vue");
const NattoTable_vue_1 = require("@/Common/components/Table/NattoTable.vue");
const DocumentsInFolderAndChildBar_vue_1 = require("@/modules/Search/components/Filters/InfoBars/DocumentsInFolderAndChildBar.vue");
const DocumentsInAllFoldersBar_vue_1 = require("@/modules/Search/components/Filters/InfoBars/DocumentsInAllFoldersBar.vue");
const constants_1 = require("@/Common/constants");
const DocumentActionsElement_vue_1 = require("@/modules/Search/components/DocumentsTable/DocumentsTableElements/DocumentActionsElement.vue");
const DeleteFileModalConfirmation_vue_1 = require("@/modules/DataManipulation/Delete/DeleteFile/components/Modals/DeleteFileModalConfirmation.vue");
const DocumentSyncStatusElement_vue_1 = require("@/modules/Search/components/DocumentsTable/DocumentsTableElements/DocumentSyncStatusElement.vue");
const DocumentsSortOptions_1 = require("@/modules/Search/models/Documents/Query/DocumentsSortOptions");
const NattoDropZone_vue_1 = require("@/Common/components/Upload/NattoDropZone.vue");
const storeMock_1 = require("tests/unit/__mocks__/storeMock");
const useStyleguideStubs_1 = require("dummy_data/tests/unit/utils/useStyleguideStubs");
const finders_1 = require("dummy_data/tests/unit/utils/finders");
const store_1 = require("@/modules/Search/store");
const Document_1 = require("@/modules/Search/models/Documents/Inputs/Document");
const { MpTable } = (0, useStyleguideStubs_1.default)();
const defaultProps = {
    documents: Documents_1.default.loaded([{ ...DocumentAPIMock_1.documentAPIMock }]),
    folders: Folders_1.default.loading(),
    searchFolderId: 27,
    documentsPerPage: 10,
    pageNumber: 1,
    documentsTotalInFolderAndChild: 5201,
    documentsTotalInAllFolders: 75201,
    search: 'test',
    isCollabUser: false,
    sortOptions: new DocumentsSortOptions_1.default({
        sortBy: 'name',
        sortDirection: 'ascending'
    }),
    isTableDropZoneDisabled: false
};
const createWrapper = (props = defaultProps, store = (0, storeMock_1.createSearchStoreMocked)()) => (0, wrapperFactory_1.default)(ArboDocumentsTable_vue_1.default, {
    props,
    global: {
        plugins: [store],
        stubs: {
            NattoDropZone: NattoDropZone_vue_1.default,
            NattoTable: NattoTable_vue_1.default,
            DocumentActionsElement: DocumentActionsElement_vue_1.default,
            DeleteFileModalConfirmation: DeleteFileModalConfirmation_vue_1.default,
            MpTable,
            DocumentSyncStatusElement: DocumentSyncStatusElement_vue_1.default
        },
        directives: {
            Loading: {},
            InfiniteScroll: {}
        }
    }
});
const findNattoDropZone = (wrapper) => wrapper.findComponent(NattoDropZone_vue_1.default);
let wrapper = createWrapper();
let nattoDropZoneWrapper = findNattoDropZone(wrapper);
let multipleDocumentsCtas = (0, finders_1.findMultipleDocumentsCtas)(wrapper);
describe('ArboDocumentsTable', () => {
    beforeEach(() => {
        // Given ArboDocumentsTable is mounted
        wrapper = createWrapper();
        nattoDropZoneWrapper = findNattoDropZone(wrapper);
        multipleDocumentsCtas = (0, finders_1.findMultipleDocumentsCtas)(wrapper);
    });
    describe('binding with natto-drop-zone', () => {
        describe('props', () => {
            it('should call uploadFiles on drop', async () => {
                // Given the isTableDropZoneDisabled prop is true
                wrapper = createWrapper({
                    ...defaultProps,
                    isTableDropZoneDisabled: true
                });
                nattoDropZoneWrapper = findNattoDropZone(wrapper);
                // Then the disabled prop of the NattoDropZone must also be true
                expect(nattoDropZoneWrapper.props('disabled')).toBe(true);
            });
        });
        describe('events', () => {
            it('should emit files-dropped when NattoDropZone emit files-changes', () => {
                // Given we drop a file
                const files = [new File(['test'], 'test.txt', { type: 'text/plain' })];
                // When NattoDropZone emit files-changes
                nattoDropZoneWrapper.vm.$emit('files-changes', files);
                // Then ArboDocumentsTable must emit files-dropped
                expect(wrapper.emitted('files-dropped')).toHaveLength(1);
                expect(wrapper.emitted('files-dropped')).toEqual([[files]]);
            });
        });
    });
    describe('bindings with NattoTable', () => {
        describe('props', () => {
            it('static props', () => {
                const nattoTableWrapper = wrapper.findComponent(NattoTable_vue_1.default);
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
                            syncStatus: constants_1.default.PENDING_SYNC,
                            hasSubscribedToVault: false
                        },
                        restorationStatus: '',
                        size: 54545,
                        type: 'jpg',
                        updatedDate: '2018-05-27',
                        preview: '',
                        lifecycleStatus: Document_1.LifeCycleStatus.Treated
                    }
                ]);
                expect(nattoTableWrapper.vm.hideHeader).toBe(true);
                expect(nattoTableWrapper.vm.itemsPerPage).toBe(10);
                expect(nattoTableWrapper.vm.itemsTotal).toBe(5201);
                expect(nattoTableWrapper.vm.pageNumber).toBe(1);
                expect(nattoTableWrapper.vm.paginated).toBe(true);
                expect(nattoTableWrapper.vm.loading).toBe(false);
                expect(nattoTableWrapper.vm.sortOptions).toEqual(defaultProps.sortOptions);
                expect(nattoTableWrapper.vm.highlightRowOnClick).toEqual(true);
                expect(nattoTableWrapper.props('isSelection')).toBe(true);
                expect(nattoTableWrapper.props('areAllSelected')).toBe(false);
            });
            describe('areAllSelected', () => {
                it.each([
                    {
                        documents: Documents_1.default.loading(''),
                        selectionIds: [],
                        areAllSelected: false
                    },
                    {
                        documents: Documents_1.default.loading(''),
                        selectionIds: ['19'],
                        areAllSelected: false
                    },
                    {
                        documents: Documents_1.default.loaded([{ id: '19' }]),
                        selectionIds: [],
                        areAllSelected: false
                    },
                    {
                        documents: Documents_1.default.loaded([
                            { id: '19' },
                            { id: '27' }
                        ]),
                        selectionIds: ['27'],
                        areAllSelected: false
                    },
                    {
                        documents: Documents_1.default.loaded([{ id: '19' }]),
                        selectionIds: ['19'],
                        areAllSelected: true
                    }
                ])('areSelected must be true only if we have documents and the selectedIds is the same length as the collection', async ({ documents, selectionIds, areAllSelected }) => {
                    wrapper = createWrapper({
                        ...defaultProps,
                        documents
                    });
                    const nattoTableWrapper = wrapper.findComponent(NattoTable_vue_1.default);
                    await nattoTableWrapper.vm.$emit('selection-change', selectionIds);
                    expect(wrapper.vm.areAllSelected).toBe(areAllSelected);
                });
            });
        });
        describe('events', () => {
            it('should emit page-opened when NattoTable emits page-opened', async () => {
                // When NatoTable emits page-opened
                const nattoTableWrapper = wrapper.findComponent(NattoTable_vue_1.default);
                await nattoTableWrapper.vm.$emit('page-opened', 2);
                // Then ArboDocumentsTable must emit page-opened too
                expect(wrapper.emitted('page-opened')).toHaveLength(1);
                expect(wrapper.emitted('page-opened')).toEqual([[2]]);
            });
            it('Should emit sort-arbo-table on sort-arbo-table', async () => {
                const nattoTableWrapper = wrapper.findComponent(NattoTable_vue_1.default);
                await nattoTableWrapper.vm.$emit('sort-arbo-table', defaultProps.sortOptions);
                expect(wrapper.emitted('sort-arbo-table')).toHaveLength(1);
                expect(wrapper.emitted('sort-arbo-table')).toStrictEqual([
                    [defaultProps.sortOptions]
                ]);
            });
            it('Should emit document-clicked when row-clicked on table ', () => {
                const nattoTableWrapper = wrapper.findComponent(NattoTable_vue_1.default);
                nattoTableWrapper.vm.$emit('row-clicked', { id: 1, name: 'test' });
                expect(wrapper.emitted('document-clicked')).toEqual([
                    [{ id: 1, name: 'test' }]
                ]);
            });
            it('Should not emit document-clicked when row-clicked on table with a document.name property', () => {
                const nattoTableWrapper = wrapper.findComponent(NattoTable_vue_1.default);
                nattoTableWrapper.vm.$emit('row-clicked', { id: 1 });
                expect(wrapper.emitted('document-clicked')).toBeFalsy();
            });
            it('should call the toggleAll method of ElTable when NattoTable emits select-all', () => {
                const nattoTableWrapper = wrapper.findComponent(NattoTable_vue_1.default);
                nattoTableWrapper.vm.toggleAll = jest.fn();
                nattoTableWrapper.vm.$emit('select-all');
                expect(nattoTableWrapper.vm.toggleAll).toHaveBeenCalled();
            });
        });
    });
    describe('bindings with DocumentsFolderBrowser', () => {
        describe('rendering', () => {
            const displayCases = [
                { search: '', displayDocumentsFolderBrowser: true },
                { search: 'test', displayDocumentsFolderBrowser: false }
            ];
            test.each(displayCases)('isSearchActive: $isSearchActive => displayDocumentsFolderBrowser: $displayDocumentsFolderBrowser', ({ search, displayDocumentsFolderBrowser }) => {
                wrapper = createWrapper({ ...defaultProps, search });
                expect(wrapper.findComponent(DocumentsFoldersBrowser_vue_1.default).exists()).toBe(displayDocumentsFolderBrowser);
            });
        });
        describe('props', () => {
            // Given DocumentsFolderBrowser is displayed
            wrapper = createWrapper({ ...defaultProps, search: '' });
            const documentsFoldersBrowserWrapper = wrapper.findComponent(DocumentsFoldersBrowser_vue_1.default);
            expect(documentsFoldersBrowserWrapper.vm.folders).toStrictEqual(Folders_1.default.loading());
        });
        describe('events', () => {
            describe('goto-clicked', () => {
                it('Should set the folderId, reset the search and fetch the documents when goto-clicked fired', async () => {
                    const store = (0, storeMock_1.createSearchStoreMocked)();
                    store.dispatch = jest.fn();
                    wrapper = createWrapper({ ...defaultProps, search: '' }, store);
                    const documentActionElementWrapper = wrapper.findComponent(DocumentActionsElement_vue_1.default);
                    await documentActionElementWrapper.vm.$emit('goto-clicked', {
                        documentId: '1234',
                        isSynchronizedDocument: true,
                        folderId: 9876
                    });
                    expect(store.dispatch).toHaveBeenNthCalledWith(1, (0, store_1.searchModule)('setFilters'), {
                        certified: 'all',
                        findInChildFolders: false,
                        folderId: 9876,
                        period: {
                            endDate: '',
                            startDate: ''
                        },
                        search: ''
                    });
                    expect(store.dispatch).toHaveBeenNthCalledWith(2, (0, store_1.searchModule)('setFilters'), {
                        certified: 'all',
                        findInChildFolders: false,
                        folderId: 0,
                        period: {
                            endDate: '',
                            startDate: ''
                        },
                        search: ''
                    });
                    expect(store.dispatch).toHaveBeenNthCalledWith(3, (0, store_1.searchModule)('fetchDocuments'));
                });
            });
            describe('download-clicked', () => {
                it('Should emit on-download-document when download-clicked fired', async () => {
                    // Given DocumentsFolderBrowser is displayed
                    wrapper = createWrapper({ ...defaultProps, search: '' });
                    const documentActionElementWrapper = wrapper.findComponent(DocumentActionsElement_vue_1.default);
                    await documentActionElementWrapper.vm.$emit('download-clicked', {
                        documentId: '1234',
                        isSynchronizedDocument: true
                    });
                    expect(wrapper.emitted('on-download-document')).toHaveLength(1);
                    expect(wrapper.emitted('on-download-document')).toEqual([['1234']]);
                });
            });
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
                ])('Should reset document selection when document-dropdown-clicked is fired', async ({ selectedDocumentIds, selectedDocumentActionId, expectedSelectedDocument }) => {
                    // Given DocumentsFolderBrowser is displayed
                    wrapper = createWrapper({ ...defaultProps, search: '' });
                    const documentActionElementWrapper = wrapper.findComponent(DocumentActionsElement_vue_1.default);
                    const nattoTableWrapper = wrapper.findComponent(NattoTable_vue_1.default);
                    nattoTableWrapper.vm.clearSelection = jest.fn();
                    nattoTableWrapper.vm.mpTableRef.handleRowClick = jest.fn();
                    nattoTableWrapper.vm.$emit('selection-change', selectedDocumentIds);
                    documentActionElementWrapper.vm.$emit('document-dropdown-clicked', selectedDocumentActionId);
                    await wrapper.vm.$nextTick();
                    multipleDocumentsCtas = (0, finders_1.findMultipleDocumentsCtas)(wrapper);
                    expect(nattoTableWrapper.vm.clearSelection).toHaveBeenCalled();
                    expect(multipleDocumentsCtas.props('selectedDocumentsIds')).toStrictEqual(expectedSelectedDocument);
                });
            });
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
                ])('Should open delete popup for expectedDeletedDocumentId when selectedDocumentIds and deleted action is on the selectedDocumentActionId', async ({ selectedDocumentActionId, expectedDeletedDocumentId, selectedDocumentIds }) => {
                    // Given DocumentsFolderBrowser is displayed
                    wrapper = createWrapper({ ...defaultProps, search: '' });
                    const documentActionElementWrapper = wrapper.findComponent(DocumentActionsElement_vue_1.default);
                    const nattoTableWrapper = wrapper.findComponent(NattoTable_vue_1.default);
                    nattoTableWrapper.vm.$emit('selection-change', selectedDocumentIds);
                    nattoTableWrapper.vm.clearSelection = jest.fn();
                    nattoTableWrapper.vm.mpTableRef.handleRowClick = jest.fn();
                    await documentActionElementWrapper.vm.$emit('delete-clicked', {
                        documentId: selectedDocumentActionId,
                        isSynchronizedDocument: true
                    });
                    const deleteFileModalConfirmationWrapper = wrapper.findComponent(DeleteFileModalConfirmation_vue_1.default);
                    expect(nattoTableWrapper.vm.clearSelection).toHaveBeenCalled();
                    expect(deleteFileModalConfirmationWrapper.props('modelValue')).toBe(true);
                    expect(deleteFileModalConfirmationWrapper.props('documentIds')).toStrictEqual(expectedDeletedDocumentId);
                    expect(deleteFileModalConfirmationWrapper.props('isSynchronizedDocument')).toBe(true);
                });
            });
            it('Should emit delete-file-confirmed when DeleteFileModalConfirmation emits delete-file-confirmed', async () => {
                wrapper = createWrapper({ ...defaultProps, search: '' });
                const deleteFileModalConfirmationWrapper = wrapper.findComponent(DeleteFileModalConfirmation_vue_1.default);
                await deleteFileModalConfirmationWrapper.vm.$emit('delete-file-confirmed');
                expect(wrapper.emitted('delete-file-confirmed')).toHaveLength(1);
            });
            it('Should emit update:selectedFolderToUpload when DocumentsFolderBrowser emits update:selectedFolderToUpload', async () => {
                // Given DocumentsFolderBrowser is displayed
                wrapper = createWrapper({ ...defaultProps, search: '' });
                // When documentsViewHeaderWrapper emits update:selectedFolderToUpload
                const documentsFoldersBrowserWrapper = wrapper.findComponent(DocumentsFoldersBrowser_vue_1.default);
                await documentsFoldersBrowserWrapper.vm.$emit('update:searchFolderId', 27);
                // Then update:selectedFolderToUpload must be emitted with 27
                expect(wrapper.emitted('update:searchFolderId')).toStrictEqual([[27]]);
            });
        });
    });
    describe('Bindings with DocumentsInFolderAndChildBar', () => {
        describe('Rendering', () => {
            describe('Display or NOT DocumentsInFolderAndChildBar', () => {
                const displayCases = [
                    { search: '', expected: false },
                    { search: 'test', expected: true }
                ];
                test.each(displayCases)('Should DocumentsInFolderAndChildBar have display at $expect if isSearchActive prop is $isSearchActive', ({ search, expected }) => {
                    wrapper = createWrapper({ ...defaultProps, search });
                    expect(wrapper.findComponent(DocumentsInFolderAndChildBar_vue_1.default).exists()).toBe(expected);
                });
            });
        });
        describe('Props', () => {
            it('Should have nbDocumentsInFolderAndChild set at 1', () => {
                const documentsInFolderAndChildBarWrapper = wrapper.findComponent(DocumentsInFolderAndChildBar_vue_1.default);
                expect(documentsInFolderAndChildBarWrapper.vm.nbDocumentsInFolderAndChild).toBe(5201);
            });
        });
    });
    describe('Bindings with DocumentsInAllFolders', () => {
        describe('Rendering', () => {
            describe('Display or NOT DocumentsInAllFolders', () => {
                const displayCases = [
                    { search: '', expected: false },
                    { search: 'test', expected: true }
                ];
                test.each(displayCases)('Should DocumentsInAllFoldersBar have display at $expect if search prop is $search', ({ search, expected }) => {
                    wrapper = createWrapper({ ...defaultProps, search });
                    expect(wrapper.findComponent(DocumentsInAllFoldersBar_vue_1.default).exists()).toBe(expected);
                });
            });
        });
        describe('Props', () => {
            it('Should have nbDocumentsInFolderAndChild set at 75201', () => {
                const documentsInAllFoldersBarWrapper = wrapper.findComponent(DocumentsInAllFoldersBar_vue_1.default);
                expect(documentsInAllFoldersBarWrapper.vm.nbDocumentsInAllFolders).toBe(75201);
            });
        });
        describe('Events', () => {
            it('Should emit click-on-total-count when DocumentsInAllFoldersBar emit click', async () => {
                // Given DocumentsInAllFoldersBar is displayed
                wrapper = createWrapper({ ...defaultProps, search: 'test' });
                // When DocumentsInAllFoldersBar emit click
                const documentsInAllFoldersBarWrapper = wrapper.findComponent(DocumentsInAllFoldersBar_vue_1.default);
                await documentsInAllFoldersBarWrapper.vm.$emit('click');
                // Then ArboDocumentsTable should emit click-on-total-count
                expect(wrapper.emitted('click-on-total-count')).toBeTruthy();
            });
        });
    });
    describe('bindings with DocumentSyncStatusElement', () => {
        describe('rendering', () => {
            it('should not render ged sync icon when isCollabUser is false', () => {
                wrapper = createWrapper({ ...defaultProps, search: 'test' });
                expect(wrapper.findComponent(DocumentSyncStatusElement_vue_1.default).exists()).toBeFalsy();
            });
            it('should not render ged sync icon when isCollabUser is true', () => {
                wrapper = createWrapper({
                    ...defaultProps,
                    documents: Documents_1.default.loaded([DocumentAPIMock_1.documentAPIMock]),
                    folders: Folders_1.default.loading(),
                    searchFolderId: 27,
                    documentsPerPage: 10,
                    documentsTotalInFolderAndChild: 5201,
                    documentsTotalInAllFolders: 75201,
                    search: 'test',
                    isCollabUser: true,
                    pageNumber: 1
                });
                expect(wrapper.findComponent(DocumentSyncStatusElement_vue_1.default).exists()).toBeTruthy();
            });
        });
    });
    describe('bindings with MultipleDocumentsCtas', () => {
        test('static props', async () => {
            const nattoTableWrapper = wrapper.findComponent(NattoTable_vue_1.default);
            nattoTableWrapper.vm.$emit('selection-change', ['27']);
            await (0, test_utils_1.flushPromises)();
            multipleDocumentsCtas = (0, finders_1.findMultipleDocumentsCtas)(wrapper);
            expect(multipleDocumentsCtas.props('selectedDocumentsIds')).toStrictEqual(['27']);
        });
        describe('events', () => {
            it('should open the deleteFileModalConfirmation when delete-all-clicked is emitted', async () => {
                // When download-all-clicked is emitted
                multipleDocumentsCtas = (0, finders_1.findMultipleDocumentsCtas)(wrapper);
                await multipleDocumentsCtas.vm.$emit('delete-all-clicked');
                expect((0, finders_1.findDeleteFileModalConfirmation)(wrapper).props('modelValue')).toBe(true);
            });
            it('should dispatchDownloadDocuments when download-all-clicked is emitted', async () => {
                const store = (0, storeMock_1.createSearchStoreMocked)();
                // Given a new store is init
                store.dispatch = jest.fn();
                wrapper = createWrapper(defaultProps, store);
                // When download-all-clicked is emitted
                multipleDocumentsCtas = (0, finders_1.findMultipleDocumentsCtas)(wrapper);
                await multipleDocumentsCtas.vm.$emit('download-all-clicked');
                await (0, test_utils_1.flushPromises)();
                // Then the store must dispatch the downloadDocuments action
                expect(store.dispatch).toHaveBeenCalledWith((0, store_1.searchModule)('downloadDocuments'), []);
            });
        });
    });
});
//# sourceMappingURL=ArboDocumentsTable.spec.js.map