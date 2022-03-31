"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Properties {
    constructor(properties) {
        this.syncStatus = properties.syncStatus;
        this.hasSubscribedToVault =
            properties.HasSubscribedToVault !== undefined ||
                properties.ENDO !== undefined;
    }
}
exports.default = Properties;
//# sourceMappingURL=Properties.js.map