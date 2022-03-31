"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TrashDocuments_1 = require("@/modules/Trash/models/Inputs/TrashDocuments");
describe('TrashDocuments', () => {
    test('constructor', () => {
        const trashDocuments = new TrashDocuments_1.default({
            state: 'loaded',
            collectionFromAPI: [
                {
                    id: '1',
                    name: 'test',
                    deleted: '2020-01-01',
                    deletedBy: 'test',
                    path: [],
                    account: {
                        id: '1',
                        name: 'test'
                    },
                    folderId: 1234
                }
            ],
            cancelToken: 'awesome cancel token'
        });
        expect(trashDocuments.state).toBe('loaded');
        expect(trashDocuments.collection).toEqual([
            {
                id: '1',
                name: 'test',
                deleted: '2020-01-01',
                deletedBy: 'test',
                path: [],
                folderId: 1234,
                restorationStatus: ''
            }
        ]);
        expect(trashDocuments.cancelToken).toBe('awesome cancel token');
    });
    test('loaded', () => {
        const trashDocuments = TrashDocuments_1.default.loaded([
            {
                id: '1',
                name: 'test',
                deleted: '2020-01-01',
                deletedBy: 'test',
                path: [],
                account: {
                    id: '1',
                    name: 'test'
                },
                folderId: 1234
            }
        ]);
        expect(trashDocuments.state).toBe('loaded');
        expect(trashDocuments.collection).toEqual([
            {
                id: '1',
                name: 'test',
                deleted: '2020-01-01',
                deletedBy: 'test',
                path: [],
                folderId: 1234,
                restorationStatus: ''
            }
        ]);
    });
    test('loading', () => {
        const trashDocuments = TrashDocuments_1.default.loading('cancel token');
        expect(trashDocuments.state).toBe('loading');
        expect(trashDocuments.collection).toEqual([]);
    });
    test('errored', () => {
        const trashDocuments = TrashDocuments_1.default.errored();
        expect(trashDocuments.state).toBe('errored');
    });
    test('isLoading', () => {
        const trashDocuments = TrashDocuments_1.default.loading('cancel token');
        expect(trashDocuments.isLoading).toBe(true);
    });
});
//# sourceMappingURL=TrashDocuments.spec.js.map