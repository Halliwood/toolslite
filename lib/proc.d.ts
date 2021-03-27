/// <reference types="node" />
import { SpawnOptionsWithoutStdio } from 'child_process';
export declare class ProcTool {
    private silent;
    private text?;
    private err?;
    private isRuning;
    constructor(silent?: boolean);
    spawnPromise(command: string, params?: string[], options?: SpawnOptionsWithoutStdio): Promise<string>;
}
