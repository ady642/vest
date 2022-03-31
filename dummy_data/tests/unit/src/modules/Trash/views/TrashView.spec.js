"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const test_utils_1 = require("@vue/test-utils");
const createTrashStoreMock_1 = require("dummy_data/tests/unit/__mocks__/storeMock/createTrashStoreMock");
const TrashDocumentAPIMock_1 = require("../mocks/TrashDocumentAPIMock");
const TrashView_vue_1 = require("@/modules/Trash/views/TrashView.vue");
const ArboViewLayout_vue_1 = require("@/modules/Search/components/Layouts/ArboViewLayout.vue");
const TrashViewHeader_vue_1 = require("@/modules/Trash/components/Header/TrashViewHeader.vue");
const TrashDocumentsTable_vue_1 = require("@/modules/Trash/components/TrashDocumentsTable.vue");
const constants_1 = require("@/Common/constants");
const TrashDocuments_1 = require("@/modules/Trash/models/Inputs/TrashDocuments");
const BasicLayout_vue_1 = require("@/modules/Search/components/Layouts/BasicLayout.vue");
const analyticsLog_1 = require("@/Common/helpers/analyticsLog");
const TrashDocumentsPaginator_1 = require("@/modules/Trash/models/Query/TrashDocumentsPaginator");
jest.mock('@/Common/helpers/analyticsLog', () => ({
    trackEventFactory: jest.fn(),
    pageViewFactory: jest.fn()
}));
const storeMock = (0, createTrashStoreMock_1.createTrashStoreMock)();
const paginatorMock = new TrashDocumentsPaginator_1.default({
    pageNumber: 1,
    itemsPerPage: constants_1.default.TRASH_VIEW_ITEMS_PER_PAGE,
    totalItems: 100
});
const documentsData = TrashDocuments_1.default.loaded(TrashDocumentAPIMock_1.TrashDocumentAPIMockList);
const createWrapper = (store = storeMock) => (0, wrapperFactory_1.default)(TrashView_vue_1.default, {
    global: {
        stubs: {
            ArboViewLayout: ArboViewLayout_vue_1.default,
            TrashViewHeader: TrashViewHeader_vue_1.default,
            TrashDocumentsTable: TrashDocumentsTable_vue_1.default,
            BasicLayout: BasicLayout_vue_1.default
        },
        plugins: [store]
    }
});
let wrapper = createWrapper();
describe('TrashView', () => {
    beforeEach(async () => {
        wrapper = createWrapper();
        storeMock.dispatch = jest.fn();
        expect(analyticsLog_1.pageViewFactory).toBeCalledWith('trashview-pgv');
        jest.clearAllMocks();
    });
    describe('onMounted', () => {
        it('init paginator', async () => {
            wrapper = createWrapper();
            expect(storeMock.dispatch).toHaveBeenCalledWith('GED/Trash/setTrashPaginator', new TrashDocumentsPaginator_1.default({
                pageNumber: 1,
                itemsPerPage: constants_1.default.TRASH_VIEW_ITEMS_PER_PAGE,
                totalItems: 0
            }));
            expect(storeMock.dispatch).toHaveBeenCalledWith('GED/Trash/fetchTrashDocuments');
        });
    });
    describe('binding with  TrashDocumentsTable', () => {
        describe('props', () => {
            it('Should bind props correctly with TrashDocumentsTable', () => {
                const TrashDocumentsTableWrapper = wrapper.findComponent(TrashDocumentsTable_vue_1.default);
                expect(TrashDocumentsTableWrapper.props('documents')).toStrictEqual(documentsData);
                expect(TrashDocumentsTableWrapper.props('documentsPerPage')).toEqual(paginatorMock.itemsPerPage);
                expect(TrashDocumentsTableWrapper.props('pageNumber')).toEqual(paginatorMock.pageNumber);
            });
        });
        describe('events', () => {
            it('Should set page on trash-documents-table page-opened', async () => {
                const ArboViweLayoutWrapper = wrapper.findComponent(ArboViewLayout_vue_1.default);
                const TrashDocumentsTableWrapper = ArboViweLayoutWrapper.findComponent(TrashDocumentsTable_vue_1.default);
                await TrashDocumentsTableWrapper.vm.$emit('page-opened', 1);
                expect(storeMock.dispatch).toHaveBeenCalledWith('GED/Trash/setTrashPaginator', new TrashDocumentsPaginator_1.default({
                    pageNumber: 1,
                    itemsPerPage: constants_1.default.TRASH_VIEW_ITEMS_PER_PAGE,
                    totalItems: 100
                }));
            });
            it('Should fetch documents on trash-documents-table page-opened', async () => {
                const ArboViweLayoutWrapper = wrapper.findComponent(ArboViewLayout_vue_1.default);
                const TrashDocumentsTableWrapper = ArboViweLayoutWrapper.findComponent(TrashDocumentsTable_vue_1.default);
                await TrashDocumentsTableWrapper.vm.$emit('page-opened', 1);
                expect(storeMock.dispatch).toHaveBeenCalledWith('GED/Trash/fetchTrashDocuments');
            });
            describe('restore-document', () => {
                it('Should dispatch restoreFileByModal, setTrashPaginator and removeFromPendingList when restore-document is emitted from ArboViewLayout', async () => {
                    const trashStore = (0, createTrashStoreMock_1.createTrashStoreMock)({
                        paginator: new TrashDocumentsPaginator_1.default({
                            pageNumber: 2
                        }),
                        documents: TrashDocuments_1.default.loaded([])
                    });
                    trashStore.dispatch = jest.fn();
                    wrapper = createWrapper(trashStore);
                    const TrashDocumentsTableWrapper = wrapper.findComponent(TrashDocumentsTable_vue_1.default);
                    await TrashDocumentsTableWrapper.vm.$emit('restore-document', '13232424');
                    await (0, test_utils_1.flushPromises)();
                    expect(trashStore.dispatch).toHaveBeenNthCalledWith(1, 'GED/Trash/setTrashPaginator', { itemsPerPage: 10, pageNumber: 1, totalItems: 0 });
                    expect(trashStore.dispatch).toHaveBeenNthCalledWith(2, 'GED/Trash/fetchTrashDocuments');
                    expect(trashStore.dispatch).toHaveBeenNthCalledWith(3, 'GED/Trash/restoreFileByModal', '13232424');
                    expect(trashStore.dispatch).toHaveBeenNthCalledWith(4, 'GED/Trash/setTrashPaginator', { itemsPerPage: 10, pageNumber: 1, totalItems: 0 });
                    expect(trashStore.dispatch).toHaveBeenNthCalledWith(5, 'GED/Trash/fetchTrashDocuments');
                });
                it('Should dispatch restoreFileByModal, setTrashPaginator and removeFromPendingList when restore-document is emitted from ArboViewLayout', async () => {
                    const trashStore = (0, createTrashStoreMock_1.createTrashStoreMock)({
                        paginator: new TrashDocumentsPaginator_1.default({
                            pageNumber: 1
                        }),
                        documents: TrashDocuments_1.default.loaded([])
                    });
                    trashStore.dispatch = jest.fn();
                    wrapper = createWrapper(trashStore);
                    const TrashDocumentsTableWrapper = wrapper.findComponent(TrashDocumentsTable_vue_1.default);
                    await TrashDocumentsTableWrapper.vm.$emit('restore-document', '13232424');
                    await (0, test_utils_1.flushPromises)();
                    expect(trashStore.dispatch).toHaveBeenNthCalledWith(1, 'GED/Trash/setTrashPaginator', { itemsPerPage: 10, pageNumber: 1, totalItems: 0 });
                    expect(trashStore.dispatch).toHaveBeenNthCalledWith(2, 'GED/Trash/fetchTrashDocuments');
                    expect(trashStore.dispatch).toHaveBeenNthCalledWith(3, 'GED/Trash/restoreFileByModal', '13232424');
                    expect(trashStore.dispatch).toHaveBeenNthCalledWith(4, 'GED/Trash/fetchTrashDocuments');
                });
            });
        });
    });
});
//# sourceMappingURL=TrashView.spec.js.map