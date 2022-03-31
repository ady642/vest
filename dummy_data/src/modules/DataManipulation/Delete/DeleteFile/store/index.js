"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFileModule = void 0;
const getters_1 = require("@/modules/DataManipulation/Delete/DeleteFile/store/getters");
const actions_1 = require("@/modules/DataManipulation/Delete/DeleteFile/store/actions");
const mutations_1 = require("@/modules/DataManipulation/Delete/DeleteFile/store/mutations");
const state_1 = require("@/modules/DataManipulation/Delete/DeleteFile/store/state");
const deleteFileModule = (name) => {
    return `GED/DataManipulation/DeleteFile/${name}`;
};
exports.deleteFileModule = deleteFileModule;
exports.default = {
    namespaced: true,
    getters: getters_1.default,
    state: state_1.default,
    mutations: mutations_1.default,
    actions: actions_1.default
};
//# sourceMappingURL=index.js.map