"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SET_FILE_DESTINATION = exports.SET_FILE_STATE = exports.SET_FILES = exports.SET_SELECTED_FOLDER_TO_UPLOAD = void 0;
const FileUpload_1 = require("@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload");
const file_1 = require("@/Common/helpers/file");
const uploadErrorMapping_1 = require("@/Common/consts/uploadErrorMapping");
exports.SET_SELECTED_FOLDER_TO_UPLOAD = 'SET_SELECTED_FOLDER_TO_UPLOAD';
exports.SET_FILES = 'SET_FILES';
exports.SET_FILE_STATE = 'SET_FILE_STATE';
exports.SET_FILE_DESTINATION = 'SET_FILE_DESTINATION';
exports.default = {
    [exports.SET_SELECTED_FOLDER_TO_UPLOAD]: (state, selectedFolderToUpload) => {
        state.selectedFolderToUpload = selectedFolderToUpload;
    },
    [exports.SET_FILES]: (state, files) => {
        state.files = files.map((fileUpload) => {
            if (!(0, file_1.isAcceptedFile)(fileUpload.file)) {
                fileUpload.state = FileUpload_1.StateUpload.ERROR;
                fileUpload.errorDescription.description = (0, uploadErrorMapping_1.default)('UnauthorizedFileType').description;
                fileUpload.errorDescription.libelle = (0, uploadErrorMapping_1.default)('UnauthorizedFileType').libelle;
            }
            return fileUpload;
        });
    },
    [exports.SET_FILE_STATE]: (state, { index, fileState, error }) => {
        if (error !== null && error !== undefined) {
            state.files[index].errorDescription = error;
        }
        state.files[index].state = fileState;
    },
    [exports.SET_FILE_DESTINATION]: (state, { index, destinationId }) => {
        state.files[index].destination = destinationId;
    }
};
//# sourceMappingURL=mutations.js.map