"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FolderExistsError extends Error {
    constructor() {
        super('This folder already exists');
        this.code = 403;
    }
}
exports.default = FolderExistsError;
//# sourceMappingURL=FolderExistsError.js.map