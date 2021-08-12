import * as vscode from 'vscode';
import SimpleProjects from './SimpleProjects';

export function activate(context: vscode.ExtensionContext) {
  new SimpleProjects(context);
}

export function deactivate() {}
