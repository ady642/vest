"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("@/modules/DataManipulation/Upload/services");
const FileUpload_1 = require("@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload");
const mutations_1 = require("@/modules/DataManipulation/Upload/store/mutations");
const uploadErrorMapping_1 = require("@/Common/consts/uploadErrorMapping");
const analyticsLog_1 = require("@/Common/helpers/analyticsLog");
const analyticsCode_1 = require("@/Common/constants/analyticsCode");
const setGedNotification = ({ state }, notification) => {
    state.gedNotification = notification;
};
const closeGedNotification = ({ state }) => {
    if (state.gedNotification.close) {
        state.gedNotification.close();
    }
};
const uploadDocuments = async ({ dispatch }, indexes) => {
    let i = 0;
    let fileIndexesToUpload = [];
    const MAX_UPLOAD = 5;
    do {
        fileIndexesToUpload.push(indexes[i]);
        if (fileIndexesToUpload.length === MAX_UPLOAD || i === indexes.length - 1) {
            // Send dispatches every 5 index OR dispatch the rest
            await Promise.all(fileIndexesToUpload.map((index) => dispatch('uploadDocument', index)));
            fileIndexesToUpload = [];
        }
        i++;
    } while (i < indexes.length);
};
const uploadDocument = async ({ rootState, state, commit }, fileIndex) => {
    if (state.files[fileIndex].canceled()) {
        return;
    }
    const targetFolderId = state.files[fileIndex].destination;
    try {
        commit(mutations_1.SET_FILE_STATE, {
            index: fileIndex,
            fileState: FileUpload_1.StateUpload.UPLOADING
        });
        if (!targetFolderId !== null && targetFolderId !== 0) {
            await services_1.default.uploadDocument({
                accountNumberOrId: rootState.app.account.AccountId,
                folderId: targetFolderId ?? 0,
                file: state.files[fileIndex].file
            });
        }
        commit(mutations_1.SET_FILE_STATE, {
            index: fileIndex,
            fileState: FileUpload_1.StateUpload.UPLOADED
        });
        (0, analyticsLog_1.trackEventFactory)(analyticsCode_1.default['updm-upload-success']);
    }
    catch (error) {
        commit(mutations_1.SET_FILE_STATE, {
            index: fileIndex,
            fileState: FileUpload_1.StateUpload.ERROR,
            error: (0, uploadErrorMapping_1.default)(error?.response?.data?.code)
        });
        (0, analyticsLog_1.trackEventFactory)(analyticsCode_1.default['updm-upload-failure'], error?.response?.data?.code);
    }
};
const cancelFilesUpload = async ({ state, commit }) => {
    for (let i = 0; i < state.files.length; i++) {
        if (state.files[i].pending()) {
            commit(mutations_1.SET_FILE_STATE, {
                index: i,
                fileState: FileUpload_1.StateUpload.CANCELED,
                error: (0, uploadErrorMapping_1.default)('CanceledUpload')
            });
        }
    }
};
const sortFiles = ({ state, commit }) => {
    const files = state.files.sort((a, b) => (a.error() && !b.error() ? -1 : 1));
    commit(mutations_1.SET_FILES, files);
};
const setFiles = ({ commit }, files) => {
    commit(mutations_1.SET_FILES, files);
};
const setFileState = ({ commit }, { index, fileState, error }) => {
    commit(mutations_1.SET_FILE_STATE, { index, fileState, error });
};
const setFileDestination = ({ commit }, { index, destinationId }) => {
    commit(mutations_1.SET_FILE_DESTINATION, { index, destinationId });
};
const setSelectedFolderToUpload = ({ commit }, setSelectedFolderToUpload) => {
    commit(mutations_1.SET_SELECTED_FOLDER_TO_UPLOAD, setSelectedFolderToUpload);
};
exports.default = {
    uploadDocument,
    uploadDocuments,
    closeGedNotification,
    setGedNotification,
    cancelFilesUpload,
    setFiles,
    setFileState,
    setFileDestination,
    setSelectedFolderToUpload,
    sortFiles
};
//# sourceMappingURL=actions.js.map