"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gettersHelpers = (store) => ({
    hasPermissionToDeleteFolder: (folderId) => store.getters['GED/DataManipulation/DeleteFolders/hasPermissionToDeleteFolder'](folderId),
    isFolderDeletable: (folderId) => store.getters['GED/DataManipulation/DeleteFolders/isFolderDeletable'](folderId),
    isFolderDeleting: () => store.getters['GED/DataManipulation/DeleteFolders/isFolderDeleting']
});
exports.default = gettersHelpers;
//# sourceMappingURL=getterHelpers.js.map