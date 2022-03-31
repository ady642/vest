"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("@/modules/Search/services");
const mutations_1 = require("@/modules/Search/store/mutations");
const Folders_1 = require("@/modules/Search/models/Folders/Inputs/Folders");
const fetchFolders = async ({ commit, rootState }) => {
    commit(mutations_1.SET_FOLDERS, Folders_1.default.loading());
    try {
        const { data } = await services_1.default.fetchFolders(rootState.app.account.AccountId);
        commit(mutations_1.SET_FOLDERS, Folders_1.default.loaded(data));
    }
    catch (e) {
        commit(mutations_1.SET_FOLDERS, Folders_1.default.errored());
    }
};
exports.default = {
    fetchFolders
};
//# sourceMappingURL=foldersActions.js.map