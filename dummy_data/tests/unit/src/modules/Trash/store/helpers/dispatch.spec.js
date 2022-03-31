"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("@/modules/Trash/store");
const vuex_1 = require("vuex");
const dispatchHelpers_1 = require("@/modules/Trash/store/helpers/dispatchHelpers");
const Paginator_1 = require("@/Common/models/List/Paginator");
let storeMock = (0, vuex_1.createStore)({
    modules: {
        Trash: {
            namespaced: true,
            state: {
                trash: {
                    ...store_1.default
                }
            }
        }
    }
});
describe('dispatchHelpers', () => {
    beforeEach(() => {
        storeMock = (0, vuex_1.createStore)({
            modules: {
                Trash: {
                    namespaced: true,
                    state: {
                        trash: {
                            ...store_1.default
                        }
                    }
                }
            }
        });
        storeMock.dispatch = jest.fn();
    });
    test('fetchTrashDocuments', () => {
        const { fetchTrashDocuments } = (0, dispatchHelpers_1.default)(storeMock);
        fetchTrashDocuments();
        expect(storeMock.dispatch).toBeCalledWith('GED/Trash/fetchTrashDocuments');
    });
    test('fetchAndPushTrashDocuments', () => {
        const { fetchAndPushTrashDocuments } = (0, dispatchHelpers_1.default)(storeMock);
        fetchAndPushTrashDocuments();
        expect(storeMock.dispatch).toBeCalledWith('GED/Trash/fetchAndPushTrashDocuments');
    });
    test('fetchTrashDocumentsTotalCount', () => {
        const { fetchTrashDocumentsTotalCount } = (0, dispatchHelpers_1.default)(storeMock);
        fetchTrashDocumentsTotalCount();
        expect(storeMock.dispatch).toBeCalledWith('GED/Trash/fetchTrashDocumentsTotalCount');
    });
    test('setTrashPaginator', () => {
        const { setTrashPaginator } = (0, dispatchHelpers_1.default)(storeMock);
        setTrashPaginator(new Paginator_1.default({ pageNumber: 1, itemsPerPage: 10, totalItems: 100 }));
        expect(storeMock.dispatch).toBeCalledWith('GED/Trash/setTrashPaginator', {
            itemsPerPage: 10,
            pageNumber: 1,
            totalItems: 100
        });
    });
    test('restoreFileByModal', () => {
        const { restoreFileByModal } = (0, dispatchHelpers_1.default)(storeMock);
        restoreFileByModal('1122');
        expect(storeMock.dispatch).toHaveBeenCalledWith('GED/Trash/restoreFileByModal', '1122');
    });
});
//# sourceMappingURL=dispatch.spec.js.map