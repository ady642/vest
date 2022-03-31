"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FileUpload_1 = require("@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload");
const vuex_1 = require("vuex");
const helpers_1 = require("@/modules/DataManipulation/Upload/store/helpers");
const helpers_2 = require("@/modules/Search/store/helpers");
const useUploadFilesMethod = () => {
    const store = (0, vuex_1.useStore)();
    const { getFiles, setFileDestination, setFileState, selectedFolderToUpload, uploadDocuments } = (0, helpers_1.default)();
    const { fetchDocuments } = (0, helpers_2.default)();
    const handleFileUpload = async (indexes) => {
        await uploadDocuments(store, indexes);
        await fetchDocuments(store);
    };
    const prepareFileForUpload = (index) => {
        setFileDestination(store, {
            index,
            destinationId: selectedFolderToUpload(store).value
        });
        setFileState(store, {
            index,
            fileState: FileUpload_1.StateUpload.PENDING
        });
    };
    const uploadOneFile = async (selectedFileIndex) => {
        prepareFileForUpload(selectedFileIndex);
        await handleFileUpload([selectedFileIndex]);
    };
    const uploadAllFilesInSameFolder = async (callbackBeforeUpload) => {
        const filesIndexesToUpload = [];
        getFiles(store).value.forEach((file, index) => {
            if (file.ready()) {
                filesIndexesToUpload.push(index);
                prepareFileForUpload(index);
            }
        });
        if (callbackBeforeUpload) {
            callbackBeforeUpload();
        }
        await handleFileUpload(filesIndexesToUpload);
    };
    return {
        uploadOneFile,
        uploadAllFilesInSameFolder
    };
};
exports.default = useUploadFilesMethod;
//# sourceMappingURL=uploadFilesMethod.js.map