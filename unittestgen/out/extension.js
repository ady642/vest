"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const UnitTestFactory_1 = require("./templates/UnitTestFactory");
const fs = require("fs");
const utils_1 = require("./utils");
function activate(context) {
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('unittestgen.generateTestSuites', async () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        const path = vscode?.window?.activeTextEditor?.document.fileName ?? '';
        const data = fs.readFileSync(path, 'utf8');
        const unitTestFactory = new UnitTestFactory_1.default(path, data);
        const testPath = path.replace('src', 'tests/unit/src').replace('.vue', '.spec.ts');
        fs.writeFile(testPath, unitTestFactory.test, function (err) {
            if (err) {
                console.error(err);
            }
            console.log("test je suis la");
            vscode.window.showInformationMessage(`Unit test generated for ${(0, utils_1.getFileName)(path)}`, 'Open test')
                .then(() => {
                console.log("test je suis la");
                vscode.workspace.openTextDocument(testPath).then(doc => {
                    vscode.window.showTextDocument(doc);
                });
            });
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map