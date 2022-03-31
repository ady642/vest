"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DownloadAsZip = void 0;
const file_saver_1 = require("file-saver");
const DownloadAsZip = (data, zipName) => {
    (0, file_saver_1.saveAs)(data, zipName);
};
exports.DownloadAsZip = DownloadAsZip;
//# sourceMappingURL=downloadDocumentsHelper.js.map