interface PluginsInstall {
  install: InstallOptions
}

interface InstallOptions {
  (option: PluginOptions): PluginInstance;
}

interface PluginInstance {
  changeOptions: ChangeOptions,

}
interface ChangeOptions {
  (option: Config): void
}
import setting from './setting';
import * as vscode from 'vscode';
import StateBar from './plugins/StateBar';

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
  public changeOptions(option: Config) {
    this.setting = option;
    this.pluginList.forEach(instance => {
      instance.changeOptions(option);
    });
  }
  private _init() {
    const subscriptions = this.$option.context.subscriptions;
    subscriptions.push(vscode.workspace.onDidChangeConfiguration(() => {
      console.log(setting);
    }));
    this.use(StateBar);
  }
  destroy() {}
}