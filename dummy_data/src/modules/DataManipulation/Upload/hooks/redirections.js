"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("@/Common/constants");
const goToDefaultFolder = (folderId, folders, callback) => {
    const defaultFolder = folders.value.getDefaultUploadFolderById(folderId);
    const defaultFolderId = defaultFolder?.name === constants_1.default.FOLDER_DEPOT
        ? defaultFolder?.id
        : folderId;
    callback(defaultFolderId ?? 0);
};
exports.default = () => ({
    goToDefaultFolder
});
//# sourceMappingURL=redirections.js.map