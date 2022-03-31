"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFile = void 0;
const FileUpload_1 = require("@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload");
const createFile = (destinationFolderId = 1122, stateFile = FileUpload_1.StateUpload.UPLOADING) => {
    const myFile = new FileUpload_1.default(new File([''], 'filename', { type: 'text/html' }), stateFile);
    myFile.destination = destinationFolderId;
    return myFile;
};
exports.createFile = createFile;
//# sourceMappingURL=createFile.js.map