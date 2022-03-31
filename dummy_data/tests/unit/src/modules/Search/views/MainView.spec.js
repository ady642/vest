"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const MainViewLayout_vue_1 = require("@/modules/Search/components/Layouts/MainViewLayout.vue");
const BasicLayout_vue_1 = require("@/modules/Search/components/Layouts/BasicLayout.vue");
const MainView_vue_1 = require("@/modules/Search/views/MainView.vue");
const DocumentsUploadBox_vue_1 = require("@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Activators/DocumentsUploadBox.vue");
const WhoUploadModal_vue_1 = require("@/modules/DataManipulation/Upload/components/WhoUploadModal/WhoUploadModal.vue");
const FolderTabs_vue_1 = require("@/modules/Search/components/Tabs/FolderTabs.vue");
const DocumentsSearchFilters_vue_1 = require("@/modules/Search/components/Filters/DocumentsSearchFilters.vue");
const DocumentsFilters_1 = require("@/modules/Search/models/Documents/Query/DocumentsFilters");
const DocumentsTable_vue_1 = require("@/modules/Search/components/DocumentsTable/DocumentsTable.vue");
const Documents_1 = require("@/modules/Search/models/Documents/Inputs/Documents");
const DocumentAPIMock_1 = require("../mocks/DocumentAPIMock");
const DocumentsPaginator_1 = require("@/modules/Search/models/Documents/Query/DocumentsPaginator");
const FileUpload_1 = require("@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload");
const Period_1 = require("@/Common/models/List/Period");
const Folders_1 = require("@/modules/Search/models/Folders/Inputs/Folders");
const storeMock_1 = require("tests/unit/__mocks__/storeMock");
const ArboCardList_vue_1 = require("@/modules/Search/components/Cards/ArboCardList.vue");
const FoldersDataMock_1 = require("../mocks/FoldersDataMock");
const TrashCard_vue_1 = require("@/modules/Trash/components/Cards/TrashCard.vue");
const MailToGedModal_vue_1 = require("@/modules/DataManipulation/MailToGed/components/Modals/MailToGedModal.vue");
const MailToGedDataMock_1 = require("dummy_data/tests/unit/src/modules/DataManipulation/MailToGed/mocks/MailToGedDataMock");
const analyticsLog_1 = require("@/Common/helpers/analyticsLog");
const createStoreMock_1 = require("dummy_data/tests/unit/__mocks__/storeMock/createStoreMock");
const finders_1 = require("dummy_data/tests/unit/utils/finders");
const Document_1 = require("@/modules/Search/models/Documents/Inputs/Document");
jest.mock('@/Common/helpers/analyticsLog', () => ({
    trackEventFactory: jest.fn(),
    pageViewFactory: jest.fn()
}));
const { MailToGedData } = (0, MailToGedDataMock_1.default)();
const foldersData = Folders_1.default.loaded([
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
]);
const documentsData = Documents_1.default.loaded([{ ...DocumentAPIMock_1.documentAPIMock }]);
let storeMock = (0, storeMock_1.createSearchStoreMocked)();
storeMock.state.GED.DataManipulation.MailToGed.mailToGedInformations =
    MailToGedData;
