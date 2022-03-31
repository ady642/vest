"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getters_1 = require("@/modules/DataManipulation/Upload/store/getters");
const FileUpload_1 = require("@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload");
const FileUpload_2 = require("@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload");
let state = {};
let searchState = {};
let uploadGetters = {};
let rootState = {};
let rootGetters = {};
describe('Upload getters', () => {
    it('should return files when I called files getter', () => {
        state = {
            files: [
                new FileUpload_1.default(new File([''], 'filename', { type: 'text/html' }), FileUpload_2.StateUpload.TO_UPLOAD)
            ]
        };
        const files = getters_1.default.files(state);
        expect(files).toEqual([
            {
                destination: null,
                errorDescription: {},
                file: new File([''], 'filename', { type: 'text/html' }),
                state: 0
            }
        ]);
    });
    it('should return selectedFolderToUpload when I called selectedFolderToUpload getter', () => {
        state = {
            selectedFolderToUpload: 4521
        };
        const files = getters_1.default.selectedFolderToUpload(state);
        expect(files).toEqual(4521);
    });
    describe('hasPermissionToUploadFile', () => {
        const disableCases = [
            {
                files: [
                    new FileUpload_1.default(new File([''], 'filename', { type: 'text/html' }), FileUpload_2.StateUpload.UPLOADING),
                    new FileUpload_1.default(new File([''], 'filename', { type: 'text/html' }), FileUpload_2.StateUpload.UPLOADING)
                ],
                expectedValue: true
            },
            {
                files: [
                    new FileUpload_1.default(new File([''], 'filename', { type: 'text/html' }), FileUpload_2.StateUpload.CANCELED),
                    new FileUpload_1.default(new File([''], 'filename', { type: 'text/html' }), FileUpload_2.StateUpload.UPLOADED)
                ],
                expectedValue: false
            }
        ];
        test.each(disableCases)('Test value', ({ files, expectedValue }) => {
            state = {
                files: files
            };
            const isUploading = getters_1.default.isUploading(state);
            expect(isUploading).toBe(expectedValue);
        });
    });
    describe('hasPermissionToUploadFile', () => {
        const cases = [
            {
                hasPermissionToManipulateFolder: jest.fn(() => true),
                expectedValue: true
            },
            {
                hasPermissionToManipulateFolder: jest.fn(() => false),
                expectedValue: false
            }
        ];
        test.each(cases)('Test value', ({ hasPermissionToManipulateFolder, expectedValue }) => {
            const rootState = {};
            const rootGetters = {
                'GED/DataManipulation/hasPermissionToManipulateFolder': hasPermissionToManipulateFolder
            };
            const canUpload = getters_1.default.hasPermissionToUploadFile(state, uploadGetters, rootState, rootGetters)(1122);
            expect(canUpload).toBe(expectedValue);
        });
    });
});
//# sourceMappingURL=getters.spec.js.map