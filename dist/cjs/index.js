"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlottedCommand = void 0;
const tslib_1 = require("tslib");
const plug = (0, tslib_1.__importStar)(require("@line100/plug"));
const commander_1 = require("commander");
/**
 * SlottedCommand
 */
class SlottedCommand extends commander_1.Command {
    /** 此处需要重载，替换command的返回类型 */
    createCommand(name) {
        return new SlottedCommand(name);
    }
    /**
     * set plug
     * @param plugs
     */
    setPlugs(...plugs) {
        this._pluginHandler = plug.createHandler(this, plugs);
        return this;
    }
    /**
     * add action handler with plug,
     * only support async function.
     * @override
     */
    action(handler) {
        super.action((...args) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            let parsed = this._pluginHandler ? yield this._pluginHandler({}) : {};
            return handler.bind(this)(parsed, ...args);
        }));
        return this;
    }
}
exports.SlottedCommand = SlottedCommand;
