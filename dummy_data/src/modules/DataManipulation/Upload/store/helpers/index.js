"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getterHelpers_ts_1 = require("@/modules/DataManipulation/Upload/store/helpers/getterHelpers.ts");
const dispatchHelpers_ts_1 = require("@/modules/DataManipulation/Upload/store/helpers/dispatchHelpers.ts");
const useUploadStoreHelpers = () => ({
    ...(0, getterHelpers_ts_1.default)(),
    ...(0, dispatchHelpers_ts_1.default)()
});
exports.default = useUploadStoreHelpers;
//# sourceMappingURL=index.js.map