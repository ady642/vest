"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TrashDocument_1 = require("@/modules/Trash/models/Inputs/TrashDocument");
class TrashDocuments {
    constructor({ state, collectionFromAPI, cancelToken } = {}) {
        this.state = state;
        this.collection =
            collectionFromAPI.length > 0
                ? collectionFromAPI.map((document) => new TrashDocument_1.default(document))
                : [];
        this.cancelToken = cancelToken;
    }
    static loaded(collectionFromAPI) {
        return new TrashDocuments({ state: 'loaded', collectionFromAPI });
    }
    static loading(cancelToken) {
        return new TrashDocuments({
            state: 'loading',
            collectionFromAPI: [],
            cancelToken
        });
    }
    static errored() {
        return new TrashDocuments({ state: 'errored', collectionFromAPI: [] });
    }
    get isLoading() {
        return this.state === 'loading';
    }
}
exports.default = TrashDocuments;
//# sourceMappingURL=TrashDocuments.js.map