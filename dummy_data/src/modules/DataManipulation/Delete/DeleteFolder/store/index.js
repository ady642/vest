"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFoldersModule = void 0;
const getters_1 = require("@/modules/DataManipulation/Delete/DeleteFolder/store/getters");
const actions_1 = require("@/modules/DataManipulation/Delete/DeleteFolder/store/actions");
const mutations_1 = require("@/modules/DataManipulation/Delete/DeleteFolder/store/mutations");
const deleteFoldersModule = (name) => {
    return `GED/DataManipulation/DeleteFolders/${name}`;
};
exports.deleteFoldersModule = deleteFoldersModule;
exports.default = {
    namespaced: true,
    getters: getters_1.default,
    actions: actions_1.default,
    mutations: mutations_1.default
};
//# sourceMappingURL=index.js.map