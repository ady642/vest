"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FileUpload_1 = require("@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload");
const FileUpload_2 = require("@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload");
const uploadErrorMapping_1 = require("@/Common/consts/uploadErrorMapping");
const content = 'mock content';
const data = new Blob([content], { type: 'application/zip' });
const arrayOfBlob = new Array();
arrayOfBlob.push(data);
const mockZip = new File(arrayOfBlob, 'Mock.zip');
describe('FileUpload', () => {
    test('mapping value with parameters', () => {
        const file = new FileUpload_1.default(mockZip, FileUpload_2.StateUpload.UPLOADED);
        // Then
        expect(file.file).toStrictEqual(mockZip);
        expect(file.state).toBe(FileUpload_2.StateUpload.UPLOADED);
        expect(file.errorDescription).toStrictEqual({});
        expect(file.destination).toBe(null);
    });
    test('Setter', () => {
        const file = new FileUpload_1.default(mockZip, FileUpload_2.StateUpload.UPLOADED);
        file.file = new File(arrayOfBlob, 'Mock2.zip');
        file.state = FileUpload_2.StateUpload.UPLOADING;
        file.destination = 666;
        file.errorDescription = (0, uploadErrorMapping_1.default)('FileEmpty');
        const description = {
            libelle: 'Taille du fichier trop petit',
            description: 'Le fichier actuel est vide, veuillez déposer de nouveau un fichier non vide.'
        };
        // Then
        expect(file.file).toStrictEqual(new File(arrayOfBlob, 'Mock2.zip'));
        expect(file.state).toBe(FileUpload_2.StateUpload.UPLOADING);
        expect(file.errorDescription).toStrictEqual(description);
        expect(file.destination).toBe(666);
    });
    test('Method case UPLOADED', () => {
        const file = new FileUpload_1.default(mockZip, FileUpload_2.StateUpload.UPLOADED);
        expect(file.finished()).toBe(true);
        expect(file.running()).toBe(false);
        expect(file.error()).toBe(false);
        expect(file.ready()).toBe(false);
    });
    test('Method case UPLOADING', () => {
        const file = new FileUpload_1.default(mockZip, FileUpload_2.StateUpload.UPLOADING);
        expect(file.finished()).toBe(false);
        expect(file.running()).toBe(true);
        expect(file.error()).toBe(false);
        expect(file.ready()).toBe(false);
    });
    test('Method case ERROR', () => {
        const file = new FileUpload_1.default(mockZip, FileUpload_2.StateUpload.ERROR);
        expect(file.finished()).toBe(true);
        expect(file.running()).toBe(false);
        expect(file.error()).toBe(true);
        expect(file.ready()).toBe(false);
    });
    test('Method case TO_UPLOAD', () => {
        const file = new FileUpload_1.default(mockZip, FileUpload_2.StateUpload.TO_UPLOAD);
        expect(file.finished()).toBe(false);
        expect(file.running()).toBe(false);
        expect(file.error()).toBe(false);
        expect(file.ready()).toBe(true);
    });
    test('Method case PENDING', () => {
        const file = new FileUpload_1.default(mockZip, FileUpload_2.StateUpload.PENDING);
        expect(file.finished()).toBe(false);
        expect(file.running()).toBe(false);
        expect(file.error()).toBe(false);
        expect(file.ready()).toBe(false);
    });
    test('Method case canceled', () => {
        const file = new FileUpload_1.default(mockZip, FileUpload_2.StateUpload.CANCELED);
        expect(file.finished()).toBe(true);
        expect(file.running()).toBe(false);
        expect(file.error()).toBe(false);
        expect(file.ready()).toBe(false);
    });
    test('Method case error', () => {
        const file = new FileUpload_1.default(mockZip, FileUpload_2.StateUpload.ERROR);
        expect(file.finished()).toBe(true);
        expect(file.running()).toBe(false);
        expect(file.error()).toBe(true);
        expect(file.ready()).toBe(false);
    });
});
//# sourceMappingURL=FileUpload.spec.js.map