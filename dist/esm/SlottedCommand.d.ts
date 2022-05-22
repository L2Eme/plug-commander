import * as plug from '@line100/plug';
import { Command } from 'commander';
/**
 * SlottedCommand
 */
export declare class SlottedCommand extends Command {
    private _pluginHandler?;
    /** 此处需要重载，替换command的返回类型 */
    createCommand(name?: string): SlottedCommand;
    /**
     * set plug
     * @param plugs
     */
    setPlugs(...plugs: plug.TPlug<Command>[]): this;
    /**
     * add action handler with plug,
     * only support async function.
     * @override
     */
    action(handler: (parsed: any, ...args: any[]) => any): this;
}
