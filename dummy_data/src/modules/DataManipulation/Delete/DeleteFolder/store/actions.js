"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("@/modules/DataManipulation/Delete/DeleteFolder/services");
const mutations_1 = require("@/modules/Search/store/mutations");
const mutations_2 = require("@/modules/DataManipulation/Delete/DeleteFolder/store/mutations");
const store_1 = require("@/modules/Search/store");
const deleteFolderByModal = async ({ commit, rootState }, folderId) => {
    try {
        commit(mutations_2.SET_IS_FOLDER_DELETING, true);
        await services_1.default.deleteFolder(rootState.app.account.AccountId, folderId);
        commit((0, store_1.searchModule)(mutations_1.REMOVE_FOLDER), folderId, { root: true });
    }
    catch (error) {
        throw new Error(error);
    }
    finally {
        commit(mutations_2.SET_IS_FOLDER_DELETING, false);
    }
};
exports.default = {
    deleteFolderByModal
};
//# sourceMappingURL=actions.js.map