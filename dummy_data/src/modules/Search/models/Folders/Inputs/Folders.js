"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Folder_1 = require("@/modules/Search/models/Folders/Inputs/Folder");
const useArrayHelpers_1 = require("@/Common/hooks/useArrayHelpers");
class Folders {
    constructor({ state, collectionFromAPI } = {}) {
        this.state = state;
        this.collection =
            collectionFromAPI.length > 0
                ? collectionFromAPI.map((folder) => new Folder_1.default(folder))
                : [];
    }
    getFolderById(id) {
        const { findDeep } = (0, useArrayHelpers_1.default)();
        return findDeep(this.collection, id);
    }
    getFolderDeepLevel(id) {
        const { countDeep } = (0, useArrayHelpers_1.default)();
        return countDeep(this.collection, id);
    }
    getFolderByName(name) {
        const { findDeepByName } = (0, useArrayHelpers_1.default)();
        return findDeepByName(this.collection, name);
    }
    removeFolder(id) {
        const { removeFolder } = (0, useArrayHelpers_1.default)();
        this.collection = removeFolder(this.collection, id);
    }
    getDefaultUploadFolderById(id) {
        const { findDefaultUploadFolder } = (0, useArrayHelpers_1.default)();
        const folder = this.getFolderById(id);
        const children = folder?.children;
        const defaultFolder = findDefaultUploadFolder(children);
        return defaultFolder || children?.[0];
    }
    getShortcutsFolder(id) {
        const { findShortcutFolders } = (0, useArrayHelpers_1.default)();
        const folder = this.getFolderById(id);
        if (folder)
            return findShortcutFolders(folder, []);
    }
    static loaded(collectionFromAPI) {
        return new Folders({ state: 'loaded', collectionFromAPI });
    }
    static loading() {
        return new Folders({ state: 'loading', collectionFromAPI: [] });
    }
    static errored() {
        return new Folders({ state: 'errored', collectionFromAPI: [] });
    }
    get isLoading() {
        return this.state === 'loading';
    }
}
exports.default = Folders;
//# sourceMappingURL=Folders.js.map