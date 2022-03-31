"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("@/modules/DataManipulation/Create/CreateFolder/store");
const vue_1 = require("vue");
const gettersHelpers = (store) => ({
    hasPermissionToAddFolder: (folderId) => store.getters[(0, store_1.createFolderModule)('hasPermissionToAddFolder')](folderId),
    isCreatingFolder: (0, vue_1.computed)(() => store.getters[(0, store_1.createFolderModule)('isCreatingFolder')])
});
exports.default = gettersHelpers;
//# sourceMappingURL=gettersHelper.js.map