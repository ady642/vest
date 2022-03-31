"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const documentsActions_1 = require("@/modules/Search/store/actions/documentsActions");
const foldersActions_1 = require("@/modules/Search/store/actions/foldersActions");
exports.default = {
    ...documentsActions_1.default,
    ...foldersActions_1.default
};
//# sourceMappingURL=index.js.map