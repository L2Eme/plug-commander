import { __awaiter } from "tslib";
import * as inquirer from 'inquirer';
import fs from 'fs';
/**
 * cli param
 * - parse --output
 * - parse --output-ascii
 * - parse --output-cli
 *
 * return
 * - parsed.output as (buf) => void
 */
export const OutputPlug = (config) => function (handler) {
    let { overwrite = false, extensionName = '', } = config;
    // 在plug构建过程中，添加option --salt
    this
        .option('--output <out_put_file>', `output file name. with extension ${extensionName}`)
        .option('--output-ascii', 'output file encoding with base64')
        .option('--output-cli', 'output to console interface.', false);
    return (parsed) => __awaiter(this, void 0, void 0, function* () {
        // 此处是在执行过程中，所以直接使用this上的变量
        let opts = this.opts();
        let isAscii = !!opts.outputAscii;
        extensionName = (isAscii ? '.asc' : '') + extensionName;
        let outputCli = opts['outputCli'];
        let output_file_name;
        if (!outputCli) {
            if (opts.output) {
                output_file_name = opts.output + extensionName;
            }
            else {
                let { outputFile } = yield inquirer.prompt({
                    name: 'outputFile',
                    type: 'input',
                    message: `please name output file (${extensionName}) (--output)`,
                });
                output_file_name = outputFile + extensionName;
            }
        }
        else {
            output_file_name = 'Unnamed';
        }
        parsed.output = (buf) => {
            if (outputCli) {
                return console.log(buf.toString('base64'));
            }
            if (overwrite || !fs.existsSync(output_file_name)) {
                fs.writeFileSync(output_file_name, isAscii ? buf.toString('base64') : buf);
            }
            else {
                console.log('file is exist', output_file_name);
                console.log(buf.toString('base64'));
            }
        };
        return handler(parsed);
    });
};
