"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("@/modules/Search/store");
const addFetchDocumentsSubscriber = (store) => {
    return store.subscribeAction((action) => {
        if (action.type === (0, store_1.searchModule)('fetchDocuments') ||
            action.type === (0, store_1.searchModule)('fetchAndPushDocuments')) {
            store.state.GED.Search.documents.cancelToken?.cancel();
        }
    });
};
const subscriptionHelpers = () => ({
    addFetchDocumentsSubscriber
});
exports.default = subscriptionHelpers;
//# sourceMappingURL=subscriptionHelpers.js.map