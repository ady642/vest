"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dispatchHelpers_1 = require("@/modules/DataManipulation/Create/CreateFolder/store/helpers/dispatchHelpers");
const gettersHelper_1 = require("@/modules/DataManipulation/Create/CreateFolder/store/helpers/gettersHelper");
const useCreateFolderModule = (store) => ({
    ...(0, dispatchHelpers_1.default)(store),
    ...(0, gettersHelper_1.default)(store)
});
exports.default = useCreateFolderModule;
//# sourceMappingURL=index.js.map