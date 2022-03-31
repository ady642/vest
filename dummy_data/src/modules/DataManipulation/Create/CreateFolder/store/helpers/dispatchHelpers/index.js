"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dispatchCreateFolder_1 = require("@/modules/DataManipulation/Create/CreateFolder/store/helpers/dispatchHelpers/dispatchCreateFolder");
const dispatchHelpers = (store) => ({
    ...(0, dispatchCreateFolder_1.default)(store)
});
exports.default = dispatchHelpers;
//# sourceMappingURL=index.js.map