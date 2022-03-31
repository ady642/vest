"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("@/modules/DataManipulation/Delete/DeleteFile/services");
const mutations_1 = require("@/modules/DataManipulation/Delete/DeleteFile/store/mutations");
const deleteFiles = async ({ rootState, commit }, documentIds) => {
    try {
        commit(mutations_1.SET_IS_FILE_DELETING, true);
        await services_1.default.DeleteFiles(rootState.app.account.AccountId, documentIds);
    }
    finally {
        commit(mutations_1.SET_IS_FILE_DELETING, false);
    }
};
exports.default = {
    deleteFiles
};
//# sourceMappingURL=actions.js.map