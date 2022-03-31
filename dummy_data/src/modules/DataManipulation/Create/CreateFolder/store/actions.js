"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mutations_1 = require("@/modules/DataManipulation/Create/CreateFolder/store/mutations");
const Folder_1 = require("@/modules/Search/models/Folders/Inputs/Folder");
const services_1 = require("@/modules/DataManipulation/Create/CreateFolder/services");
const mutations_2 = require("@/modules/Search/store/mutations");
const store_1 = require("@/modules/Search/store");
const FolderExistsError_1 = require("@/Common/errors/FolderExistsError");
const CreateFolder = async ({ rootState, commit, rootGetters }, createFolderQuery) => {
    try {
        const parentFolder = rootGetters[(0, store_1.searchModule)('folders')].getFolderById(createFolderQuery.targetFolder);
        if (parentFolder?.hasChildrenByName(createFolderQuery.folderName.trim())) {
            throw new FolderExistsError_1.default();
        }
        commit(mutations_1.SET_IS_FOLDER_CREATING, true);
        createFolderQuery.accountNumber = rootState.app.account.AccountId;
        const { data: category } = await services_1.default.CreateFolder(createFolderQuery);
        commit((0, store_1.searchModule)(mutations_2.PUSH_FOLDER), new Folder_1.default(category), { root: true });
    }
    finally {
        commit(mutations_1.SET_IS_FOLDER_CREATING, false);
    }
};
exports.default = {
    CreateFolder
};
//# sourceMappingURL=actions.js.map