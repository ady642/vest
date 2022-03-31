"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("@/modules/DataManipulation/MailToGed/store");
const vue_1 = require("vue");
const gettersHelpers = (store) => ({
    mailToGedInformations: (0, vue_1.computed)(() => store.getters[(0, store_1.MailToGedModule)('mailToGedInformations')])
});
exports.default = gettersHelpers;
//# sourceMappingURL=gettersHelper.js.map