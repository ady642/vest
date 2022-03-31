"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("@/modules/DataManipulation/Upload/services");
const mypulse_shared_dependencies_1 = require("@kpmg/mypulse-shared-dependencies");
describe('UploadServices', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should call api.ds.post with folders get API when I call the the uploadDocument service', () => {
        // When I call the uploadDocument service
        services_1.default.uploadDocument({
            accountNumberOrId: 'testmodel6',
            folderId: 12345,
            file: new File([''], 'filename', { type: 'text/html' })
        });
        const formData = new FormData();
        formData.append('file', new File([''], 'filename', { type: 'text/html' }));
        // Then api.ds.post must have been called with good path
        expect(mypulse_shared_dependencies_1.api.ds.post).toHaveBeenCalledWith('/testmodel6/folders/12345/documents?notify=true', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    });
});
//# sourceMappingURL=index.spec.js.map