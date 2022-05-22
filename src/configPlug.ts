/// 该模块可以独立放在plug-cli或者plug-commander中

import * as plug from '@line100/plug';
import fs from 'fs';
import { Command, Option } from 'commander';
import assert from 'assert';

export interface ParsedConfig {
	config: (attr: string) => string,
	alias: (v: string) => string,
}

/**
 * parse --config config_file_name
 * 
 * ### usage
 * ```ts
 * // 在程序中指定默认值
 * ConfigPlug('.config.core.json')
 * ```
 * 
 * ### config设置的优先级顺序
 * * `cli param > env NUT_CONFIG > hard-coded`
 * 
 * ### 注意
 * * --param会覆盖config
 * * command.addOption(..env()...default())会覆盖config
 * * 只有--param和config中的value会使用alias替换
 */
export const ConfigPlug = (defaultConfigName: string) => function (this: Command, handler: plug.THandler) {

	// 在plug构建过程中，添加option --salt
	this.addOption(
		new Option('--config <config_name>', `config file name, or NUT_CONFIG, or (hard-coded: ${defaultConfigName}).`)
			.env('NUT_CONFIG')
			.default(defaultConfigName)
	)

	return (parsed: ParsedConfig) => {

		// 此处是在执行过程中，所以直接使用this上的变量
		let opts = this.opts();
		let configName = opts.config;
		assert(configName, 'assert get configFileName from option or env or hard coded true.')

		if (fs.existsSync(configName)) {
			console.log(`=> read config file ${configName}`)
			let { params, alias } = JSON.parse(fs.readFileSync(configName).toString());
			assert(typeof params === 'object', 'config file params as 1 layer object.')
			assert(typeof alias === 'object', 'config file alias as 1 layer object.')

			parsed.config = (attr: string) => {
				let v = opts[attr] ?? params[attr];
				return alias[v] ?? v;
			};
			parsed.alias = (v: string) => {
				return alias[v] ?? v;
			}
		}
		else {
			console.log('no config file.')
			parsed.config = (v: string) => opts[v];
		}

		return handler(parsed);
	}
}