import * as plug from '@line100/plug';
import { Command } from 'commander';

export * from 'commander';

/**
 * SlottedCommand
 */
export class SlottedCommand extends Command {

	private _pluginHandler?: any

	/** 此处需要重载，替换command的返回类型 */
	createCommand(name?: string): SlottedCommand {
		return new SlottedCommand(name)
	}

	/**
	 * set plug
	 * @param plugs 
	 */
	setPlugs(...plugs: plug.TPlug<Command>[]) {
		this._pluginHandler = plug.createHandler(this, plugs);
		return this
	}

	/** 
	 * add action handler with plug,
	 * only support async function.
	 * @override
	 */
	action(handler: (parsed: any, ...args: any[]) => any) {
		super.action(async (...args) => {
			let parsed = this._pluginHandler ? await this._pluginHandler({}) : {};
			return handler.bind(this)(parsed, ...args)
		})
		return this
	}

}