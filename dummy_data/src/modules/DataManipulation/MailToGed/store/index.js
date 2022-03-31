"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailToGedModule = void 0;
const state_1 = require("@/modules/DataManipulation/MailToGed/store/state");
const actions_1 = require("@/modules/DataManipulation/MailToGed/store/actions");
const getters_1 = require("@/modules/DataManipulation/MailToGed/store/getters");
const mutations_1 = require("@/modules/DataManipulation/MailToGed/store/mutations");
const MailToGedModule = (name) => `GED/DataManipulation/MailToGed/${name}`;
exports.MailToGedModule = MailToGedModule;
exports.default = {
    namespaced: true,
    state: state_1.default,
    actions: actions_1.default,
    getters: getters_1.default,
    mutations: mutations_1.default
};
//# sourceMappingURL=index.js.map