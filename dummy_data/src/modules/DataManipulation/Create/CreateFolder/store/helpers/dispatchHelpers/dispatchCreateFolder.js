"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("@/modules/DataManipulation/Create/CreateFolder/store");
const dispatchCreateFolder = (store) => ({
    createFolderByModal: async (createFolderQuery) => {
        await store.dispatch((0, store_1.createFolderModule)('CreateFolder'), createFolderQuery);
    },
    createFolderByArbo: async (createFolderQuery) => {
        await store.dispatch((0, store_1.createFolderModule)('CreateFolder'), createFolderQuery);
    }
});
exports.default = dispatchCreateFolder;
//# sourceMappingURL=dispatchCreateFolder.js.map