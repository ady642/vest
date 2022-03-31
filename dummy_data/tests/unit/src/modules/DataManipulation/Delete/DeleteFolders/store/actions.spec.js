"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_1 = require("@/modules/DataManipulation/Delete/DeleteFolder/store/actions");
const services_1 = require("@/modules/DataManipulation/Delete/DeleteFolder/services");
const store_1 = require("@/modules/Search/store");
const commit = jest.fn();
const rootState = {
    app: {
        account: {
            AccountId: '1001'
        }
    },
    GED: {
        Trash: {},
        Search: {},
        DataManipulation: {
            MailToGed: {},
            Upload: {},
            DeleteFolders: {},
            DeleteFile: {},
            CreateFolder: {}
        }
    }
};
describe('DeleteFolder actions module', () => {
    describe('deleteFolderByModal', () => {
        it('should call the DeleteFolderServices and commit REMOVE_FOLDER mutation', async () => {
            // Given the service return a resolved value
            jest.spyOn(services_1.default, 'deleteFolder').mockResolvedValue();
            // When I call the deleteFolderByModal action
            await actions_1.default.deleteFolderByModal({
                rootState,
                commit
            }, 4521);
            // Then deleteFolder service must be called
            expect(services_1.default.deleteFolder).toHaveBeenCalledWith('1001', 4521);
            // And commit must be called with good mutation
            expect(commit).toHaveBeenNthCalledWith(1, 'SET_IS_FOLDER_DELETING', true);
            expect(commit).toHaveBeenNthCalledWith(2, (0, store_1.searchModule)('REMOVE_FOLDER'), 4521, {
                root: true
            });
            expect(commit).toHaveBeenNthCalledWith(3, 'SET_IS_FOLDER_DELETING', false);
        });
    });
});
//# sourceMappingURL=actions.spec.js.map