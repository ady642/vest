"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("@/modules/Search/store");
const store_2 = require("@/modules/DataManipulation/store");
const store_3 = require("@/modules/Trash/store");
exports.default = {
    namespaced: true,
    modules: {
        Trash: store_3.default,
        Search: store_1.default,
        DataManipulation: store_2.default
    }
};
//# sourceMappingURL=index.js.map