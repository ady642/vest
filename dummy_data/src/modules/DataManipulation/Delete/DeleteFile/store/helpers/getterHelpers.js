"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("@/modules/DataManipulation/Delete/DeleteFile/store");
const gettersHelpers = (store) => ({
    isFileDeletable: (documentIdToDelete) => store.getters['GED/DataManipulation/DeleteFile/isFileDeletable'](documentIdToDelete),
    isFileDeleting: () => store.getters[(0, store_1.deleteFileModule)('isFileDeleting')],
    areDocumentsDeletable: (documentIds) => store.getters[(0, store_1.deleteFileModule)('areDocumentsDeletable')](documentIds)
});
exports.default = gettersHelpers;
//# sourceMappingURL=getterHelpers.js.map