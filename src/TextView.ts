import * as vscode from 'vscode';

export class ReminderView {
    private static panel: vscode.WebviewPanel | undefined;

    public static show(context: vscode.ExtensionContext, content: string | textViewOption) {
        const title = "自动提交完成";
        if (this.panel) {
            this.panel.webview.html = this.generateHtml(title, content);
            this.panel.reveal();
        } else {
            this.panel = vscode.window.createWebviewPanel("git-auto-commit", "自动提交提示", vscode.ViewColumn.Two, {
                enableScripts: true,
                retainContextWhenHidden: true,
            });
            this.panel.webview.html = this.generateHtml(title, content);
            this.panel.onDidDispose(() => {
                this.panel = undefined;
            });
        }
    }
    protected static generateHtml(title: string, content: string | textViewOption) {
        return '';
    }
}