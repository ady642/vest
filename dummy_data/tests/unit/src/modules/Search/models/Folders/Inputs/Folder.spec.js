"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Folder_1 = require("@/modules/Search/models/Folders/Inputs/Folder");
describe('Folder', () => {
    test('default value', () => {
        const folder = new Folder_1.default({});
        // Then
        expect(folder.id).toBeUndefined();
        expect(folder.name).toBeUndefined();
        expect(folder.parentId).toBeUndefined();
        expect(folder.children).toStrictEqual([]);
        expect(folder.properties).toBeUndefined();
        expect(folder.permissions).toBeUndefined();
    });
    test('mapping value with parameters', () => {
        const folder = new Folder_1.default({
            id: 1233,
            name: 'Compta',
            parent: { id: 0 },
            children: [],
            properties: {
                tracingName: 'Accounting'
            },
            permissions: ['CAN_DELETE_FOLDER', 'CAN_CREATE_FOLDER']
        });
        // Then
        expect(folder.id).toBe(1233);
        expect(folder.name).toBe('Compta');
        expect(folder.parentId).toBe(0);
        expect(folder.children).toHaveLength(0);
        expect(folder.properties).toStrictEqual({
            tracingName: 'Accounting'
        });
        expect(folder.permissions).toStrictEqual([
            'CAN_DELETE_FOLDER',
            'CAN_CREATE_FOLDER'
        ]);
    });
    test('hasChildrenByName', () => {
        const folder = new Folder_1.default({
            id: 1233,
            name: 'Compta',
            parent: { id: 0 },
            children: [
                {
                    id: 1234,
                    name: 'A',
                    parent: { id: 1233 },
                    children: [],
                    properties: {},
                    permissions: ['CAN_DELETE_FOLDER', 'CAN_CREATE_FOLDER']
                }
            ],
            properties: {},
            permissions: ['CAN_DELETE_FOLDER', 'CAN_CREATE_FOLDER']
        });
        expect(folder.hasChildrenByName('A')).toBe(true);
        expect(folder.hasChildrenByName('B')).toBe(false);
    });
    it('getCategory', () => {
        const folder = new Folder_1.default({
            id: 1233,
            name: 'Compta',
            parent: { id: 0 },
            children: [],
            properties: {},
            permissions: []
        });
        expect(folder.getCategory()).toStrictEqual({
            children: [],
            id: 1233,
            name: 'Compta',
            parent: {
                id: 0
            },
            properties: {},
            permissions: []
        });
    });
    it('should set the children when I call setChildren', () => {
        const folder = new Folder_1.default({
            id: 1233,
            name: 'Compta',
            parent: { id: 0 },
            children: [],
            properties: {},
            permissions: []
        });
        const childToAdd = new Folder_1.default({
            id: 2222,
            name: 'Columbo Folder',
            parent: { id: 1233 },
            children: [],
            properties: {},
            permissions: []
        });
        folder.setChildren([childToAdd]);
        expect(folder.children).toEqual([childToAdd]);
    });
});
//# sourceMappingURL=Folder.spec.js.map