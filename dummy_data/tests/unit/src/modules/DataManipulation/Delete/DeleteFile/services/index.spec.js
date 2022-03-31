"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("@/modules/DataManipulation/Delete/DeleteFile/services");
const mypulse_shared_dependencies_1 = require("@kpmg/mypulse-shared-dependencies");
describe('DeleteFileServices', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should call api.ds.delete with documents delete API when I call the the deleteFiles with multiple files', () => {
        // When I call the uploadDocument service
        services_1.default.DeleteFiles('545421', ['1', '2']);
        // Then api.ds.delete must have been called with good path
        expect(mypulse_shared_dependencies_1.api.ds.delete).toHaveBeenCalledWith('/545421/documents', {
            data: { ids: ['1', '2'] }
        });
    });
});
//# sourceMappingURL=index.spec.js.map