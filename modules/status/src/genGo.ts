import {Gen} from "./gen.ts";
import type {IConfigFile} from "./configReader.ts";

export class GenGo extends Gen {
    constructor(config: IConfigFile, dir: string) {
        const before = `package status\n\ntype ${config.enum} = uint16\n\nconst (\n`
        const after = `)`
        super(config, 'go', before, after, dir);
    }


    protected getRecord(key: string, value: string, isFirst: boolean, isLast: boolean): string {
        return `  ${key} ${isFirst ? `${this._config.enum} = iota` : ''} // ${value}\n`
    }
}