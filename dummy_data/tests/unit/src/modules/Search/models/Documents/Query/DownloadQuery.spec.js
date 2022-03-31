"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DownloadQuery_1 = require("@/modules/Search/models/Documents/Query/DownloadQuery");
let downloadQuery = new DownloadQuery_1.default();
describe('DownloadQuery', () => {
    it('transformForAPI', () => {
        downloadQuery = new DownloadQuery_1.default({
            accountId: '93012cc8-77b9-4161-8dbd-61915d935e21',
            documentId: 'bc13de06-8e19-407b-9264-a951d48cd630'
        });
        expect(downloadQuery.transformForAPI()).toEqual({
            accountId: '93012cc8-77b9-4161-8dbd-61915d935e21',
            documentId: 'bc13de06-8e19-407b-9264-a951d48cd630'
        });
    });
});
//# sourceMappingURL=DownloadQuery.spec.js.map