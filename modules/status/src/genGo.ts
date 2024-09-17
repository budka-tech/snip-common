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

    genOutput(): void {
        super.genOutput()

        this._output += "\nvar m = map[Status]string{\n"

        for (let i = 0; i < this._entries.length; i++) {
            const [key, value] = this._entries[i]
            this._output += `  ${key}:"${value}",\n`
        }

        this._output += "}"
        this._output += "\n\nfunc Readable(s Status) string {\n  return m[s]\n}"
    }

}
