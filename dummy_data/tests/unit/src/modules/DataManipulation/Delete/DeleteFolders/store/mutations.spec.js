"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mutations_1 = require("@/modules/DataManipulation/Delete/DeleteFolder/store/mutations");
describe('DeleteFolders mutations', () => {
    it('SET_IS_FOLDER_DELETING', () => {
        const state = {
            isFolderDeleting: false
        };
        // When the SET_IS_FOLDER_DELETING mutation is called
        mutations_1.default.SET_IS_FOLDER_DELETING(state, true);
        // Then isFolderDeleting state must be equal to payload
        expect(state.isFolderDeleting).toEqual(true);
    });
});
//# sourceMappingURL=mutations.spec.js.map