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


    genOutput(): void {
        super.genOutput()

        this._output += "\n\nconst m: Record<Status, string> = {\n"

        for (let i = 0; i < this._entries.length; i++) {
            const [key, value] = this._entries[i]
            this._output += `  [Status.${key}]:"${value}",\n`
        }

        this._output += "}"
        this._output += "\n\nexport function readable(s: Status): string {\n  return m[s] ? m[s] : m[Status.Any]\n}"
    }
}