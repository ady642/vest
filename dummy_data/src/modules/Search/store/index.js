"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchModule = void 0;
const actions_1 = require("@/modules/Search/store/actions");
const mutations_1 = require("@/modules/Search/store/mutations");
const state_1 = require("@/modules/Search/store/state");
const getters_1 = require("@/modules/Search/store/getters");
const searchModule = (name) => `GED/Search/${name}`;
exports.searchModule = searchModule;
exports.default = {
    namespaced: true,
    state: state_1.default,
    actions: actions_1.default,
    mutations: mutations_1.default,
    getters: getters_1.default
};
//# sourceMappingURL=index.js.map