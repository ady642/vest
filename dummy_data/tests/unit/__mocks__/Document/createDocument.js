"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDocument = void 0;
const Document_1 = require("@/modules/Search/models/Documents/Inputs/Document");
const createDocument = (id, folderId, syncStatus) => {
    const myDoc = new Document_1.default();
    myDoc.id = id;
    myDoc.folderId = folderId;
    myDoc.properties.syncStatus = syncStatus;
    return myDoc;
};
exports.createDocument = createDocument;
//# sourceMappingURL=createDocument.js.map