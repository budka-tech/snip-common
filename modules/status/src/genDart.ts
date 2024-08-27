import {Gen} from "./gen.ts";
import type {IConfigFile} from "./configReader.ts";

export class GenDart extends Gen {
    constructor(config: IConfigFile, dir: string) {
        const before = `enum ${config.enum} {\n`
        const after = `}`
        super(config, 'dart', before, after, dir);
    }


    protected getRecord(name: string, comment: string, isFirst: boolean, isLast: boolean): string {
        return `  /** ${comment} */\n  ${name}${!isLast ? ',\n' : ''}\n`
    }
}
