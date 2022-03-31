"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allowedTypes_1 = require("@/Common/constants/allowedTypes");
const paginator_1 = require("@/Common/constants/paginator");
const permissions_1 = require("@/Common/constants/permissions");
const syncStatus_1 = require("@/Common/constants/syncStatus");
const descriptions_1 = require("@/Common/constants/descriptions");
const messages_1 = require("@/Common/constants/messages");
const buttons_1 = require("@/Common/constants/buttons");
const restoreStatus_1 = require("./restoreStatus");
const foldersNames_1 = require("./foldersNames");
const documentTypes_1 = require("@/Common/constants/documentTypes");
exports.default = {
    ...buttons_1.default,
    ...allowedTypes_1.default,
    ...paginator_1.default,
    ...syncStatus_1.default,
    ...permissions_1.default,
    ...descriptions_1.default,
    ...messages_1.default,
    ...restoreStatus_1.default,
    ...foldersNames_1.default,
    ...documentTypes_1.default
};
//# sourceMappingURL=index.js.map