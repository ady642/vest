"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dispatchHelpers_1 = require("@/modules/Trash/store/helpers/dispatchHelpers");
const gettersHelper_1 = require("@/modules/Trash/store/helpers/gettersHelper");
const useTrashModule = (store) => ({
    ...(0, dispatchHelpers_1.default)(store),
    ...(0, gettersHelper_1.default)(store)
});
exports.default = useTrashModule;
//# sourceMappingURL=index.js.map