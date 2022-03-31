"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateUpload = void 0;
var StateUpload;
(function (StateUpload) {
    StateUpload[StateUpload["TO_UPLOAD"] = 0] = "TO_UPLOAD";
    StateUpload[StateUpload["PENDING"] = 1] = "PENDING";
    StateUpload[StateUpload["UPLOADING"] = 2] = "UPLOADING";
    StateUpload[StateUpload["UPLOADED"] = 3] = "UPLOADED";
    StateUpload[StateUpload["ERROR"] = 4] = "ERROR";
    StateUpload[StateUpload["CANCELED"] = 5] = "CANCELED";
})(StateUpload = exports.StateUpload || (exports.StateUpload = {}));
class FileUpload {
    constructor(file, state) {
        this.file = file;
        this.state = state;
        this.destination = null;
        this.errorDescription = {};
    }
    finished() {
        return (this.state === StateUpload.ERROR ||
            this.state === StateUpload.UPLOADED ||
            this.state === StateUpload.CANCELED);
    }
    running() {
        return this.state === StateUpload.UPLOADING;
    }
    error() {
        return this.state === StateUpload.ERROR;
    }
    ready() {
        return this.state === StateUpload.TO_UPLOAD;
    }
    canceled() {
        return this.state === StateUpload.CANCELED;
    }
    uploaded() {
        return this.state === StateUpload.UPLOADED;
    }
    pending() {
        return this.state === StateUpload.PENDING;
    }
    getFileExtension() {
        const fileName = this.file.name.split('.');
        return fileName[fileName.length - 1];
    }
}
exports.default = FileUpload;
//# sourceMappingURL=FileUpload.js.map