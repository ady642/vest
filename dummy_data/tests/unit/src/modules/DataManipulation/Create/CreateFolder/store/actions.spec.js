"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("@/modules/DataManipulation/Create/CreateFolder/services");
const actions_1 = require("@/modules/DataManipulation/Create/CreateFolder/store/actions");
const FoldersDataMock_1 = require("dummy_data/tests/unit/src/modules/Search/mocks/FoldersDataMock");
const store_1 = require("@/modules/Search/store");
const mutations_1 = require("@/modules/Search/store/mutations");
const Folder_1 = require("@/modules/Search/models/Folders/Inputs/Folder");
const FolderExistsError_1 = require("@/Common/errors/FolderExistsError");
const commit = jest.fn();
describe('CreateFolder actions', () => {
    it('Should call CreateFolderServices.CreateFolder with the correct payload when folder dose not exist', async () => {
        // Given the service return no value
        const category = {
            id: 4545,
            name: 'New Folder',
            children: [],
            parent: {
                id: 1122
            },
            properties: {},
            permissions: []
        };
        jest.spyOn(services_1.default, 'CreateFolder').mockResolvedValue({
            data: category
        });
        // When I call the CreateFolder action
        const query = {
            targetFolder: 1122,
            folderName: 'New Folder',
            accountNumber: '75545'
        };
        await actions_1.default.CreateFolder({
            rootGetters: { 'GED/Search/folders': (0, FoldersDataMock_1.default)().FoldersData },
            commit,
            rootState: {
                app: {
                    account: {
                        AccountId: '75545'
                    }
                }
            }
        }, query);
        // Then the service must be called it the query and the account number as 75545
        // And the folder must be pushed in folders state of search module
        expect(services_1.default.CreateFolder).toBeCalledWith(query);
        expect(commit).toHaveBeenCalledTimes(3);
        expect(commit).toHaveBeenNthCalledWith(1, 'SET_IS_FOLDER_CREATING', true);
        expect(commit).toHaveBeenNthCalledWith(2, (0, store_1.searchModule)(mutations_1.PUSH_FOLDER), new Folder_1.default(category), { root: true });
        expect(commit).toHaveBeenNthCalledWith(3, 'SET_IS_FOLDER_CREATING', false);
    });
    it('Should not call CreateFolderServices.CreateFolder and throw error if a folder with same name exist in parent folder', async () => {
        // When I call the CreateFolder action with a folderName that already exist
        const query = {
            targetFolder: 1122,
            folderName: '   The child',
            accountNumber: '75545'
        };
        // Then the action must throw a FolderExistsError
        await expect(actions_1.default.CreateFolder({
            rootGetters: { 'GED/Search/folders': (0, FoldersDataMock_1.default)().FoldersData },
            commit,
            rootState: {
                app: {
                    account: {
                        AccountId: '75545'
                    }
                }
            }
        }, query)).rejects.toThrow(new FolderExistsError_1.default());
    });
});
//# sourceMappingURL=actions.spec.js.map