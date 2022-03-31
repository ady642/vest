"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getterHelpers_1 = require("@/modules/DataManipulation/Delete/DeleteFile/store/helpers/getterHelpers");
const dispatchHelpers_1 = require("@/modules/DataManipulation/Delete/DeleteFile/store/helpers/dispatchHelpers");
const useDeleteFileHelpers = (store) => ({
    ...(0, getterHelpers_1.default)(store),
    ...(0, dispatchHelpers_1.default)(store)
});
exports.default = useDeleteFileHelpers;
//# sourceMappingURL=index.js.map