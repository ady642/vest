"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trashModule = void 0;
const state_1 = require("@/modules/Trash/store/state");
const actions_1 = require("@/modules/Trash/store/actions");
const getters_1 = require("@/modules/Trash/store/getters");
const mutations_1 = require("@/modules/Trash/store/mutations");
const trashModule = (name) => `GED/Trash/${name}`;
exports.trashModule = trashModule;
exports.default = {
    namespaced: true,
    state: state_1.default,
    actions: actions_1.default,
    getters: getters_1.default,
    mutations: mutations_1.default
};
//# sourceMappingURL=index.js.map