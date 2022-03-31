"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("@/Common/constants");
const useDocumentTypeComputed = () => ({
    documentTypeIcon: (type) => {
        switch (type) {
            case constants_1.default.PDF:
                return 'pdf';
            case constants_1.default.TXT:
                return 'file';
            case constants_1.default.XLS:
                return 'xls';
            default:
                return 'file';
        }
    },
    documentType: (type) => {
        return type.substring(1).toUpperCase();
    }
});
exports.default = useDocumentTypeComputed;
//# sourceMappingURL=documentTypeComputeds.js.map