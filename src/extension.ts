'use strict';
import * as vscode from 'vscode';

export  function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('debugcommand.launch', (configName) => {
        vscode.window.showInformationMessage(`Launching ${configName} debug session`);
        if (vscode.workspace.workspaceFolders) {
            let folder = vscode.workspace.workspaceFolders[0];
            vscode.debug.startDebugging(folder, configName);
        }
    });

    context.subscriptions.push(disposable);

    let disposable3 = vscode.commands.registerCommand('debugcommand.quickPick', async (tasks: string) => {
        let arrTasks = tasks.split(";");
        let label = await vscode.window.showQuickPick(arrTasks);
        let theTasks = await vscode.tasks.fetchTasks();
        let task = theTasks.find(p => p.name === label);
        if (task) {
            vscode.tasks.executeTask(task);
        }
    });
    context.subscriptions.push(disposable3);
}

export function deactivate() { }