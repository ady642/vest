"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("@/modules/DataManipulation/Upload/store");
const uploadDocument = async (store, fileIndex) => {
    await store.dispatch((0, store_1.uploadModule)('uploadDocument'), fileIndex);
};
const uploadDocuments = async (store, indexes) => {
    await store.dispatch((0, store_1.uploadModule)('uploadDocuments'), indexes);
};
const setFiles = async (store, files) => {
    await store.dispatch((0, store_1.uploadModule)('setFiles'), files);
};
const sortFiles = (store) => {
    store.dispatch((0, store_1.uploadModule)('sortFiles'));
};
const setFileState = (store, { index, fileState, error }) => {
    store.dispatch((0, store_1.uploadModule)('setFileState'), { index, fileState, error });
};
const setFileDestination = (store, { index, destinationId }) => {
    store.dispatch((0, store_1.uploadModule)('setFileDestination'), {
        index,
        destinationId
    });
};
const setSelectedFolderToUpload = (store, selectedFolderToUpload) => {
    store.dispatch((0, store_1.uploadModule)('setSelectedFolderToUpload'), selectedFolderToUpload);
};
const setGedNotification = (store, notification) => {
    store.dispatch((0, store_1.uploadModule)('setGedNotification'), notification);
};
const closeGedNotification = (store) => {
    store.dispatch((0, store_1.uploadModule)('closeGedNotification'));
};
const cancelFilesUpload = (store) => {
    store.dispatch((0, store_1.uploadModule)('cancelFilesUpload'));
};
const dispatchHelpers = () => ({
    uploadDocument,
    uploadDocuments,
    setFiles,
    sortFiles,
    setFileState,
    setFileDestination,
    setSelectedFolderToUpload,
    setGedNotification,
    closeGedNotification,
    cancelFilesUpload
});
exports.default = dispatchHelpers;
//# sourceMappingURL=dispatchHelpers.js.map