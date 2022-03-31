"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("@/modules/DataManipulation/Delete/DeleteFile/store");
const dispatchHelpers = (store) => ({
    deleteFile: async (documentId) => {
        await store.dispatch((0, store_1.deleteFileModule)('deleteFiles'), [documentId]);
    },
    deleteFiles: async (documentIds) => {
        await store.dispatch((0, store_1.deleteFileModule)('deleteFiles'), documentIds);
    }
});
exports.default = dispatchHelpers;
//# sourceMappingURL=dispatchHelpers.js.map