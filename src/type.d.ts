
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
}


