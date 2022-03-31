"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTranslation = void 0;
const mypulse_shared_dependencies_1 = require("@kpmg/mypulse-shared-dependencies");
function useTranslation() {
    const t = (...params) => mypulse_shared_dependencies_1.i18n.global.t(...params);
    const tc = (...params) => mypulse_shared_dependencies_1.i18n.global.tc(...params);
    return {
        t,
        tc
    };
}
exports.useTranslation = useTranslation;
//# sourceMappingURL=useTranslation.js.map