"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dispatchHelper_1 = require("@/modules/DataManipulation/MailToGed/store/helpers/dispatchHelper");
const gettersHelper_1 = require("@/modules/DataManipulation/MailToGed/store/helpers/gettersHelper");
const useMailToGedModule = (store) => ({
    ...(0, dispatchHelper_1.default)(store),
    ...(0, gettersHelper_1.default)(store)
});
exports.default = useMailToGedModule;
//# sourceMappingURL=index.js.map