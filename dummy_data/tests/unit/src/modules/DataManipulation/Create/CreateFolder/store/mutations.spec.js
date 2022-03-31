"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mutations_1 = require("@/modules/DataManipulation/Create/CreateFolder/store/mutations");
describe('create folder module mutations', () => {
    it('SET_IS_FOLDER_CREATING', () => {
        const state = {
            isCreatingFolder: false
        };
        // When the SET_DOCUMENTS_TOTAL_COUNT mutation is called
        mutations_1.default.SET_IS_FOLDER_CREATING(state, true);
        // Then documentsTotalCount state must be equal to 4545
        expect(state.isCreatingFolder).toEqual(true);
    });
});
//# sourceMappingURL=mutations.spec.js.map