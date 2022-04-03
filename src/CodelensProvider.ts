import * as vscode from 'vscode';

/**
 * CodelensProvider
 */
export class CodelensProvider implements vscode.CodeLensProvider {

    private codeLenses: vscode.CodeLens[] = [];
    private regex: RegExp;
    private _onDidChangeCodeLenses: vscode.EventEmitter<void> = new vscode.EventEmitter<void>();
    public readonly onDidChangeCodeLenses: vscode.Event<void> = this._onDidChangeCodeLenses.event;

    constructor() {
        this.regex = /(.+)/g;

        vscode.workspace.onDidChangeConfiguration((_) => {
            this._onDidChangeCodeLenses.fire();
        });
    }

    public provideCodeLenses(document: vscode.TextDocument, token: vscode.CancellationToken): vscode.CodeLens[] | Thenable<vscode.CodeLens[]> {

        if (vscode.workspace.getConfiguration("unittestgen").get("enableCodeLens", true)) {
            this.codeLenses = [];
            const regex = new RegExp(this.regex);
            const text = document.getText();
            const line = document.lineAt(document.positionAt(0).line);

            return this.codeLenses;
        }
        return [];
    }

    public resolveCodeLens(codeLens: vscode.CodeLens, token: vscode.CancellationToken) {
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