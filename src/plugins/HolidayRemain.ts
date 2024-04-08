
import { getHolidayRemain } from '../api/request';
import * as vscode from 'vscode';
import { getNextHoliday, nextHolidayMessage } from '@/utils';
interface PluginSettings {
  cancelButtonText: string,
  confirmButtonText: string
  message: string
}
implements
class HolidayRemain {
  $option: PluginOptions;
  settings: PluginSettings;

  constructor(option: PluginOptions){
    this.$option = option; 
    this.settings = {
      cancelButtonText: '取消',
      confirmButtonText: '查看放假通知',
      message: '',
    };
    this._init();
  }
  _init(){
    this.showHolidayRemain();
  }
  async showHolidayRemain(){
    try {
      const subscriptions = this.$option.context.subscriptions;
      const response = await getHolidayRemain(new Date().getFullYear());
      const { days } = response.data;
      const nextHoliday =  getNextHoliday(days);
      const nextHolidayWorkDay = days.filter(el=>el.name === nextHoliday?.name && !el.isOffDay);
      const nextHolidayResetDay = days.filter(el=>el.name === nextHoliday?.name && el.isOffDay);
      this.settings.message = `根据节假日放假安排,${nextHoliday?.name}为${nextHolidayResetDay[0].date}放假，共${nextHolidayResetDay.length}天。${nextHolidayWorkDay.length>0 ? `${nextHolidayWorkDay.map(el=>el.date).join(',')}上班`:''}`;
      const holidayRemainBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
      holidayRemainBar.text = nextHolidayMessage(nextHoliday);
      holidayRemainBar.tooltip = "点击查看放假详情";
      holidayRemainBar.command = "catch-fish.RemainStatusClick"; 
      holidayRemainBar.show();
      subscriptions.push(holidayRemainBar);
      this.registerCommand(vscode.Uri.parse(response.data.papers[0]));
    } catch (e){
      console.error(e);
    }
  }
  
  public changeOptions(option: Config) {
    this.$option.setting = option;
  }
  public registerCommand(url: vscode.Uri){
    const subscriptions = this.$option.context.subscriptions;
    subscriptions.push(vscode.commands.registerCommand("catch-fish.RemainStatusClick", () => {
      vscode.window.showInformationMessage(
        this.settings.message,
        this.settings.confirmButtonText,
        this.settings.cancelButtonText,
      ).then(result => {
        if (result === this.settings.confirmButtonText) {
          vscode.env.openExternal(url);
        }
      });
    }));
  }

  destroy(){

  }
}
export default {
  install: (option: PluginOptions): HolidayRemain => {
    return new HolidayRemain(option);
  }
};