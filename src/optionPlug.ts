import * as plug from '@line100/plug';
import * as inquirer from 'inquirer';
import { Command } from 'commander';

export interface IOptionConfig {
	/** command option flag `-p, --pepper`. */
	flags: string,
	/** command option attribute. */
	selector: string,
	/** command description. */
	description: string,
	/** default value while input omit */
	defaultValue?: any,
	/** convert input string to */
	convertion?: (input: string | undefined) => any,
}

export const OptionOfPlug = (flags: string, selector: string, description: string, convertion?: (input: string | undefined) => any, defaultValue?: any) => {
	return OptionPlug({ flags, selector, description, defaultValue, convertion })
}

/**
 * - option string `-p, --pepper`
 * 
 * [config plug]
 */
export const OptionPlug = (config: IOptionConfig) => function (this: Command, handler: plug.THandler) {

	let { flags, selector, description, convertion } = config;
	this.option(flags, description)

	return async (parsed: any) => {

		let opts = this.opts();
		let v = parsed.config?.(selector) ?? opts[selector];

		if (!v) {
			let { input } = await inquirer.prompt({
				name: 'input',
				type: 'input',
				message: description,
				default: config.defaultValue,
			})
			parsed.alias && (input = parsed.alias(input));
			parsed[selector] = convertion?.(input) ?? input;
		}
		else {
			parsed[selector] = convertion?.(v) ?? v;
		}

		return handler(parsed);
	}
}
