"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const UnitTestFactory_1 = require("./templates/UnitTestFactory");
const fs = require("fs");
const utils_1 = require("./utils");
function activate(context) {
    let disposable = vscode.commands.registerCommand('unittestgen.generateTestSuites', async () => {
        const path = vscode?.window?.activeTextEditor?.document.fileName ?? '';
        const data = fs.readFileSync(path, 'utf8');
        const unitTestFactory = new UnitTestFactory_1.default(path, data);
        const testPath = path.replace('.vue', '.spec.ts');
        const pathWithoutFileName = (0, utils_1.getPath)(testPath);
        if (!fs.existsSync(pathWithoutFileName)) {
            fs.mkdirSync(pathWithoutFileName, { recursive: true });
        }
        fs.writeFile(testPath, unitTestFactory.test, function (err) {
            if (err) {
                console.error(err);
            }
            vscode.window.showInformationMessage(`Unit test generated for ${(0, utils_1.getFileName)(path)}`, 'Open test')
                .then(() => {
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