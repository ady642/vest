"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RestoreFileRequest_1 = require("@/modules/Trash/models/Query/RestoreFileRequest");
describe('RestoreFileRequest', () => {
    it('constructor with values', () => {
        const req = new RestoreFileRequest_1.default(['12344']);
        expect(req.ids).toHaveLength(1);
        expect(req.ids[0]).toBe('12344');
    });
});
//# sourceMappingURL=RestoreFileRequest.spec.js.map