import * as vscode from 'vscode';
import UnitTestFactory from "./templates/UnitTestFactory";
import * as fs from 'fs';
import { getFileName, getPath } from './utils';

export function activate(context: vscode.ExtensionContext) {
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('unittestgen.generateTestSuites', async () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		const path = vscode?.window?.activeTextEditor?.document.fileName ?? '';
		
		const data = fs.readFileSync(path, 'utf8');
	
		const unitTestFactory = new UnitTestFactory(path, data);
		const testPath = path.replace('src', 'tests/unit/src').replace('.vue', '.spec.ts');

		const pathWithoutFileName = getPath(testPath);
		
		if (!fs.existsSync(pathWithoutFileName)){
			fs.mkdirSync(pathWithoutFileName, { recursive: true });
		}

		fs.writeFile(testPath, unitTestFactory.test, function (err) {
			if (err) { console.error(err); }

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
