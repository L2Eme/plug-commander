/// <reference types="node" />
import * as plug from '@line100/plug';
import { Command } from 'commander';
export interface IOutputConfig {
    overwrite?: boolean;
    extensionName?: string;
}
export interface ParsedOutput {
    output: (buf: Buffer) => void;
}
/**
 * cli param
 * - parse --output
 * - parse --output-ascii
 * - parse --output-cli
 *
 * return
 * - parsed.output as (buf) => void
 */
export declare const OutputPlug: (config: IOutputConfig) => (this: Command, handler: plug.THandler) => (parsed: ParsedOutput) => Promise<any>;
