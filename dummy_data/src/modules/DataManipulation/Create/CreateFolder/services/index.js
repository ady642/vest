"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreateFolderInput_1 = require("@/modules/DataManipulation/Create/CreateFolder/models/Inputs/CreateFolderInput");
const mypulse_shared_dependencies_1 = require("@kpmg/mypulse-shared-dependencies");
const CreateFolder = async (createFolderQuery) => {
    const data = new CreateFolderInput_1.default(createFolderQuery.targetFolder, createFolderQuery.folderName).transformForAPI();
    return await mypulse_shared_dependencies_1.api.ds.post(`/${createFolderQuery.accountNumber}/folders`, data);
};
exports.default = {
    CreateFolder
};
//# sourceMappingURL=index.js.map