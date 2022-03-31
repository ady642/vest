"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilesFromDataTransfer = void 0;
const isFile = (entry) => {
    if (entry && typeof entry.isFile !== 'undefined') {
        return entry.isFile;
    }
    return false;
};
const isDirectory = (entry) => {
    if (entry && typeof entry.isDirectory !== 'undefined') {
        return entry.isDirectory;
    }
    return false;
};
const readFile = (entry) => {
    return new Promise((resolve) => entry.file(resolve));
};
const readDirectory = async (dir) => {
    const reader = dir.createReader();
    const readMore = () => new Promise((resolve) => {
        reader.readEntries(resolve);
    });
    const entries = await readMore();
    const response = [];
    for (const entry of entries) {
        response.push(...(await readEntry(entry)));
    }
    return response;
};
const readEntry = async (entry) => {
    if (isFile(entry)) {
        const file = await readFile(entry);
        // for firefox to ecrase webkitRelativePath value
        return [new File([file], file.name, { type: file.type })];
    }
    else if (isDirectory(entry)) {
        return readDirectory(entry);
    }
    else
        return [];
};
const dataTransferItemToFileSystemEntry = (item) => {
    const response = [];
    Array.from(item).forEach((element) => {
        const entry = element.webkitGetAsEntry && element.webkitGetAsEntry();
        if (entry)
            response.push(entry);
    });
    return response;
};
const readItem = async (item) => {
    if (item) {
        return readEntry(item);
    }
    else
        return [];
};
const getFilesFromDataTransfer = async (dataTransfer) => {
    let files = [];
    if (!dataTransfer) {
        throw new Error('Expect event.dataTransfer to be present');
    }
    if (dataTransfer.items) {
        const filesEntries = dataTransferItemToFileSystemEntry(dataTransfer.items);
        for (const item of Array.from(filesEntries)) {
            files = [...files, ...(await readItem(item))];
        }
    }
    else if (dataTransfer.files) {
        // For Safari
        for (const file of Array.from(dataTransfer.files)) {
            files.push(file);
        }
    }
    return files;
};
exports.getFilesFromDataTransfer = getFilesFromDataTransfer;
//# sourceMappingURL=dataTransferHelper.js.map