"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createDocument_1 = require("dummy_data/tests/unit/__mocks__/Document/createDocument");
const getters_1 = require("@/modules/DataManipulation/Delete/DeleteFile/store/getters");
const constants_1 = require("@/Common/constants");
const folderMock_1 = require("@/modules/Search/services/__mocks__/folderMock");
const Folders_1 = require("@/modules/Search/models/Folders/Inputs/Folders");
describe('delete file getters', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('isFileDeletable', () => {
        const cases = [
            // File is directly in folder
            {
                document: (0, createDocument_1.createDocument)('document-id-1', 123, constants_1.default.SUCCESS_SYNC),
                expectedDeletable: false,
                hasPermissionToManipulateFolder: jest.fn(() => false)
            },
            {
                // Folder example : 135393653 Traité
                document: (0, createDocument_1.createDocument)('document-id-1', 135393653, constants_1.default.SUCCESS_SYNC),
                hasPermissionToManipulateFolder: jest.fn(() => false),
                expectedDeletable: false // CANT be deleted
            },
            {
                // Folder example : 135393659 Achats
                document: (0, createDocument_1.createDocument)('document-id-1', 135393659, constants_1.default.PENDING_SYNC),
                hasPermissionToManipulateFolder: jest.fn(() => false),
                expectedDeletable: false // CANT be deleted
            },
            {
                // Folder example : 135393659 Achats
                document: (0, createDocument_1.createDocument)('document-id-1', 135393659, constants_1.default.SUCCESS_SYNC),
                hasPermissionToManipulateFolder: jest.fn(() => false),
                expectedDeletable: false // CANT be deleted
            },
            {
                // Folder example : 135393657 Fiscalité
                document: (0, createDocument_1.createDocument)('document-id-1', 135393657, constants_1.default.SUCCESS_SYNC),
                hasPermissionToManipulateFolder: jest.fn(() => true),
                expectedDeletable: true // CANT be deleted
            }
        ];
        test.each(cases)('should return %s', ({ document, expectedDeletable, hasPermissionToManipulateFolder }) => {
            // Given
            const state = {};
            const rootState = {};
            const rootGetters = {
                'GED/DataManipulation/hasPermissionToManipulateFolder': hasPermissionToManipulateFolder,
                'GED/Search/documents': { collection: [document] },
                'GED/Search/folders': new Folders_1.default({
                    state: 'loaded',
                    collectionFromAPI: folderMock_1.folderMock
                })
            };
            // When
            const isFileDeletable = getters_1.default.isFileDeletable(state, getters_1.default, rootState, rootGetters)(document.id ?? '');
            // Then
            expect(isFileDeletable).toEqual(expectedDeletable);
        });
    });
    describe('isFileDeleting', () => {
        const deletingCases = [
            { isFileDeleting: false, expected: false },
            { isFileDeleting: true, expected: true }
        ];
        it.each(deletingCases)('is should return $expected if isFileDeleting = $isFileDeleting', ({ isFileDeleting, expected }) => {
            const state = {
                isFileDeleting
            };
            expect(getters_1.default.isFileDeleting(state)).toBe(expected);
        });
    });
    describe('areDocumentsDeletable', () => {
        it.each([
            { deletableValues: [true, true, true], expected: true },
            { deletableValues: [false, true, true], expected: false },
            { deletableValues: [false, false, false], expected: false }
        ])('should return true if all the documents can be deleted', ({ deletableValues, expected }) => {
            // Given
            const state = {};
            const myGetters = {
                isFileDeletable: jest.fn()
            };
            jest
                .spyOn(myGetters, 'isFileDeletable')
                .mockReturnValueOnce(deletableValues[0])
                .mockReturnValueOnce(deletableValues[1])
                .mockReturnValueOnce(deletableValues[2]);
            const documentIds = ['19', '27', '05'];
            const areDocumentsDeletable = getters_1.default.areDocumentsDeletable(state, myGetters)(documentIds);
            expect(areDocumentsDeletable).toBe(expected);
        });
    });
});
//# sourceMappingURL=getters.spec.js.map