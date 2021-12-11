
import * as vscode from 'vscode';
let myStatusBarItem: vscode.StatusBarItem;
let totalTime = 0;
let panelShow = false;
let setTingInterval = 0;

class StateBar {
    time?: NodeJS.Timeout;
    $option: PluginOptions
    constructor(option: PluginOptions) {
        this.time
        this.$option = { ...option }
        this._init()
        setTingInterval = this.$option.setting.interval
    }
    private _init() {
        this._createStateBar()
    } 
    public changeOptions(option: config) {
        this.$option.setting = option;
    }  
    private _createStateBar() {
        const subscriptions = this.$option.context.subscriptions;
        this.time = setInterval(() => {
            totalTime += 5;
            this.updateStatusBarItem();
        }, 5000);
        myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
        subscriptions.push(myStatusBarItem);
    }
    updateStatusBarItem() {
        const hour = Math.floor(totalTime / 3600), min = Math.floor(totalTime / 60);
        myStatusBarItem.text = `$(megaphone) 你已经连续工作了${hour}小时${min}分钟了`;
        myStatusBarItem.show();
        if (totalTime >= this.$option.setting.interval) {
            // 如果展开过就不再处理，必须在点击了之后才重新弹
            // if (panelShow === false) {
                panelShow = true;
                vscode.window.showInformationMessage('你已经连续工作好久了，起来休息一下！！', '好的', '下次一定').then(result => {
                    if (result === '好的') {    
                        totalTime = 0
                        panelShow = false;
                    } else {
                        panelShow = false;
                    }
                });
            // }
        }
    }
}
export default {
    install: (option: PluginOptions) => {
      return  new StateBar(option)
    }
}