let timer: NodeJS.Timeout;
let totalTime = 0;
let panelShow = false;
import setting from './setting';
import * as vscode from 'vscode';
/**
 * @
 */
let myStatusBarItem: vscode.StatusBarItem;

function updateStatusBarItem(): void {
    const hour = Math.floor(totalTime / 3600), min = Math.floor(totalTime / 60);
    myStatusBarItem.text = `$(megaphone) 你已经连续工作了${hour}小时${min}分钟了`;
    myStatusBarItem.show();
    if (totalTime >= setting.interval) {
        // 如果展开过就不再处理，必须在点击了之后才重新弹
        if (panelShow === false) {
            panelShow = true;
            vscode.window.showInformationMessage('你已经连续工作好久了，起来休息一下！！', '好的', '下次一定').then(result => {
                if (result === '好的') {
                    
                    panelShow = false;
                }else{
                    panelShow = false;
                }
            });
        }
    }
}
export default class Scheduler {
    $option: Option;
    constructor(prop: Option) {
        this.$option = { ...prop };
        this._init();
    }
    _createStateBar() {
        const subscriptions = this.$option.context.subscriptions;
        timer = setInterval(() => {
            totalTime += 1;
            updateStatusBarItem();
        }, 5000);
        myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
        subscriptions.push(myStatusBarItem);
    }
    _init() {
        this._createStateBar();
    }
    destroy() {
        clearTimeout(timer);
    }
}