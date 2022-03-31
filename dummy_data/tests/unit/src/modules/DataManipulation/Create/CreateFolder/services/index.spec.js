"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("@/modules/DataManipulation/Create/CreateFolder/services");
const mypulse_shared_dependencies_1 = require("@kpmg/mypulse-shared-dependencies");
describe('CreateFolderServices', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should call api.ds.create with folder post API when I call the the CreateFolder service', () => {
        const query = {
            targetFolder: 1,
            folderName: 'a',
            accountNumber: '1234'
        };
        // When I call the uploadDocument service
        services_1.default.CreateFolder(query);
        // Then api.ds.delete must have been called with good path
        expect(mypulse_shared_dependencies_1.api.ds.post).toHaveBeenCalledWith('/1234/folders', {
            name: 'a',
            parentId: 1
        });
    });
});
//# sourceMappingURL=index.spec.js.map