
import * as vscode from 'vscode';
const fs = require('fs');
import { exec } from 'child_process';
export function getNow() {
	let dateTime;
	let yy = new Date().getFullYear();
	let mm = new Date().getMonth() + 1;
	let dd = new Date().getDate();
	let hh = new Date().getHours();
	let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes()
		:
		new Date().getMinutes();
	let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds()
		:
		new Date().getSeconds();
	dateTime = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss;
	return dateTime;
}
