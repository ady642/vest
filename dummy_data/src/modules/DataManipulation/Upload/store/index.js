"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadModule = void 0;
const actions_1 = require("@/modules/DataManipulation/Upload/store/actions");
const mutations_1 = require("@/modules/DataManipulation/Upload/store/mutations");
const state_1 = require("@/modules/DataManipulation/Upload/store/state");
const getters_1 = require("@/modules/DataManipulation/Upload/store/getters");
const uploadModule = (name) => `GED/DataManipulation/Upload/${name}`;
exports.uploadModule = uploadModule;
exports.default = {
    namespaced: true,
    state: state_1.default,
    actions: actions_1.default,
    mutations: mutations_1.default,
    getters: getters_1.default
};
//# sourceMappingURL=index.js.map