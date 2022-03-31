"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTrashStoreMock = void 0;
const vuex_1 = require("vuex");
const store_1 = require("@/modules/Search/store");
const store_2 = require("@/modules/Trash/store");
const store_3 = require("@/modules/DataManipulation/store");
const TrashDocumentsPaginator_1 = require("@/modules/Trash/models/Query/TrashDocumentsPaginator");
const constants_1 = require("@/Common/constants");
const TrashDocuments_1 = require("@/modules/Trash/models/Inputs/TrashDocuments");
const TrashDocumentAPIMock_1 = require("dummy_data/tests/unit/src/modules/Trash/mocks/TrashDocumentAPIMock");
const paginatorMock = new TrashDocumentsPaginator_1.default({
    pageNumber: 1,
    itemsPerPage: constants_1.default.TRASH_VIEW_ITEMS_PER_PAGE,
    totalItems: 100
});
const documentsData = TrashDocuments_1.default.loaded(TrashDocumentAPIMock_1.TrashDocumentAPIMockList);
const createTrashStoreMock = ({ documents = documentsData, paginator = paginatorMock, documentsTotalCount = 1905, isInPendingList = false } = {}) => (0, vuex_1.createStore)({
    modules: {
        GED: {
            namespaced: true,
            modules: {
                Trash: {
                    ...store_2.default,
                    actions: {
                        fetchTrashDocuments: jest.fn(),
                        restoreFileByModal: jest.fn(),
                        closeRestoreNotification: jest.fn(),
                        setRestoreNotification: jest.fn(),
                        pushInRestorePendingList: jest.fn(),
                        removeFromPendingList: jest.fn(),
                        setPendingListDocumentStatus: jest.fn(),
                        setTrashPaginator: jest.fn()
                    },
                    getters: {
                        ...store_2.default.getters,
                        isInPendingList: () => () => isInPendingList,
                        documentsTotalCount: () => documentsTotalCount,
                        paginator: () => paginator,
                        documents: () => documents
                    }
                },
                DataManipulation: store_3.default,
                Search: store_1.default
            }
        }
    }
});
exports.createTrashStoreMock = createTrashStoreMock;
//# sourceMappingURL=createTrashStoreMock.js.map