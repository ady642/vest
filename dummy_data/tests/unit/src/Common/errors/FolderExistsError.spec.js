"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FolderExistsError_1 = require("@/Common/errors/FolderExistsError");
describe('FolderExistsError', () => {
    test('mapping class', () => {
        const folderExistsError = new FolderExistsError_1.default();
        expect(folderExistsError.message).toBe('This folder already exists');
        expect(folderExistsError.code).toBe(403);
    });
});
//# sourceMappingURL=FolderExistsError.spec.js.map