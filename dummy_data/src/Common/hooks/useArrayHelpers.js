"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FileUpload_1 = require("@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload");
const useArrayHelper = () => {
    const sortArrayByAlphabeticalOrder = (array, sortBy) => {
        if (!array) {
            return [];
        }
        return array.sort((a, b) => `${a[sortBy]}`.toLowerCase().localeCompare(`${b[sortBy]}`));
    };
    const findDeep = (array, id) => {
        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            if (element.id === id) {
                return element;
            }
            const found = findDeep(element.children, id);
            if (found)
                return found;
        }
    };
    const countDeep = (array, id, deep = 0) => {
        if (array.length === 0) {
            return deep;
        }
        const folder = array.find((folder) => folder.id === id);
        if (folder) {
            return deep + 1;
        }
        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            const found = countDeep(element.children, id, deep);
            if (found)
                return found + 1;
        }
        return 0;
    };
    const findDeepByName = (array, name) => {
        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            if (element.name === name) {
                return element;
            }
            const found = findDeepByName(element.children, name);
            if (found)
                return found;
        }
    };
    const findDefaultUploadFolder = (array) => {
        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            if (element.properties.defaultUpload === true) {
                return element;
            }
            const found = findDefaultUploadFolder(element.children);
            if (found)
                return found;
        }
    };
    const findShortcutFolders = (folder, acc) => {
        if (folder.properties.isShortcut) {
            acc.push(folder);
        }
        for (let i = 0; i < folder.children.length; i++) {
            acc = findShortcutFolders(folder.children[i], acc);
        }
        return acc;
    };
    const hasFileUploadingInIt = ({ folderId, files }) => files.some((file) => file.state === FileUpload_1.StateUpload.UPLOADING && file.destination === folderId);
    const hasFileUploading = ({ folders, files }) => {
        if (files.length === 0) {
            return false;
        }
        for (let i = 0; i < folders.length; i++) {
            const folder = folders[i];
            if (hasFileUploadingInIt({ folderId: folder.id ?? 0, files })) {
                return true;
            }
            if (hasFileUploading({
                folders: folder.children,
                files
            })) {
                return true;
            }
        }
        return false;
    };
    const removeFolder = (array, id) => {
        const folderToDelete = findDeep(array, id);
        const parentFolderToDelete = findDeep(array, folderToDelete?.parentId ?? 0);
        return array.map((folder) => {
            if (folder.id === parentFolderToDelete?.id) {
                folder.setChildren(folder.children.filter((child) => child.id !== id));
            }
            else {
                folder.setChildren(removeFolder(folder.children, id));
            }
            return folder;
        });
    };
    const removeDeepByLevel = (array, deep, level = 0) => {
        if (array.length === 0) {
            return array;
        }
        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            if (level >= deep) {
                element.children = [];
            }
            removeDeepByLevel(element.children, deep, level + 1);
        }
        return array;
    };
    return {
        sortArrayByAlphabeticalOrder,
        findDeep,
        countDeep,
        removeDeepByLevel,
        findDefaultUploadFolder,
        hasFileUploadingInIt,
        hasFileUploading,
        removeFolder,
        findDeepByName,
        findShortcutFolders
    };
};
exports.default = useArrayHelper;
//# sourceMappingURL=useArrayHelpers.js.map