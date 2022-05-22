import * as plug from '@line100/plug';
import { Command } from 'commander';
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
export declare const ConfigPlug: (defaultConfigName: string) => (this: Command, handler: plug.THandler) => (parsed: any) => any;
