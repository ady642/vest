"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Folders_1 = require("@/modules/Search/models/Folders/Inputs/Folders");
const Folder_1 = require("@/modules/Search/models/Folders/Inputs/Folder");
const folderMock_1 = require("@/modules/Search/services/__mocks__/folderMock");
let folders = Folders_1.default.loaded([]);
const folderData = [
    {
        id: 1122,
        name: 'Comptabilité',
        parent: { id: 0 },
        children: [
            {
                id: 12221,
                name: 'A',
                parent: { id: 1222 },
                children: [
                    {
                        id: 122211,
                        name: 'B',
                        parent: { id: 12221 },
                        children: [],
                        properties: {},
                        permissions: []
                    }
                ],
                properties: {},
                permissions: []
            }
        ],
        properties: {},
        permissions: []
    },
    {
        id: 1233,
        name: 'Gestion Sociale',
        parent: { id: 0 },
        children: [],
        properties: {},
        permissions: []
    }
];
describe('Folders model', () => {
    it('constructor', () => {
        const foldersConstructor = new Folders_1.default({
            state: 'loaded',
            collectionFromAPI: []
        });
        expect(foldersConstructor.state).toBe('loaded');
        expect(foldersConstructor.collection).toStrictEqual([]);
    });
    describe('getDefaultUploadFolderById', () => {
        it('Should return first folder when there is no folder with default properties', () => {
            folders = Folders_1.default.loaded(folderMock_1.folderProjectEntityMock);
            const defaultFolder = folders.getDefaultUploadFolderById(136417978);
            expect(defaultFolder).toBeDefined();
            expect(defaultFolder?.id).toBe(136417979);
            expect(defaultFolder?.name).toBe('2020');
        });
        it('Should return default folder when there is a folder with default properties', () => {
            folders = Folders_1.default.loaded(folderMock_1.folderMock);
            const defaultFolder = folders.getDefaultUploadFolderById(135393635);
            expect(defaultFolder).toBeDefined();
            expect(defaultFolder?.id).toBe(135393651);
            expect(defaultFolder?.name).toBe('Dépôt');
        });
    });
    describe('getShortcutsFolder', () => {
        it('Should return empty array when there is no folder with isShortcut properties', () => {
            folders = Folders_1.default.loaded(folderMock_1.folderProjectEntityMock);
            const shFolders = folders.getShortcutsFolder(136417978);
            expect(shFolders).toBeDefined();
            expect(shFolders).toHaveLength(0);
        });
        it('Should return folders with isShortcut properties', () => {
            folders = Folders_1.default.loaded(folderMock_1.folderMock);
            const shFolders = folders.getShortcutsFolder(135393635);
            expect(shFolders).toBeDefined();
            expect(shFolders).toHaveLength(2);
            expect(shFolders[0]).toStrictEqual(new Folder_1.default({
                id: 136432102,
                name: 'A',
                parent: {
                    id: 135393654
                },
                children: [],
                properties: {
                    syncStatus: 'SUCCESS_SYNC',
                    isShortcut: 'KPMG traité'
                },
                permissions: [
                    'CAN_DELETE_FILES',
                    'CAN_CREATE_FOLDER',
                    'CAN_UPLOAD_FILES'
                ]
            }));
            expect(shFolders[1].id).toStrictEqual(135393652);
        });
    });
    it('getFolderById', () => {
        folders = Folders_1.default.loaded(folderData);
        expect(folders.getFolderById(122211)?.name).toBe('B');
    });
    it('removeFolder', () => {
        folders = Folders_1.default.loaded([
            {
                id: 1905,
                name: 'The parent',
                parent: {
                    id: 0
                },
                children: [
                    {
                        id: 2705,
                        name: 'The son',
                        parent: {
                            id: 1905
                        },
                        children: [],
                        properties: {},
                        permissions: ['CAN_UPLOAD_FILES']
                    }
                ],
                properties: {},
                permissions: ['CAN_UPLOAD_FILES']
            }
        ]);
        folders.removeFolder(2705);
        expect(folders.collection).toStrictEqual([
            new Folder_1.default({
                id: 1905,
                name: 'The parent',
                parent: {
                    id: 0
                },
                children: [],
                properties: {},
                permissions: ['CAN_UPLOAD_FILES']
            })
        ]);
    });
    test('loaded state', () => {
        folders = Folders_1.default.loaded(folderData);
        // Then
        expect(folders.collection).toStrictEqual([
            new Folder_1.default({
                id: 1122,
                name: 'Comptabilité',
                parent: { id: 0 },
                children: [
                    {
                        id: 12221,
                        name: 'A',
                        parent: { id: 1222 },
                        children: [
                            {
                                id: 122211,
                                name: 'B',
                                parent: { id: 12221 },
                                children: [],
                                properties: {},
                                permissions: []
                            }
                        ],
                        properties: {},
                        permissions: []
                    }
                ],
                properties: {},
                permissions: []
            }),
            new Folder_1.default({
                id: 1233,
                name: 'Gestion Sociale',
                parent: { id: 0 },
                children: [],
                properties: {},
                permissions: []
            })
        ]);
        expect(folders.state).toBe('loaded');
    });
    test('loading state', () => {
        folders = Folders_1.default.loading();
        // Then
        expect(folders.collection).toStrictEqual([]);
        expect(folders.state).toBe('loading');
    });
    test('errored state', () => {
        folders = Folders_1.default.errored();
        // Then
        expect(folders.collection).toStrictEqual([]);
        expect(folders.state).toBe('errored');
    });
});
//# sourceMappingURL=Folders.spec.js.map