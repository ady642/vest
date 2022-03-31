"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyify = void 0;
const keyify = (obj, prefix = '') => {
    return Object.keys(obj).reduce((acc, key) => {
        if (typeof obj[key] === 'object') {
            return [...acc, ...keyify(obj[key], `${prefix}${key}.`)];
        }
        return [...acc, `${prefix}${key}`];
    }, []);
};
exports.keyify = keyify;
//# sourceMappingURL=objectHelper.js.map