"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getterHelpers_ts_1 = require("@/modules/DataManipulation/Delete/DeleteFolder/store/helpers/getterHelpers.ts");
const dispatchHelpers_1 = require("@/modules/DataManipulation/Delete/DeleteFolder/store/helpers/dispatchHelpers");
const useDeleteFolderHelpers = (store) => ({
    ...(0, getterHelpers_ts_1.default)(store),
    ...(0, dispatchHelpers_1.default)(store)
});
exports.default = useDeleteFolderHelpers;
//# sourceMappingURL=index.js.map