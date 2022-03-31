"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const useVModel = (props, name = 'modelValue') => {
    const instance = (0, vue_1.getCurrentInstance)();
    if (!instance) {
        throw new Error('useVModel must be called from the setup or lifecycle hook methods.');
    }
    return (0, vue_1.computed)({
        get: () => props[name],
        set: (value) => {
            instance.emit(`update:${name}`, value);
        }
    });
};
exports.default = useVModel;
//# sourceMappingURL=index.js.map