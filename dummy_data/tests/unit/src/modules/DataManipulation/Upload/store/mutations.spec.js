"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mutations_1 = require("@/modules/DataManipulation/Upload/store/mutations");
const FileUpload_1 = require("@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload");
describe('Documents mutations', () => {
    it('SET_SELECTED_FOLDER_TO_UPLOAD', () => {
        const state = {
            selectedFolderToUpload: 0
        };
        // When the SET_SELECTED_FOLDER_TO_UPLOAD mutation is called
        mutations_1.default.SET_SELECTED_FOLDER_TO_UPLOAD(state, 4521);
        // Then selectedFolderToUpload state must be equal to payload
        expect(state.selectedFolderToUpload).toEqual(4521);
    });
    describe('SET_FILES', () => {
        it('SET_FILES', () => {
            const state = {
                files: []
            };
            // When the SET_FILES mutation is called
            mutations_1.default.SET_FILES(state, [
                new FileUpload_1.default(new File([''], 'filename.txt', { type: 'text/plain' }), FileUpload_1.StateUpload.TO_UPLOAD)
            ]);
            // Then files state must be equal to payload
            expect(state.files).toEqual([
                {
                    destination: null,
                    errorDescription: {},
                    file: new File([''], 'filename', { type: 'text/plain' }),
                    state: 0
                }
            ]);
        });
        it('SET_FILES with a file type not accepted', () => {
            const state = {
                files: []
            };
            // When the SET_FILES mutation is called with a file type not accepted
            mutations_1.default.SET_FILES(state, [
                new FileUpload_1.default(new File([''], 'filename', { type: 'application/msi' }), FileUpload_1.StateUpload.TO_UPLOAD)
            ]);
            // Then files state must be equal to payload
            expect(state.files).toEqual([
                {
                    destination: null,
                    errorDescription: {
                        description: 'Changer le format de votre fichier et veuillez le déposer de nouveau. Format pris en compte:Jpeg, Png, Pdf, Doc, Xls, Zip, Rar, Xml',
                        libelle: 'Format de fichier non pris en compte'
                    },
                    file: new File([''], 'filename', { type: 'text/html' }),
                    state: FileUpload_1.StateUpload.ERROR
                }
            ]);
        });
    });
    describe('SET_FILE_STATE', () => {
        it('SET_FILE_STATE with error properties', () => {
            const state = {
                files: [
                    new FileUpload_1.default(new File([''], 'filename', { type: 'text/html' }), FileUpload_1.StateUpload.TO_UPLOAD)
                ]
            };
            // When the SET_FILE_STATE mutation is called
            mutations_1.default.SET_FILE_STATE(state, {
                index: 0,
                fileState: FileUpload_1.StateUpload.UPLOADING
            });
            // Then files state must be equal to payload
            expect(state.files[0]).toEqual({
                destination: null,
                errorDescription: {},
                file: new File([''], 'filename', { type: 'text/html' }),
                state: 2
            });
        });
        it('SET_FILE_STATE without error properties', () => {
            const state = {
                files: [
                    new FileUpload_1.default(new File([''], 'filename', { type: 'text/html' }), FileUpload_1.StateUpload.TO_UPLOAD)
                ]
            };
            // When the SET_FILE_STATE mutation is called
            mutations_1.default.SET_FILE_STATE(state, {
                index: 0,
                fileState: FileUpload_1.StateUpload.ERROR,
                error: { libelle: 'test ', description: 'good error' }
            });
            // Then files state must be equal to payload
            expect(state.files[0]).toEqual({
                destination: null,
                errorDescription: { libelle: 'test ', description: 'good error' },
                file: new File([''], 'filename', { type: 'text/html' }),
                state: 4
            });
        });
    });
});
//# sourceMappingURL=mutations.spec.js.map