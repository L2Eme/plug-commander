"use strict";
/// 该模块可以独立放在plug-cli或者plug-commander中
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigPlug = void 0;
const tslib_1 = require("tslib");
const fs_1 = (0, tslib_1.__importDefault)(require("fs"));
const commander_1 = require("commander");
const assert_1 = (0, tslib_1.__importDefault)(require("assert"));
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
const ConfigPlug = (defaultConfigName) => function (handler) {
    // 在plug构建过程中，添加option --salt
    this.addOption(new commander_1.Option('--config <config_name>', `config file name, or NUT_CONFIG, or (hard-coded: ${defaultConfigName}).`)
        .env('NUT_CONFIG')
        .default(defaultConfigName));
    return (parsed) => {
        // 此处是在执行过程中，所以直接使用this上的变量
        let opts = this.opts();
        let configName = opts.config;
        (0, assert_1.default)(configName, 'assert get configFileName from option or env or hard coded true.');
        if (fs_1.default.existsSync(configName)) {
            console.log(`=> read config file ${configName}`);
            let { params, alias } = JSON.parse(fs_1.default.readFileSync(configName).toString());
            (0, assert_1.default)(typeof params === 'object', 'config file params as 1 layer object.');
            (0, assert_1.default)(typeof alias === 'object', 'config file alias as 1 layer object.');
            parsed.config = (attr) => {
                var _a, _b;
                let v = (_a = opts[attr]) !== null && _a !== void 0 ? _a : params[attr];
                return (_b = alias[v]) !== null && _b !== void 0 ? _b : v;
            };
            parsed.alias = (v) => {
                var _a;
                return (_a = alias[v]) !== null && _a !== void 0 ? _a : v;
            };
        }
        else {
            console.log('no config file.');
            parsed.config = (v) => opts[v];
        }
        return handler(parsed);
    };
};
exports.ConfigPlug = ConfigPlug;
