"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("@/modules/DataManipulation/Delete/DeleteFolder/services");
const mypulse_shared_dependencies_1 = require("@kpmg/mypulse-shared-dependencies");
describe('DeleteFoldersServices', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should call api.ds.delete with folders get API when I call the the uploadDocument service', () => {
        // When I call the uploadDocument service
        services_1.default.deleteFolder('545421', 12345);
        // Then api.ds.delete must have been called with good path
        expect(mypulse_shared_dependencies_1.api.ds.delete).toHaveBeenCalledWith('/545421/folders/12345?keepFolder=false');
    });
});
//# sourceMappingURL=index.spec.js.map