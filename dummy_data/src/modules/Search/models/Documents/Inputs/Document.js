"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LifeCycleStatus = void 0;
const Properties_1 = require("@/modules/Search/models/Documents/Inputs/Properties");
var LifeCycleStatus;
(function (LifeCycleStatus) {
    LifeCycleStatus[LifeCycleStatus["New"] = 1] = "New";
    LifeCycleStatus[LifeCycleStatus["Transmitted"] = 2] = "Transmitted";
    LifeCycleStatus[LifeCycleStatus["Validated"] = 3] = "Validated";
    LifeCycleStatus[LifeCycleStatus["Rejected"] = 4] = "Rejected";
    LifeCycleStatus[LifeCycleStatus["Double"] = 5] = "Double";
    LifeCycleStatus[LifeCycleStatus["PreparedPIA"] = 6] = "PreparedPIA";
    LifeCycleStatus[LifeCycleStatus["Treated"] = 7] = "Treated";
    LifeCycleStatus[LifeCycleStatus["NotTreated"] = 8] = "NotTreated";
})(LifeCycleStatus = exports.LifeCycleStatus || (exports.LifeCycleStatus = {}));
class Document {
    constructor({ id = null, name = '', type = '', created = '', createdBy = '', updated = '', folder = { id: 0, path: [] }, properties = {
        syncStatus: '',
        restaurationStatus: ''
    }, size = 0, comments = '', preview = { href: '' }, lifecycleStatus } = {}) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.creationDate = created;
        this.createdBy = createdBy;
        this.updatedDate = updated;
        this.path = Array.isArray(folder.path) ? folder.path : [folder.path];
        this.properties = new Properties_1.default(properties);
        this.preview = preview.href;
        this.folderId = folder.id;
        this.restorationStatus = '';
        this.size = size;
        this.comments = comments;
        this.lifecycleStatus = lifecycleStatus;
    }
    get isTreated() {
        return this?.lifecycleStatus === LifeCycleStatus.Treated;
    }
    get isNew() {
        return this?.lifecycleStatus === LifeCycleStatus.New;
    }
    get isSync() {
        return Boolean(this.properties) && Boolean(this.properties.syncStatus);
    }
}
exports.default = Document;
//# sourceMappingURL=Document.js.map