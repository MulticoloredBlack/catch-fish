
import { ExtensionContext } from 'vscode';
declare global {

  interface PluginOptions {
    context: ExtensionContext,
    setting: Config,
  }
  interface Option {
    context: ExtensionContext
  }
  interface Config {
    autoTips: boolean,
    interval: number,
  }
  interface PluginsInstall {
  install: InstallOptions
  }

  interface InstallOptions {
  (option: PluginOptions): PluginInstance;
  }

  interface PluginInstance {
  changeOptions: ChangeOptions,
  destroy: DestroyOption
  }
  interface ChangeOptions {
  (option: Config): void
  }
  interface  DestroyOption {
  (): void
  }
}


