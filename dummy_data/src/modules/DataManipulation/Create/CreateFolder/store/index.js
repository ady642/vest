"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFolderModule = void 0;
const state_1 = require("@/modules/DataManipulation/Create/CreateFolder/store/state");
const actions_1 = require("@/modules/DataManipulation/Create/CreateFolder/store/actions");
const getters_1 = require("@/modules/DataManipulation/Create/CreateFolder/store/getters");
const mutations_1 = require("@/modules/DataManipulation/Create/CreateFolder/store/mutations");
const createFolderModule = (name) => `GED/DataManipulation/CreateFolder/${name}`;
exports.createFolderModule = createFolderModule;
exports.default = {
    namespaced: true,
    state: state_1.default,
    actions: actions_1.default,
    getters: getters_1.default,
    mutations: mutations_1.default
};
//# sourceMappingURL=index.js.map