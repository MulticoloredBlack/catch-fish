
import { ExtensionContext } from 'vscode';
declare global {
	interface Option {
        context:ExtensionContext
	}
    interface textViewOption{

    }
    interface config{
        autoTips:Boolean,
        interval:number
    }
}


