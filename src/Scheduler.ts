let timer: NodeJS.Timeout;
import * as vscode from 'vscode';

export default class Scheduler {
    $option: Option;
    constructor(prop: Option) {
        this.$option = { ...prop };
    }
    destroy() {
        clearTimeout(timer);
    }
}