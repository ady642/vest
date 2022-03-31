"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("@/modules/DataManipulation/Delete/DeleteFolder/store");
const dispatchHelpers = (store) => ({
    deleteFolderByModal: async (folderId) => {
        try {
            await store.dispatch((0, store_1.deleteFoldersModule)('deleteFolderByModal'), folderId);
        }
        catch (e) {
            throw new Error(e);
        }
    }
});
exports.default = dispatchHelpers;
//# sourceMappingURL=dispatchHelpers.js.map