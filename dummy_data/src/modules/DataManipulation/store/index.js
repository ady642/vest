"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataManipulationModule = void 0;
const store_1 = require("@/modules/DataManipulation/Create/CreateFolder/store");
const store_2 = require("@/modules/DataManipulation/Delete/DeleteFolder/store");
const store_3 = require("@/modules/DataManipulation/Delete/DeleteFile/store");
const store_4 = require("@/modules/DataManipulation/Upload/store");
const store_5 = require("@/modules/DataManipulation/MailToGed/store");
const getters_1 = require("@/modules/DataManipulation/store/getters");
const dataManipulationModule = (name) => `GED/DataManipulation/${name}`;
exports.dataManipulationModule = dataManipulationModule;
exports.default = {
    namespaced: true,
    getters: getters_1.default,
    modules: {
        DeleteFolders: store_2.default,
        DeleteFile: store_3.default,
        Upload: store_4.default,
        CreateFolder: store_1.default,
        MailToGed: store_5.default
    }
};
//# sourceMappingURL=index.js.map