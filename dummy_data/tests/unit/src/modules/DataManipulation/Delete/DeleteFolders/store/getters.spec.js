"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createFile_1 = require("dummy_data/tests/unit/__mocks__/Files/createFile");
const FoldersDataMock_1 = require("dummy_data/tests/unit/src/modules/Search/mocks/FoldersDataMock");
const getters_1 = require("@/modules/DataManipulation/Delete/DeleteFolder/store/getters");
const FileUpload_1 = require("@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload");
const constants_1 = require("@/Common/constants");
describe('delete folders getters', () => {
    describe('isFolderDeletable', () => {
        const cases = [
            // File is directly in folder
            {
                folderIdToDelete: 1122,
                files: [(0, createFile_1.createFile)(1122, FileUpload_1.StateUpload.UPLOADING)],
                expectedDeletable: false // CANT be deleted
            },
            {
                folderIdToDelete: 1122,
                files: [(0, createFile_1.createFile)(1122, FileUpload_1.StateUpload.PENDING)],
                expectedDeletable: true // CAN be deleted
            },
            // File is in a child
            {
                folderIdToDelete: 1122,
                files: [(0, createFile_1.createFile)(1001, FileUpload_1.StateUpload.UPLOADING)],
                expectedDeletable: false // CANT be deleted
            },
            {
                folderIdToDelete: 1122,
                files: [(0, createFile_1.createFile)(2705, FileUpload_1.StateUpload.UPLOADING)],
                expectedDeletable: false // CANT be deleted
            },
            {
                folderIdToDelete: 1122,
                files: [(0, createFile_1.createFile)(1001, FileUpload_1.StateUpload.PENDING)],
                expectedDeletable: true // CAN be deleted
            },
            // Folder has files uploading and no child
            {
                folderIdToDelete: 2705,
                files: [(0, createFile_1.createFile)(1001, FileUpload_1.StateUpload.UPLOADING)],
                expectedDeletable: true // CAN be deleted
            },
            // Folder and children have no files uploading
            {
                folderIdToDelete: 2705,
                files: [(0, createFile_1.createFile)(1233, FileUpload_1.StateUpload.UPLOADING)],
                expectedDeletable: true // CAN be deleted
            }
        ];
        test.each(cases)('should return $expectedDeletable', ({ folderIdToDelete, files, expectedDeletable }) => {
            // Given
            const state = {};
            const rootState = {};
            const rootGetters = {
                'GED/DataManipulation/Upload/files': files,
                'GED/Search/folders': (0, FoldersDataMock_1.default)().FoldersData
            };
            // When
            const isFolderDeletable = getters_1.default.isFolderDeletable(state, getters_1.default, rootState, rootGetters)(folderIdToDelete);
            // Then
            expect(isFolderDeletable).toEqual(expectedDeletable);
        });
    });
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
            const hasPermissionToDelete = getters_1.default.hasPermissionToDeleteFolder(state, getters_1.default, rootState, rootGetters)(1);
            // Then hasPermission must return true
            expect(rootGetters['GED/DataManipulation/hasPermissionToManipulateFolder']).toHaveBeenCalledWith({
                folderId: 1,
                permissionName: constants_1.default.CAN_DELETE_FOLDER
            });
            expect(hasPermissionToDelete).toEqual(expectedHasPermission);
        });
    });
    describe('isFolderDeleting', () => {
        const deletingCases = [
            { isFolderDeleting: false, expected: false },
            { isFolderDeleting: true, expected: true }
        ];
        it.each(deletingCases)('is should return $expected if isFolderDeleting = $isFolderDeleting', ({ isFolderDeleting, expected }) => {
            const state = {
                isFolderDeleting
            };
            expect(getters_1.default.isFolderDeleting(state)).toBe(expected);
        });
    });
});
//# sourceMappingURL=getters.spec.js.map