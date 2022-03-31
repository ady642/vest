"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("@/modules/DataManipulation/MailToGed/store");
const dispatchHelpers = (store) => ({
    GetMailToGedInformations: async () => {
        await store.dispatch((0, store_1.MailToGedModule)('GetMailToGedInformations'));
    }
});
exports.default = dispatchHelpers;
//# sourceMappingURL=dispatchHelper.js.map