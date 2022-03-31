"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dispatchHelpers_1 = require("@/modules/DataManipulation/Delete/DeleteFile/store/helpers/dispatchHelpers");
const storeMock_1 = require("tests/unit/__mocks__/storeMock");
let storeMock = (0, storeMock_1.createDeleteFileStoreMocked)();
describe('dispatchHelpers dispatch', () => {
    beforeEach(() => {
        storeMock = (0, storeMock_1.createDeleteFileStoreMocked)();
        storeMock.dispatch = jest.fn();
    });
    it('deleteFile', () => {
        const { deleteFile } = (0, dispatchHelpers_1.default)(storeMock);
        deleteFile('awesome-document-id');
        expect(storeMock.dispatch).toHaveBeenCalledWith('GED/DataManipulation/DeleteFile/deleteFiles', ['awesome-document-id']);
    });
    it('deleteFiles', () => {
        const { deleteFiles } = (0, dispatchHelpers_1.default)(storeMock);
        deleteFiles(['awesome-document-id', 'awesome-document-id-2']);
        expect(storeMock.dispatch).toHaveBeenCalledWith('GED/DataManipulation/DeleteFile/deleteFiles', ['awesome-document-id', 'awesome-document-id-2']);
    });
});
//# sourceMappingURL=dispatchHelpers.spec.js.map