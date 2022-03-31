"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getterHelpers_1 = require("@/modules/Search/store/helpers/getterHelpers");
const dispatchHelpers_1 = require("@/modules/Search/store/helpers/dispatchHelpers");
const subscriptionHelpers_1 = require("@/modules/Search/store/helpers/subscriptionHelpers");
const useSearchStoreHelpers = () => ({
    ...(0, getterHelpers_1.default)(),
    ...(0, dispatchHelpers_1.default)(),
    ...(0, subscriptionHelpers_1.default)()
});
exports.default = useSearchStoreHelpers;
//# sourceMappingURL=index.js.map