"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const useDownload = () => {
    const downloadFile = ({ data, fileName }) => {
        const url = URL.createObjectURL(new Blob([data]));
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = fileName;
        downloadLink.click();
    };
    return {
        downloadFile
    };
};
exports.default = useDownload;
//# sourceMappingURL=useDownload.js.map