const defaultProps = { resetFilters: 'true' };
const createWrapper = ({ resetFilters = 'true' } = defaultProps, store = storeMock, directives = {}) => (0, wrapperFactory_1.default)(MainView_vue_1.default, {
    props: {
        isDocumentUploadModalOpened: true,
        resetFilters
    },
    global: {
        directives,
        plugins: [store],
        stubs: {
            MainViewLayout: MainViewLayout_vue_1.default,
            BasicLayout: BasicLayout_vue_1.default,
            TrashCard: TrashCard_vue_1.default
        }
    }
});
const findDocumentsTable = (wrapper) => wrapper.findComponent(DocumentsTable_vue_1.default);
const findDocumentsSearchFilters = (wrapper) => wrapper.findComponent(DocumentsSearchFilters_vue_1.default);
const findWhoUploadModal = (wrapper) => wrapper.findComponent(WhoUploadModal_vue_1.default);
let wrapper = createWrapper();
let documentsDetailsDrawer = (0, finders_1.findDocumentDetailsDrawer)(wrapper);
let documentsTableWrapper = findDocumentsTable(wrapper);
describe('MainView', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        storeMock = (0, storeMock_1.createSearchStoreMocked)({
            areAnyFilters: true,
            filters: new DocumentsFilters_1.default({
                search: 'test',
                period: new Period_1.default(),
                folderId: 0,
                findInChildFolders: true
            })
        });
        wrapper = createWrapper(defaultProps, storeMock);
        documentsTableWrapper = findDocumentsTable(wrapper);
        expect(analyticsLog_1.pageViewFactory).toBeCalledWith('document-pgv');
        storeMock.dispatch = jest.fn();
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('onMounted', () => {
        it('Should reset paginator and and set the folderId to 0 (all folders) and finally fetch the documents if filters.search is not undefined', async () => {
            const storeWithSearch = (0, storeMock_1.createSearchStoreMocked)({
                filters: new DocumentsFilters_1.default({
                    search: 'test',
                    period: new Period_1.default(),
                    folderId: 0,
                    findInChildFolders: true
                })
            });
            storeWithSearch.dispatch = jest.fn();
            wrapper = await createWrapper(defaultProps, storeWithSearch);
            expect(storeWithSearch.dispatch).toHaveBeenNthCalledWith(1, 'GED/Search/setPaginator', { pageNumber: 1, itemsPerPage: 100, totalItems: 0 });
            expect(storeWithSearch.dispatch).toHaveBeenNthCalledWith(2, 'GED/Search/setFilters', {
                search: 'test',
                folderId: 0,
                findInChildFolders: true,
                period: new Period_1.default(),
                certified: 'all'
            });
            expect(storeWithSearch.dispatch).toHaveBeenNthCalledWith(3, 'GED/Search/fetchDocuments');
        });
        it('Should reset paginator and and set the folderId to 0 (all folders) and not fetch the documents if filters.search is undefined', async () => {
            const storeNoFilterSearchMock = (0, storeMock_1.createSearchStoreMocked)({
                searchActive: false,
                activeFiltersCount: 0,
                folders: Folders_1.default.loaded([]),
                filters: new DocumentsFilters_1.default({
                    findInChildFolders: true,
                    search: undefined,
                    period: new Period_1.default(),
                    folderId: 0
                })
            });
            storeNoFilterSearchMock.dispatch = jest.fn();
            wrapper = createWrapper(defaultProps, storeNoFilterSearchMock);
            expect(storeNoFilterSearchMock.dispatch).toHaveBeenNthCalledWith(1, 'GED/Search/setPaginator', { pageNumber: 1, itemsPerPage: 100, totalItems: 0 });
            expect(storeNoFilterSearchMock.dispatch).toHaveBeenNthCalledWith(2, 'GED/Search/setFilters', {
                search: '',
                folderId: 0,
                findInChildFolders: true,
                period: new Period_1.default(),
                certified: 'all'
            });
            expect(storeNoFilterSearchMock.dispatch).not.toHaveBeenCalledWith(3, 'GED/Search/fetchDocuments');
        });
        it('should open the WhoUploadModal When openWhoUploadModal query param is at true', async () => {
            // Given openWhoUploadModal is at true
            // Then the WhoUploadModal must be opened
            expect(findWhoUploadModal(wrapper).props('modelValue')).toBe(true);
        });
    });
    describe('events', () => {
        describe('events from MailToGedModal', () => {
            it("Should handle more-info event when it's emitted", async () => {
                const w = { location: { origin: 'http://127.0.0.1' } };
                const mockWindowOpen = jest.fn().mockReturnValue(w);
                window.open = mockWindowOpen;
                // When MailToGedModal emit more-info
                const mailToGedModalWrapper = wrapper.findComponent(MailToGedModal_vue_1.default);
                mailToGedModalWrapper.vm.$emit('more-info');
                // Then should navigate to the correct url
                expect(mockWindowOpen).toBeCalledWith('https://www.kpmg.fr/mailtoged');
            });
            it("Should handle close event when it's emitted", async () => {
                wrapper.vm.isMailToGedOpened = true;
                const mailToGedModalWrapper = wrapper.findComponent(MailToGedModal_vue_1.default);
                mailToGedModalWrapper.vm.$emit('close');
                await wrapper.vm.$nextTick();
                expect(wrapper.vm.isMailToGedOpened).toBe(false);
            });
        });
        it('Should change filters store and fetch documents when tabSelectedHandler fired', async () => {
            const storeWithSearchMock = (0, storeMock_1.createSearchStoreMocked)({
                documents: documentsData,
                areAnyFilters: true,
                filters: new DocumentsFilters_1.default({
                    findInChildFolders: true,
                    search: 'test',
                    period: new Period_1.default(),
                    folderId: 0
                })
            });
            storeWithSearchMock.dispatch = jest.fn();
            wrapper = createWrapper(defaultProps, storeWithSearchMock);
            const documentsTabsWrapper = wrapper.findComponent(FolderTabs_vue_1.default);
            await documentsTabsWrapper.vm.$emit('tab-selected', 99);
            // Reset the page to 1
            expect(storeWithSearchMock.dispatch).toHaveBeenNthCalledWith(1, 'GED/Search/setPaginator', {
                itemsPerPage: 100,
                pageNumber: 1,
                totalItems: 0
            });
            // Set the folderId
            expect(storeWithSearchMock.dispatch).toHaveBeenNthCalledWith(2, 'GED/Search/setFilters', {
                findInChildFolders: true,
                folderId: 0,
                search: 'test',
                period: new Period_1.default(),
                certified: 'all'
            });
            // fetch the documents
            expect(storeWithSearchMock.dispatch).toHaveBeenNthCalledWith(3, 'GED/Search/fetchDocuments');
        });
        it('Should change filters store, reset pagination and fetch documents when handleChangeInput fired', async () => {
            const storeWithSearchMock = (0, storeMock_1.createSearchStoreMocked)({
                searchActive: true,
                filters: new DocumentsFilters_1.default({
                    findInChildFolders: true,
                    search: 'test',
                    period: new Period_1.default(),
                    folderId: 0
                })
            });
            wrapper = createWrapper(defaultProps, storeWithSearchMock);
            storeWithSearchMock.dispatch = jest.fn();
            const documentsSearchFiltersWrapper = findDocumentsSearchFilters(wrapper);
            await documentsSearchFiltersWrapper.vm.$emit('update:search', 'xf');
            expect(storeWithSearchMock.dispatch).toHaveBeenNthCalledWith(1, 'GED/Search/setPaginator', {
                pageNumber: 1,
                itemsPerPage: 100,
                totalItems: 0
            });
            expect(storeWithSearchMock.dispatch).toHaveBeenNthCalledWith(2, 'GED/Search/setFilters', {
                findInChildFolders: true,
                folderId: 0,
                search: 'test',
                period: new Period_1.default(),
                certified: 'all'
            });
            expect(storeWithSearchMock.dispatch).toHaveBeenNthCalledWith(3, 'GED/Search/setFilters', {
                findInChildFolders: true,
                folderId: 0,
                search: 'xf',
                period: new Period_1.default(),
                certified: 'all'
            });
        });
        it('Should emit 3 events when on-treat-by-collab event is emitted', async () => {
            const storeWithSearchMock = (0, storeMock_1.createSearchStoreMocked)({
                searchActive: true,
                filters: new DocumentsFilters_1.default({
                    findInChildFolders: true,
                    search: 'test',
                    period: new Period_1.default(),
                    folderId: 0
                }),
                folders: foldersData
            });
            storeWithSearchMock.dispatch = jest.fn();
            wrapper = createWrapper(defaultProps, storeWithSearchMock);
            const popWrapper = wrapper.findComponent(WhoUploadModal_vue_1.default);
            await popWrapper.vm.$emit('on-treat-by-collab', 1122);
            expect(analyticsLog_1.trackEventFactory).toBeCalledWith('updm-select-tree-continue-collab');
            expect(wrapper.emitted()['disable-selection-categories']).toBeTruthy();
            expect(wrapper.emitted()['disable-selection-categories']).toHaveLength(1);
            expect(wrapper.emitted()['disable-selection-categories'][0]).toStrictEqual([true]);
            expect(wrapper.emitted()['upload-all-files-same-folder']).toBeTruthy();
            expect(wrapper.emitted()['upload-all-files-same-folder']).toHaveLength(1);
            // Then dispatch with setSelectedFolderToUpload action must be call with 1223
            expect(storeWithSearchMock.dispatch).toHaveBeenCalledWith('GED/DataManipulation/Upload/setSelectedFolderToUpload', 1223);
            expect(popWrapper.props().modelValue).toBe(false);
            expect(wrapper.props().isDocumentUploadModalOpened).toBe(true);
        });
        it('Should not emit any events when on-treat-by-collab event is emitted on folder that have 0 default folder', async () => {
            const storeWithFolders = (0, storeMock_1.createSearchStoreMocked)({
                folders: Folders_1.default.loaded([
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
            });
            storeWithFolders.dispatch = jest.fn();
            wrapper = createWrapper(defaultProps, storeWithFolders);
            const popWrapper = wrapper.findComponent(WhoUploadModal_vue_1.default);
            await popWrapper.vm.$emit('on-treat-by-collab', 1122);
            expect(analyticsLog_1.trackEventFactory).not.toBeCalledWith('updm-select-tree-continue-collab');
            expect(wrapper.emitted()['disable-selection-categories']).toBeFalsy();
            expect(wrapper.emitted()['upload-all-files-same-folder']).toBeFalsy();
            // Then dispatch with setSelectedFolderToUpload action must be call with 1223
            expect(storeWithFolders.dispatch).not.toHaveBeenCalledWith('GED/DataManipulation/Upload/setSelectedFolderToUpload', 1223);
        });
        it('Should 2 events when on-treat-by-client event is emitted and folderId should be the default one', async () => {
            const storeWithSearchMock = (0, storeMock_1.createSearchStoreMocked)({
                searchActive: true,
                filters: new DocumentsFilters_1.default({
                    findInChildFolders: true,
                    search: 'test',
                    period: new Period_1.default(),
                    folderId: 0
                }),
                folders: foldersData
            });
            storeWithSearchMock.dispatch = jest.fn();
            wrapper = createWrapper(defaultProps, storeWithSearchMock);
            const popWrapper = wrapper.findComponent(WhoUploadModal_vue_1.default);
            await popWrapper.vm.$emit('on-treat-by-collab', 1122);
            await popWrapper.vm.$emit('on-treat-by-client', 1122);
            expect(analyticsLog_1.trackEventFactory).toBeCalledWith('updm-select-tree-continue-client');
            expect(wrapper.emitted()['disable-selection-categories']).toBeTruthy();
            expect(wrapper.emitted()['disable-selection-categories']).toHaveLength(2);
            expect(wrapper.emitted()['disable-selection-categories']).toStrictEqual([
                [true],
                [false]
            ]);
            // Then dispatch with setSelectedFolderToUpload action must be call with 27
            expect(storeWithSearchMock.dispatch).toHaveBeenCalledWith('GED/DataManipulation/Upload/setSelectedFolderToUpload', 1223);
            expect(popWrapper.props().modelValue).toBe(false);
            expect(wrapper.props().isDocumentUploadModalOpened).toBe(true);
        });
        it('Should 2 events when on-treat-by-client event is emitted and folderId should not be the default one', async () => {
            const foldersData = Folders_1.default.loaded([
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
            ]);
            const storeWithFolders = (0, storeMock_1.createSearchStoreMocked)({
                folders: foldersData
            });
            storeWithFolders.dispatch = jest.fn();
            wrapper = createWrapper(defaultProps, storeWithFolders);
            const popWrapper = wrapper.findComponent(WhoUploadModal_vue_1.default);
            await popWrapper.vm.$emit('on-treat-by-client', 1122);
            expect(analyticsLog_1.trackEventFactory).toBeCalledWith('updm-select-tree-continue-client');
            expect(wrapper.emitted()['disable-selection-categories']).toBeTruthy();
            expect(wrapper.emitted()['disable-selection-categories']).toHaveLength(1);
            expect(wrapper.emitted()['disable-selection-categories'][0]).toStrictEqual([false]);
            // Then dispatch with setSelectedFolderToUpload action must be call with 27
            expect(storeWithFolders.dispatch).toHaveBeenCalledWith('GED/DataManipulation/Upload/setSelectedFolderToUpload', 1122);
            expect(popWrapper.props().modelValue).toBe(false);
            expect(wrapper.props().isDocumentUploadModalOpened).toBe(true);
        });
        it('Should close upload type modal popup-folder-select-close event is emitted', async () => {
            const DocumentUploadBoxWrapper = wrapper.findComponent(DocumentsUploadBox_vue_1.default);
            const files = [
                new FileUpload_1.default(new File([''], 'filename', { type: 'text/html' }), FileUpload_1.StateUpload.UPLOADED),
                new FileUpload_1.default(new File([''], 'filename', { type: 'text/html' }), FileUpload_1.StateUpload.CANCELED)
            ];
            DocumentUploadBoxWrapper.vm.$emit('on-files-change', files);
            const popWrapper = wrapper.findComponent(WhoUploadModal_vue_1.default);
            await popWrapper.vm.$emit('popup-folder-select-close');
            await wrapper.vm.$nextTick();
            expect(analyticsLog_1.trackEventFactory).toBeCalledWith('updm-select-tree-cross-close');
            expect(popWrapper.props().modelValue).toBe(false);
        });
        it('Should change filters store and fetch documents when change-filters fired', async () => {
            const storeWithSearchMock = (0, storeMock_1.createSearchStoreMocked)({
                searchActive: true,
                filters: new DocumentsFilters_1.default({
                    findInChildFolders: true,
                    search: 'test',
                    period: new Period_1.default(),
                    folderId: 0
                })
            });
            storeWithSearchMock.dispatch = jest.fn();
            wrapper = createWrapper(defaultProps, storeWithSearchMock);
            const documentsSearchFiltersWrapper = findDocumentsSearchFilters(wrapper);
            const period = new Period_1.default({
                startDate: '2018-02-01T23:00:00.000Z',
                endDate: '2019-06-05T22:00:00.000Z'
            });
            const filters = new DocumentsFilters_1.default();
            filters.period = period;
            filters.certified = true;
            await documentsSearchFiltersWrapper.vm.$emit('change-filters', filters);
            expect(storeWithSearchMock.dispatch).toHaveBeenCalledWith('GED/Search/setFilters', {
                findInChildFolders: true,
                folderId: 0,
                search: 'test',
                period,
                certified: 'all'
            });
            expect(storeWithSearchMock.dispatch).toHaveBeenCalledWith('GED/Search/setFilters', {
                findInChildFolders: true,
                folderId: 0,
                search: 'test',
                period: new Period_1.default(),
                certified: true
            });
        });
        it('Should change filters store and fetch documents when reset-search-filters fired', async () => {
            const storeWithoutSearchMock = (0, storeMock_1.createSearchStoreMocked)({
                searchActive: true,
                filters: new DocumentsFilters_1.default({
                    findInChildFolders: true,
                    search: '',
                    period: new Period_1.default(),
                    folderId: 0
                })
            });
            storeWithoutSearchMock.dispatch = jest.fn();
            wrapper = createWrapper(defaultProps, storeWithoutSearchMock);
            const documentsSearchFiltersWrapper = findDocumentsSearchFilters(wrapper);
            await documentsSearchFiltersWrapper.vm.$emit('reset-filters');
            expect(storeWithoutSearchMock.dispatch).toHaveBeenCalledWith('GED/Search/setFilters', {
                findInChildFolders: true,
                folderId: 0,
                search: '',
                period: new Period_1.default(),
                certified: 'all'
            });
        });
        it('Should fire closeGedNotification and set isUploadTypeModalOpened true when upload type modal is opeend', async () => {
            const DocumentUploadBoxWrapper = wrapper.findComponent(DocumentsUploadBox_vue_1.default);
            const files = [
                new FileUpload_1.default(new File([''], 'filename', { type: 'text/html' }), FileUpload_1.StateUpload.UPLOADED),
                new FileUpload_1.default(new File([''], 'filename', { type: 'text/html' }), FileUpload_1.StateUpload.CANCELED)
            ];
            DocumentUploadBoxWrapper.vm.$emit('on-files-change', files);
            await wrapper.vm.$nextTick();
            expect(analyticsLog_1.trackEventFactory).toBeCalledWith('mdv-cta-upload-widget-click');
            const popWrapper = wrapper.findComponent(WhoUploadModal_vue_1.default);
            expect(popWrapper.props().modelValue).toBe(true);
            expect(storeMock.dispatch).toHaveBeenCalledWith('GED/DataManipulation/Upload/closeGedNotification');
        });
        describe('bindings', () => {
            it('Should bind filters.search with search prop of DocumentSearchInput', async () => {
                const storeSearchMock = (0, storeMock_1.createSearchStoreMocked)({
                    searchActive: true,
                    filters: new DocumentsFilters_1.default({
                        findInChildFolders: true,
                        search: 'test',
                        period: new Period_1.default(),
                        folderId: 0
                    })
                });
                storeSearchMock.dispatch = jest.fn();
                wrapper = createWrapper(defaultProps, storeSearchMock);
                const documentsSearchFiltersWrapper = findDocumentsSearchFilters(wrapper);
                expect(documentsSearchFiltersWrapper.vm.search).toBe('test');
            });
            it('Should bind activeFilters of DocumentsSearchFilters with good value when anyFilterActive ', async () => {
                const documentsSearchFiltersWrapper = findDocumentsSearchFilters(wrapper);
                expect(documentsSearchFiltersWrapper.vm.activeFiltersCount).toBe(0);
            });
            it('Should bind folders from store to folders property of DocumentsTabs', () => {
                const storeSearchMock = (0, storeMock_1.createSearchStoreMocked)({
                    areAnyFilters: true,
                    folders: foldersData
                });
                wrapper = createWrapper(defaultProps, storeSearchMock);
                const documentsTabsWrapper = wrapper.findComponent(FolderTabs_vue_1.default);
                expect(documentsTabsWrapper.props().folders).toStrictEqual(foldersData);
            });
            it('Should bind folders from store to folders property of WhoUploadModal', () => {
                const storeSearchMock = (0, storeMock_1.createSearchStoreMocked)({
                    folders: foldersData
                });
                wrapper = createWrapper(defaultProps, storeSearchMock);
                const popWrapper = wrapper.findComponent(WhoUploadModal_vue_1.default);
                expect(popWrapper.props().folders).toStrictEqual(foldersData);
                expect(popWrapper.props().modelValue).toBe(false);
            });
        });
    });
    describe('DocumentsTable bindings', () => {
        beforeEach(() => {
            const storeSearchMock = (0, storeMock_1.createSearchStoreMocked)({
                areAnyFilters: true,
                documents: documentsData,
                filters: new DocumentsFilters_1.default({
                    findInChildFolders: true,
                    search: 'test',
                    period: new Period_1.default(),
                    folderId: 0
                })
            });
            storeSearchMock.dispatch = jest.fn();
            wrapper = createWrapper(defaultProps, storeSearchMock);
            documentsTableWrapper = wrapper.findComponent(DocumentsTable_vue_1.default);
        });
        describe('props', () => {
            it('Should bind props correctly', () => {
                expect(documentsTableWrapper.vm.documents).toStrictEqual(documentsData);
                expect(documentsTableWrapper.props('search')).toBe('test');
            });
            it('Should bind areAllDocumentsLoaded from store to areAllDocumentsLoaded prop of DocumentsTable', async () => {
                const storeSearchMock = (0, storeMock_1.createSearchStoreMocked)({
                    areAllDocumentsLoaded: true,
                    areAnyFilters: true
                });
                wrapper = createWrapper(defaultProps, storeSearchMock);
                documentsTableWrapper = wrapper.findComponent(DocumentsTable_vue_1.default);
                expect(documentsTableWrapper.vm.areAllDocumentsLoaded).toStrictEqual(true);
            });
        });
        describe('rendering', () => {
            it('Should be hidden when no filters are active', () => {
                const storeWithoutSearchMock = (0, storeMock_1.createSearchStoreMocked)({
                    areAnyFilters: false
                });
                wrapper = createWrapper(defaultProps, storeWithoutSearchMock);
                expect(wrapper.findComponent(DocumentsTable_vue_1.default).exists()).toBeFalsy();
            });
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
                ];
                it.each(displayArboCardsCases)('switch between ArboCardList or DocumentsTable', ({ areAnyFilters, isDocumentsTableDisplayed }) => {
                    // Given
                    wrapper = createWrapper(defaultProps, (0, storeMock_1.createSearchStoreMocked)({ areAnyFilters }));
                    // Then
                    expect(wrapper.findComponent(DocumentsTable_vue_1.default).exists()).toBe(isDocumentsTableDisplayed);
                    expect(wrapper.findComponent(ArboCardList_vue_1.default).exists()).toBe(!isDocumentsTableDisplayed);
                });
            });
        });
        describe('events', () => {
            it('Should call dispatch downloadDocument action with good documentId when on-download-document event is emitted from DocumensTable', async () => {
                const storeMock = (0, storeMock_1.createSearchStoreMocked)({
                    areAnyFilters: true
                });
                storeMock.dispatch = jest.fn();
                wrapper = createWrapper(defaultProps, storeMock);
                // When DocumentsTable emit a on-download-document
                documentsTableWrapper = wrapper.findComponent(DocumentsTable_vue_1.default);
                await documentsTableWrapper.vm.$emit('on-download-document', '55');
                // Then dispatch must be called to call downloadDocument action with '55'
                expect(storeMock.dispatch).toHaveBeenCalledWith('GED/Search/downloadDocument', '55');
            });
            describe('on-scroll-to-bottom', () => {
                it('Should dispatch setPaginator with pageNumber incremented and fetchAndPushDocuments', async () => {
                    // Given the pageNumber is 1 and all the documents are not loaded yet
                    const storeSearchMock = (0, storeMock_1.createSearchStoreMocked)({
                        areAnyFilters: true,
                        documents: documentsData,
                        paginator: new DocumentsPaginator_1.default({
                            totalItems: 75246,
                            pageNumber: 1
                        }),
                        filters: new DocumentsFilters_1.default({
                            findInChildFolders: true,
                            search: 'test',
                            period: new Period_1.default(),
                            folderId: 0
                        })
                    });
                    storeSearchMock.dispatch = jest.fn();
                    wrapper = createWrapper(defaultProps, storeSearchMock);
                    documentsTableWrapper = wrapper.findComponent(DocumentsTable_vue_1.default);
                    // When DocumentsTable emit a on-scroll-to-bottom
                    await documentsTableWrapper.vm.$emit('on-scroll-to-bottom');
                    // Then dispatch setPaginator
                    expect(storeSearchMock.dispatch).toHaveBeenCalledWith('GED/Search/setPaginator', new DocumentsPaginator_1.default({
                        pageNumber: 2,
                        itemsPerPage: 100,
                        totalItems: 75246
                    }));
                    // And dispatch fetchAndPushDocuments
                    expect(storeSearchMock.dispatch).toHaveBeenCalledWith('GED/Search/fetchAndPushDocuments');
                });
                it('Should early exist if all the documents are loaded', async () => {
                    // Given the pageNumber is 1 and all the documents are not loaded yet
                    const storeSearchMock = (0, storeMock_1.createSearchStoreMocked)({
                        areAnyFilters: true,
                        documents: documentsData,
                        paginator: new DocumentsPaginator_1.default({
                            totalItems: 1,
                            pageNumber: 1
                        }),
                        filters: new DocumentsFilters_1.default({
                            findInChildFolders: true,
                            search: 'test',
                            period: new Period_1.default(),
                            folderId: 0
                        })
                    });
                    storeSearchMock.dispatch = jest.fn();
                    wrapper = createWrapper(defaultProps, storeSearchMock);
                    documentsTableWrapper = wrapper.findComponent(DocumentsTable_vue_1.default);
                    // When DocumentsTable emit a on-scroll-to-bottom
                    await documentsTableWrapper.vm.$emit('on-scroll-to-bottom');
                    // Then dispatch setPaginator
                    expect(storeMock.dispatch).not.toHaveBeenNthCalledWith(1, 'GED/Search/setPaginator', new DocumentsPaginator_1.default({
                        pageNumber: 2,
                        itemsPerPage: 100,
                        totalItems: 0
                    }));
                    // And dispatch fetchAndPushDocuments
                    expect(storeMock.dispatch).not.toHaveBeenNthCalledWith(2, 'GED/Search/fetchAndPushDocuments');
                });
            });
            describe('Documents upload box binding', () => {
                it.each([
                    { isUploading: false, disabled: false },
                    { isUploading: true, disabled: true }
                ])('Should not be disabled when isUploading is false', ({ isUploading, disabled }) => {
                    const searchFilesStore = (0, createStoreMock_1.createFileStoreMock)({ isUploading });
                    wrapper = createWrapper(defaultProps, searchFilesStore);
                    const DocumentUploadBoxWrapper = wrapper.findComponent(DocumentsUploadBox_vue_1.default);
                    expect(DocumentUploadBoxWrapper.props('disabled')).toBe(disabled);
                });
            });
        });
    });
    describe('MainViewLayout Bindings', () => {
        it('Should pass the correct disabled to chaild component', () => {
            const MainViewLayoutWrapper = wrapper.findComponent(MainViewLayout_vue_1.default);
            expect(wrapper.vm.isUploading).toBe(MainViewLayoutWrapper.props('disabled'));
        });
        it('Should pass the correct hasAccessDs to chaild component', () => {
            const MainViewLayoutWrapper = wrapper.findComponent(MainViewLayout_vue_1.default);
            expect(wrapper.vm.hasAccessDs).toBe(MainViewLayoutWrapper.props('hasAccessDs'));
        });
        it('Should pass the correct isMainViewBtn to child component', () => {
            const MainViewLayoutWrapper = wrapper.findComponent(MainViewLayout_vue_1.default);
            expect(MainViewLayoutWrapper.props('isMainViewBtn')).toBe(true);
        });
        it('should display loading mask when folders are loading', () => {
            const log = console.log;
            console.log = jest.fn();
            wrapper = createWrapper(defaultProps, (0, storeMock_1.createSearchStoreMocked)({
                folders: Folders_1.default.loading()
            }), {
                Loading: (node, binding) => {
                    console.log(`v-loading value : ${binding.value}`); // execute the emission of the on-scroll-to-bottom event
                }
            });
            expect(console.log).toHaveBeenCalledWith('v-loading value : true');
            console.log = log;
        });
    });
    describe('TrashCard bindings', () => {
        describe('rendering', () => {
            const trashCardDisplayCases = [
                {
                    folders: Folders_1.default.loaded([]),
                    visible: false
                },
                {
                    folders: (0, FoldersDataMock_1.default)().FoldersData,
                    visible: true
                }
            ];
            it.each(trashCardDisplayCases)('it should render TrashCard if there is folder', async ({ folders, visible }) => {
                wrapper = createWrapper(defaultProps, (0, storeMock_1.createSearchStoreMocked)({
                    searchActive: false,
                    activeFiltersCount: 0,
                    folders
                }));
                const trashCrad = wrapper.find('.trash-card');
                await wrapper.vm.$nextTick();
                expect(trashCrad.element.style.display !== 'none').toBe(visible);
            });
        });
    });
    describe('MailToGedCard', () => {
        describe('rendering', () => {
            const mailToGedCardDisplayCases = [
                {
                    folders: Folders_1.default.errored(),
                    visible: false
                },
                {
                    folders: Folders_1.default.loading(),
                    visible: false
                },
                {
                    folders: Folders_1.default.loaded([]),
                    visible: false
                },
                {
                    folders: (0, FoldersDataMock_1.default)().FoldersData,
                    visible: true
                }
            ];
            it.each(mailToGedCardDisplayCases)('should display MailToGedCard only if folders are loaded', async ({ folders, visible }) => {
                wrapper = createWrapper(defaultProps, (0, storeMock_1.createSearchStoreMocked)({
                    folders
                }));
                const mailToGedModalWrapper = (0, finders_1.findMailToGedCard)(wrapper);
                expect(mailToGedModalWrapper.exists()).toBe(visible);
            });
        });
        it('Should bind mailToGedInfos correctly', () => {
            const mailToGedModalWrapper = wrapper.findComponent(MailToGedModal_vue_1.default);
            expect(mailToGedModalWrapper.props('mailToGedInfos')).toEqual(MailToGedData);
        });
    });
    describe('binding with DocumentDetailsDrawer', () => {
        const documentFile = new Document_1.default({
            name: 'columbo.pdf'
        });
        const openDrawer = async () => await documentsTableWrapper.vm.$emit('document-clicked', documentFile);
        it('props binding', async () => {
            // When ArboDocumentsTable emits document-clicked with a new Document as payload
            await openDrawer();
            // Then the payload must be bound with the DocumentDetailsDrawer prop document
            documentsDetailsDrawer = (0, finders_1.findDocumentDetailsDrawer)(wrapper);
            expect(documentsDetailsDrawer.props('document')).toStrictEqual(documentFile);
            expect(documentsDetailsDrawer.props('opened')).toStrictEqual(true);
        });
    });
});
//# sourceMappingURL=MainView.spec.js.map