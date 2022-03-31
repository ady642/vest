"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasFolderSelected = void 0;
const hasFolderSelected = (to, from, next) => {
    if (to?.query?.folderId) {
        next();
    }
    else {
        next({ name: 'MainView' });
    }
};
exports.hasFolderSelected = hasFolderSelected;
//# sourceMappingURL=guards.js.map