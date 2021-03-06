
import setting from './setting';
import * as vscode from 'vscode';
import StateBar from './plugins/StateBar';
import HolidayRemain from './plugins/HolidayRemain';
export default class Scheduler {
  $option: Option;
  setting: Config;
  pluginList: PluginInstance[];
  constructor(prop: Option) {
    this.$option = { ...prop };
    this.setting = setting;
    this.pluginList = [];
    this._init();
  }
  public use(pluginsInstall: PluginsInstall): void {
    const instance: PluginInstance = pluginsInstall.install({ setting, context: this.$option.context });
    this.pluginList.push(instance);
  }
  public changeOptions(option: Config): void {
    this.setting = option;
    this.pluginList.forEach(instance => {
      instance.changeOptions(option);
    });
  }
  private _init() {
    const subscriptions = this.$option.context.subscriptions;
    subscriptions.push(vscode.workspace.onDidChangeConfiguration(() => {
      this.changeOptions(setting);
    }));
    this.use(HolidayRemain);
    this.use(StateBar);
  }
  destroy(): void {
    this.pluginList.forEach(el=>{
      el.destroy();
    });
  }
}