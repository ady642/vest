"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodelensProvider = void 0;
const vscode = require("vscode");
/**
 * CodelensProvider
 */
class CodelensProvider {
    constructor() {
        this.codeLenses = [];
        this._onDidChangeCodeLenses = new vscode.EventEmitter();
        this.onDidChangeCodeLenses = this._onDidChangeCodeLenses.event;
        this.regex = /(.+)/g;
        vscode.workspace.onDidChangeConfiguration((_) => {
            this._onDidChangeCodeLenses.fire();
        });
    }
    provideCodeLenses(document, token) {
        if (vscode.workspace.getConfiguration("unittestgen").get("enableCodeLens", true)) {
            this.codeLenses = [];
            const regex = new RegExp(this.regex);
            const text = document.getText();
            const line = document.lineAt(document.positionAt(0).line);
            return this.codeLenses;
        }
        return [];
    }
    resolveCodeLens(codeLens, token) {
        if (vscode.workspace.getConfiguration("unittestgen").get("enableCodeLens", true)) {
            codeLens.command = {
                title: "Generate unit test suite",
                tooltip: "Automatic generation unit test",
                command: "unittestgen.generateTestSuites",
            };
            return codeLens;
        }
        return null;
    }
}
exports.CodelensProvider = CodelensProvider;
//# sourceMappingURL=CodelensProvider.js.map