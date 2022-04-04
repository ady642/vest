import * as vscode from 'vscode';
import UnitTestFactory from "./templates/UnitTestFactory";
import * as fs from 'fs';
import { buildEsLintCommand, getFileName, getPath } from './utils';
import { exec as executeTerminalCommand } from 'child_process';
import { CodelensProvider } from './CodelensProvider';

export function activate(context: vscode.ExtensionContext) {
    const codelensProvider = new CodelensProvider();

    vscode.languages.registerCodeLensProvider("*", codelensProvider);

    let disposable = vscode.commands.registerCommand('vest.generateTestSuites', async () => {
        const path = vscode?.window?.activeTextEditor?.document.fileName ?? '';

        const data = fs.readFileSync(path, 'utf8');

        const unitTestFactory = new UnitTestFactory(path, data);
        const testPath = path.replace('.vue', '.spec.ts');

        const pathWithoutFileName = getPath(testPath);

        if (!fs.existsSync(pathWithoutFileName)){
            fs.mkdirSync(pathWithoutFileName, { recursive: true });
        }

        fs.writeFile(testPath, unitTestFactory.test, function (err) {
            if (err) { console.error(err); }

            executeTerminalCommand(buildEsLintCommand(testPath), () => {
                if (err) {
                    console.log('error: ' + err);
                }
            });

            vscode.window.showInformationMessage(`Unit test generated for ${getFileName(path)}`, 'Open test')
                .then(() => {
                    vscode.workspace.openTextDocument(testPath).then(doc => {
                        vscode.window.showTextDocument(doc);
                    });
                });
		  });

    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
