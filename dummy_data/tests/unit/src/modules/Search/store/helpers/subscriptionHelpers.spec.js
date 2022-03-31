"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subscriptionHelpers_1 = require("@/modules/Search/store/helpers/subscriptionHelpers");
const store_1 = require("@/modules/Search/store");
const vuex_1 = require("vuex");
const store_2 = require("@/modules/DataManipulation/store");
let mockCancel = jest.fn();
const createSearchStoreMocked = ({ mockCancel = jest.fn() } = {}) => (0, vuex_1.createStore)({
    modules: {
        GED: {
            namespaced: true,
            modules: {
                Search: {
                    ...store_1.default,
                    state: {
                        ...store_1.default.state,
                        documents: {
                            ...store_1.default.state.documents,
                            cancelToken: {
                                cancel: mockCancel
                            }
                        }
                    }
                },
                DataManipulation: store_2.default
            }
        }
    }
});
let store = createSearchStoreMocked({ mockCancel });
describe('subscriptionHelpers', () => {
    beforeEach(() => {
        mockCancel = jest.fn();
        store = createSearchStoreMocked({ mockCancel });
    });
    it('should cancel the request when fetchDocuments action is dispatched', async () => {
        (0, subscriptionHelpers_1.default)().addFetchDocumentsSubscriber(store);
        await store.dispatch((0, store_1.searchModule)('fetchDocuments'));
        expect(mockCancel).toHaveBeenCalled();
    });
    it('should cancel the request when fetchAndPushDocuments action is dispatched', async () => {
        (0, subscriptionHelpers_1.default)().addFetchDocumentsSubscriber(store);
        await store.dispatch((0, store_1.searchModule)('fetchAndPushDocuments'));
        expect(mockCancel).toHaveBeenCalled();
    });
    it('should not cancel the request when an other action is dispatched', async () => {
        (0, subscriptionHelpers_1.default)().addFetchDocumentsSubscriber(store);
        await store.dispatch((0, store_1.searchModule)('fetchFolders'));
        expect(mockCancel).not.toHaveBeenCalled();
    });
});
//# sourceMappingURL=subscriptionHelpers.spec.js.map