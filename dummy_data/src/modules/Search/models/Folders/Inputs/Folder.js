"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const useArrayHelpers_1 = require("@/Common/hooks/useArrayHelpers");
const { sortArrayByAlphabeticalOrder } = (0, useArrayHelpers_1.default)();
class Folder {
    constructor(category) {
        this.id = category.id;
        this.name = category.name;
        this.parentId = category.parent?.id;
        this.children =
            category.children?.length > 0
                ? sortArrayByAlphabeticalOrder(category.children?.map((c) => new Folder(c)), 'name')
                : [];
        this.properties = category.properties;
        this.permissions = category.permissions;
    }
    getCategory() {
        return {
            id: this.id ? this.id : 0,
            name: this.name,
            parent: {
                id: this.parentId ? this.parentId : 0
            },
            children: this.children.map((c) => c.getCategory()),
            properties: this.properties,
            permissions: this.permissions
        };
    }
    hasChildrenByName(folderName) {
        return this.children.some((child) => child.name.toUpperCase() === folderName.toUpperCase());
    }
    setChildren(children) {
        this.children = children;
    }
}
exports.default = Folder;
//# sourceMappingURL=Folder.js.map