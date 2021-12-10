
import * as vscode from 'vscode';


function getConfig<T = any>(key: string) {
	return vscode.workspace.getConfiguration().get<T>(`catch-fish.${key}`);
}

export default {
    interval:getConfig<Number>('interval')!,
    autoTips:getConfig<Boolean>('autoTips')
};