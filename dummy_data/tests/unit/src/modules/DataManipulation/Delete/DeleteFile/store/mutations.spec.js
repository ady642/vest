"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mutations_1 = require("@/modules/DataManipulation/Delete/DeleteFile/store/mutations");
describe('DeleteFile mutations', () => {
    it('SET_IS_FILE_DELETING', () => {
        const state = {
            isFileDeleting: false
        };
        // When the SET_IS_FILE_DELETING mutation is called
        mutations_1.default.SET_IS_FILE_DELETING(state, true);
        // Then isFileDeleting state must be equal to payload
        expect(state.isFileDeleting).toEqual(true);
    });
});
//# sourceMappingURL=mutations.spec.js.map