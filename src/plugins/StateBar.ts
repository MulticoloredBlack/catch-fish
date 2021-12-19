
import * as vscode from 'vscode';
import { getMessage } from '@/utils';
let myStatusBarItem: vscode.StatusBarItem;
let calculatedTime: number;

const defaultMessage = '你已经连续工作好久了，请起来休息一下！！！';
interface PluginSettings {
  cancelButtonText: string,
  confirmButtonText: string
  message: string
}
class StateBar {
  timer?: NodeJS.Timeout;
  $option: PluginOptions;
  passedTimes: number;
  panelShow: boolean;
  totalTime: number;
  settings: PluginSettings;
  // 开始计时标志，文档内容改变时(window.workplace.onDidChangeTextDocument), 开始下一次计时
  startFlag: boolean;

  constructor(option: PluginOptions) {
    this.timer;
    this.$option = { setting: option.setting, context: option.context };
    this.passedTimes = 0;
    this.panelShow = false;
    this.startFlag = true;
    this.totalTime = 0;
    this.settings = {
      cancelButtonText: '下次一定',
      confirmButtonText: '好的',
      message: defaultMessage
    };

    this._init();
  }
  private _init() {
    this._createStateBar();
  }
  public changeOptions(option: Config) {
    this.$option.setting = option;
  }
  private _createStateBar() {
    this.showStatusBar();
    this.timer = setInterval(() => {
      this.setStatusBarText(this.totalTime);
      if (this.startFlag) {
        this.updateStatusBarItem();
        this.totalTime += 5;
      }
    }, 5000);
  }
  showStatusBar() {
    const subscriptions = this.$option.context.subscriptions;
    myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    subscriptions.push(myStatusBarItem);
    myStatusBarItem.show();
  }
  setStatusBarText(time: number) {
    myStatusBarItem.text = getMessage(true, time);
  }
  updateStatusBarItem() {
    calculatedTime = (this.passedTimes + 1) * this.$option.setting.interval;
    if (this.totalTime >= calculatedTime && this.panelShow === false) {
      this.panelShow = true;

      // 是否点击 "下次一定" 按钮
      if (this.passedTimes > 0) {
        this.settings.message = getMessage(false, calculatedTime) + ', 请起来休息一下！！！';
      } else {
        this.settings.message = defaultMessage;
      }

      vscode.window.showInformationMessage(
        this.settings.message,
        this.settings.confirmButtonText,
        this.settings.cancelButtonText
      ).then(result => {
        //  点击弹窗的 "x" 或者 "下次一定" 按钮时，记录操作次数
        if (result === this.settings.cancelButtonText || !result) {
          this.passedTimes += 1;
        } else if (result === this.settings.confirmButtonText) {
          // 点击 "好的" 按钮时，重置状态
          this.passedTimes = 0;
          this.totalTime = 0;
          this.startFlag = false;
          this.setStatusBarText(0);
          
          // 监听文档改变事件，开始下一次计时
          const subscription = vscode.workspace.onDidChangeTextDocument(() => {
            this.startFlag = true;
            calculatedTime = 0;
            // 取消侦听
            subscription.dispose();
          });
        }

        this.panelShow = false;
      });
    }
  }
}
export default {
  install: (option: PluginOptions) => {
    return new StateBar(option);
  }
};