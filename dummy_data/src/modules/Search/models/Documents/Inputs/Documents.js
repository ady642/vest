"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Document_1 = require("@/modules/Search/models/Documents/Inputs/Document");
class Documents {
    constructor({ state, collectionFromAPI, cancelToken } = {}) {
        this.state = state;
        this.collection =
            collectionFromAPI.length > 0
                ? collectionFromAPI.map((document) => new Document_1.default(document))
                : [];
        this.cancelToken = cancelToken;
    }
    static loaded(collectionFromAPI) {
        return new Documents({ state: 'loaded', collectionFromAPI });
    }
    static loading(cancelToken) {
        return new Documents({
            state: 'loading',
            collectionFromAPI: [],
            cancelToken
        });
    }
    static errored() {
        return new Documents({
            state: 'errored',
            collectionFromAPI: []
        });
    }
    get isLoading() {
        return this.state === 'loading';
    }
    updateDocumentComment(id, comment) {
        this.collection = this.collection.map((document) => {
            if (document.id === id) {
                document.comments = comment;
            }
            return document;
        });
    }
}
exports.default = Documents;
//# sourceMappingURL=Documents.js.map