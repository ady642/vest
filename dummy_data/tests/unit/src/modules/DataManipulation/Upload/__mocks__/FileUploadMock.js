"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filesFailedCase = exports.filesSuccessCase = exports.filesProgressCase = exports.FileUploadMock = void 0;
const FileUpload_1 = require("@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload");
exports.FileUploadMock = [
    new FileUpload_1.default(new File([''], 'filename', { type: 'text/html' }), FileUpload_1.StateUpload.UPLOADED),
    new FileUpload_1.default(new File([''], 'filename', { type: 'text/html' }), FileUpload_1.StateUpload.CANCELED)
];
exports.filesProgressCase = [
    new FileUpload_1.default(new File([''], 'file1.txt', { type: 'text/html' }), FileUpload_1.StateUpload.UPLOADING),
    new FileUpload_1.default(new File([''], 'file2.txt', { type: 'text/html' }), FileUpload_1.StateUpload.UPLOADING),
    new FileUpload_1.default(new File([''], 'file3.txt', { type: 'text/html' }), FileUpload_1.StateUpload.UPLOADED)
];
exports.filesSuccessCase = [
    new FileUpload_1.default(new File([''], 'file1.txt', { type: 'text/html' }), FileUpload_1.StateUpload.UPLOADED),
    new FileUpload_1.default(new File([''], 'file2.txt', { type: 'text/html' }), FileUpload_1.StateUpload.UPLOADED),
    new FileUpload_1.default(new File([''], 'file3.txt', { type: 'text/html' }), FileUpload_1.StateUpload.UPLOADED)
];
exports.filesFailedCase = [
    new FileUpload_1.default(new File([''], 'file1.txt', { type: 'text/html' }), FileUpload_1.StateUpload.ERROR),
    new FileUpload_1.default(new File([''], 'file2.txt', { type: 'text/html' }), FileUpload_1.StateUpload.CANCELED),
    new FileUpload_1.default(new File([''], 'file3.txt', { type: 'text/html' }), FileUpload_1.StateUpload.UPLOADED)
];
//# sourceMappingURL=FileUploadMock.js.map