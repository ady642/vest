"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mypulse_shared_dependencies_1 = require("@kpmg/mypulse-shared-dependencies");
const GetMailToGedInformations = async (accountNumber) => {
    return await mypulse_shared_dependencies_1.api.ds.get(`/${accountNumber}/mail2ged/informations`);
};
exports.default = {
    GetMailToGedInformations
};
//# sourceMappingURL=index.js.map