import {Gen} from "./gen.ts";
import type {IConfigFile} from "./configReader.ts";

export class GenTs extends Gen {
    constructor(config: IConfigFile, dir: string) {
        const before = `export const enum ${config.enum} {\n`
        const after = `}`
        super(config, 'ts', before, after, dir);
    }


    protected getRecord(name: string, comment: string, isFirst: boolean, isLast: boolean): string {
        return `  /** ${comment} */\n  ${name},${!isLast ? '\n' : ''}\n`
    }
}