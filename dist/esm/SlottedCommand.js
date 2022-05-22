import { __awaiter } from "tslib";
import * as plug from '@line100/plug';
import { Command } from 'commander';
/**
 * SlottedCommand
 */
export class SlottedCommand extends Command {
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
        super.action((...args) => __awaiter(this, void 0, void 0, function* () {
            let parsed = this._pluginHandler ? yield this._pluginHandler({}) : {};
            return handler.bind(this)(parsed, ...args);
        }));
        return this;
    }
}
