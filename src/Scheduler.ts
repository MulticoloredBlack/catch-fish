interface  PluginsInstall{
    install:InstallOptions
}

interface InstallOptions {
    (option:PluginOptions): PluginInstance;
}

interface PluginInstance {
   changeOptions:changeOptions,

}
interface changeOptions {
    (option:config):void
}
import setting from './setting';
import * as vscode from 'vscode';
import StateBar from './plugins/StateBar';

export default class Scheduler {
    $option: Option;
    setting:config;
    pluginList:PluginInstance[];
    constructor(prop: Option) {
        this.$option = { ...prop };
        this.setting = setting
        this.pluginList = []
        this._init();
    }
    public use(pluginsInstall:PluginsInstall):void {
       let instance:PluginInstance = pluginsInstall.install({setting,context:this.$option.context})
       this.pluginList.push(instance)
    }
    public changeOptions(option: config) {
        this.setting = option;
        this.pluginList.forEach(instance=>{
            instance.changeOptions(option)
        })
    }  
    _init() {
        console.log(111111)
        const subscriptions  = this.$option.context.subscriptions
        subscriptions.push(vscode.workspace.onDidChangeConfiguration(() => {
            console.log(setting)
        }));
        this.use(StateBar)
    }
    destroy() {
    }
}