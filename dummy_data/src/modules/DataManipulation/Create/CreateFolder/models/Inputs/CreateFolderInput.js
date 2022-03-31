"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateFolderInput {
    constructor(parentId, name) {
        this.parentId = parentId;
        this.name = name;
    }
    transformForAPI() {
        return {
            parentId: this.parentId,
            name: this.name.trim()
        };
    }
}
exports.default = CreateFolderInput;
//# sourceMappingURL=CreateFolderInput.js.map