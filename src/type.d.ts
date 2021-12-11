
import { ExtensionContext } from 'vscode';
declare global {
    interface PluginOptions {
        context:ExtensionContext,
        setting:config,
    }
	interface Option {
        context:ExtensionContext
	}
    interface textViewOption{

    }
    interface config{
        autoTips:boolean,
        interval:number
    }
}


