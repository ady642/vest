"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pretty_bytes_1 = require("pretty-bytes");
const useBytesFormat = () => {
    const format = (bytes) => {
        return (0, pretty_bytes_1.default)(bytes);
    };
    return {
        format
    };
};
exports.default = useBytesFormat;
//# sourceMappingURL=useBytesFormat.js.map