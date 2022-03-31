"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentMock = void 0;
const Document_1 = require("@/modules/Search/models/Documents/Inputs/Document");
const constants_1 = require("@/Common/constants");
const Properties_1 = require("@/modules/Search/models/Documents/Inputs/Properties");
exports.DocumentMock = {
    createdBy: '',
    id: 'myID',
    folderId: 45454,
    name: 'Mon bilan comptable',
    path: ['Some path'],
    creationDate: '2018-05-27',
    restorationStatus: 'InProgress',
    properties: new Properties_1.default({ syncStatus: constants_1.default.PENDING_SYNC }),
    size: 54354,
    updatedDate: '2018-05-27',
    type: 'jpg',
    preview: 'preview-href',
    lifecycleStatus: Document_1.LifeCycleStatus.Treated,
    comments: '',
    get isTreated() {
        return true;
    },
    get isNew() {
        return false;
    },
    get isSync() {
        return false;
    }
};
//# sourceMappingURL=DocumentMock.js.map