// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
// this method is called when your extension is activated
import Scheduler from './Scheduler';
let instance:Scheduler;

export async function activate(context: vscode.ExtensionContext) {
        const option = {
            context,
        };
        instance = new Scheduler(option);
		vscode.window.showInformationMessage('catch-fish成功启用');
	}


// this method is called when your extension is deactivated
export function deactivate() {
    
}
