"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CategoryAPIMock_1 = require("../../Search/mocks/CategoryAPIMock");
const Folders_1 = require("@/modules/Search/models/Folders/Inputs/Folders");
const getters_1 = require("@/modules/DataManipulation/store/getters");
describe('DataManipulation getter', () => {
    describe('hasPermissionToManipulateFolder', () => {
        const permissionCases = [
            {
                folderId: 1,
                permissionName: 'CAN_CREATE_FOLDER',
                category: {
                    ...CategoryAPIMock_1.categoryMock,
                    permissions: ['CAN_CREATE_FOLDER']
                },
                expectedHasPermission: true
            },
            {
                folderId: 1,
                permissionName: 'CanDeleteChildren',
                category: {
                    ...CategoryAPIMock_1.categoryMock,
                    permissions: ['CAN_CREATE_FOLDER']
                },
                expectedHasPermission: false
            },
            {
                folderId: 1,
                permissionName: 'CAN_CREATE_FOLDER',
                category: { ...CategoryAPIMock_1.categoryMock, id: 27 },
                expectedHasPermission: false // Must return false
            },
            {
                folderId: 0,
                permissionName: 'CAN_CREATE_FOLDER',
                category: { ...CategoryAPIMock_1.categoryMock, id: 27 },
                expectedHasPermission: false // Must return false
            }
        ];
        it.each(permissionCases)('should return true if permissions are in the folders.permission', ({ folderId, permissionName, category, expectedHasPermission }) => {
            // Given folders state is set
            const state = {};
            const rootState = {};
            const rootGetters = {
                'GED/Search/folders': Folders_1.default.loaded([category])
            };
            // When I call the hasPermissionToManipulateFolder getter
            const hasPermissionToManipulateFolder = getters_1.default.hasPermissionToManipulateFolder(state, getters_1.default, rootState, rootGetters)({
                permissionName,
                folderId
            });
            // Then hasPermissionToManipulateFolder
            expect(hasPermissionToManipulateFolder).toEqual(expectedHasPermission);
        });
    });
});
//# sourceMappingURL=getters.spec.js.map