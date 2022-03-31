"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Folders_1 = require("@/modules/Search/models/Folders/Inputs/Folders");
const useFoldersData = () => {
    const FoldersData = Folders_1.default.loaded([
        {
            id: 1122,
            name: 'A classer',
            parent: { id: 0 },
            children: [
                {
                    id: 1001,
                    name: 'The child',
                    children: [
                        {
                            id: 2705,
                            name: 'The grandson',
                            children: [],
                            parent: { id: 1001 },
                            properties: {},
                            permissions: []
                        },
                        {
                            id: 102,
                            name: 'The other grandson',
                            children: [],
                            parent: { id: 1001 },
                            properties: {},
                            permissions: []
                        }
                    ],
                    parent: { id: 1122 },
                    properties: {},
                    permissions: []
                }
            ],
            properties: { syncStatus: 'PENDING_SYNC' },
            permissions: []
        },
        {
            id: 1233,
            name: 'Autres',
            parent: { id: 0 },
            children: [],
            permissions: [],
            properties: {
                defaultUpload: true,
                syncStatus: 'SUCCESS_SYNC'
            }
        },
        {
            id: 1234,
            name: 'Banque',
            parent: { id: 0 },
            children: [],
            properties: { syncStatus: 'ERROR_SYNC' },
            permissions: []
        },
        {
            id: 1235,
            name: 'Achats',
            parent: { id: 0 },
            children: [],
            properties: { syncStatus: 'SUCCESS_SYNC' },
            permissions: []
        },
        {
            id: 1236,
            name: 'Ventes',
            parent: { id: 0 },
            children: [],
            properties: { syncStatus: 'ERROR_SYNC' },
            permissions: []
        }
    ]);
    return {
        FoldersData
    };
};
exports.default = useFoldersData;
//# sourceMappingURL=FoldersDataMock.js.map