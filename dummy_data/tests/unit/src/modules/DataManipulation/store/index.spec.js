"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("@/modules/DataManipulation/store");
const store_2 = require("@/modules/DataManipulation/Delete/DeleteFile/store");
const store_3 = require("@/modules/DataManipulation/Upload/store");
const store_4 = require("@/modules/DataManipulation/Create/CreateFolder/store");
const store_5 = require("@/modules/DataManipulation/Delete/DeleteFolder/store");
const store_6 = require("@/modules/DataManipulation/MailToGed/store");
describe('DataManipulation store module', () => {
    it('should return modules, getters', () => {
        expect(store_1.default).toEqual({
            namespaced: true,
            getters: store_1.default.getters,
            modules: {
                DeleteFolders: store_5.default,
                DeleteFile: store_2.default,
                Upload: store_3.default,
                CreateFolder: store_4.default,
                MailToGed: store_6.default
            }
        });
    });
    it('module string construction', () => {
        expect((0, store_1.dataManipulationModule)('myGetter')).toBe('GED/DataManipulation/myGetter');
    });
});
//# sourceMappingURL=index.spec.js.map