"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getters_1 = require("@/modules/DataManipulation/Create/CreateFolder/store/getters");
const constants_1 = require("@/Common/constants");
describe('hasPermissionToDeleteFolder', () => {
    const permissionCases = [
        {
            hasPermissionToManipulateFolder: jest.fn(() => false),
            expectedHasPermission: false
        },
        {
            hasPermissionToManipulateFolder: jest.fn(() => true),
            expectedHasPermission: true
        }
    ];
    it.each(permissionCases)('should return true if permissions are in the folders.permission', ({ hasPermissionToManipulateFolder, expectedHasPermission }) => {
        // Given hasPermission getter exists
        const state = {};
        const rootState = {};
        const rootGetters = {
            'GED/DataManipulation/hasPermissionToManipulateFolder': hasPermissionToManipulateFolder
        };
        // When I call the folders getter
        const hasPermissionToAdd = getters_1.default.hasPermissionToAddFolder(state, getters_1.default, rootState, rootGetters)(1);
        // Then hasPermission must return true
        expect(rootGetters['GED/DataManipulation/hasPermissionToManipulateFolder']).toHaveBeenCalledWith({
            folderId: 1,
            permissionName: constants_1.default.CAN_CREATE_FOLDER
        });
        expect(hasPermissionToAdd).toEqual(expectedHasPermission);
    });
});
//# sourceMappingURL=getters.spec.js.map