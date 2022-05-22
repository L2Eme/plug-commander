import { __awaiter } from "tslib";
import * as inquirer from 'inquirer';
export const OptionOfPlug = (flags, selector, description, convertion, defaultValue) => {
    return OptionPlug({ flags, selector, description, defaultValue, convertion });
};
/**
 * - option string `-p, --pepper`
 *
 * [config plug]
 */
export const OptionPlug = (config) => function (handler) {
    let { flags, selector, description, convertion } = config;
    this.option(flags, description);
    return (parsed) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        let opts = this.opts();
        let v = (_b = (_a = parsed.config) === null || _a === void 0 ? void 0 : _a.call(parsed, selector)) !== null && _b !== void 0 ? _b : opts[selector];
        if (!v) {
            let { input } = yield inquirer.prompt({
                name: 'input',
                type: 'input',
                message: description,
                default: config.defaultValue,
            });
            parsed.alias && (input = parsed.alias(input));
            parsed[selector] = (_c = convertion === null || convertion === void 0 ? void 0 : convertion(input)) !== null && _c !== void 0 ? _c : input;
        }
        else {
            parsed[selector] = (_d = convertion === null || convertion === void 0 ? void 0 : convertion(v)) !== null && _d !== void 0 ? _d : v;
        }
        return handler(parsed);
    });
};
