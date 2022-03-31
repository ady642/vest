"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const Document_1 = require("@/modules/Search/models/Documents/Inputs/Document");
const useDrawer = () => {
    const showDocDrawer = (0, vue_1.ref)(false);
    const documentSelected = (0, vue_1.ref)(new Document_1.default());
    const handleDocumentClicked = (document) => {
        documentSelected.value = document;
        showDocDrawer.value = true;
    };
    return {
        showDocDrawer,
        documentSelected,
        handleDocumentClicked
    };
};
exports.default = useDrawer;
//# sourceMappingURL=useDrawer.js.map