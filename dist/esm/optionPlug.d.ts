import * as plug from '@line100/plug';
import { Command } from 'commander';
export interface IOptionConfig {
    /** command option flag `-p, --pepper`. */
    flags: string;
    /** command option attribute. */
    selector: string;
    /** command description. */
    description: string;
    /** default value while input omit */
    defaultValue?: any;
    /** convert input string to */
    convertion?: (input: string | undefined) => any;
}
export declare const OptionOfPlug: (flags: string, selector: string, description: string, convertion?: ((input: string | undefined) => any) | undefined, defaultValue?: any) => (this: Command, handler: plug.THandler) => (parsed: any) => Promise<any>;
/**
 * - option string `-p, --pepper`
 *
 * [config plug]
 */
export declare const OptionPlug: (config: IOptionConfig) => (this: Command, handler: plug.THandler) => (parsed: any) => Promise<any>;
