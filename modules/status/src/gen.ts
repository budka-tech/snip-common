import type {IConfigFile, IConfigOutput, IConfigRecord} from "./configReader.ts";
import * as path from "node:path";

export class Gen {
    protected _output: string = ''
    protected _entries: [string, string][] = []
    protected _before: string = ''
    protected _after: string = ''
    protected _dir = ''
    protected _target: IConfigOutput

    constructor(protected _config: IConfigFile, target: IConfigOutput, before?: string, after?: string, dir?: string) {
        this._target = target
        this._entries = Object.entries(this._config.list)
        this._before = before || ''
        this._after = after || ''
        this._dir = dir || ''
    }

    private get filePath(): string {
        return  path.join(this._dir, this._config.output[this._target])
    }

    genOutput(): void {
        this._output = this._before

        for (let i = 0; i < Object.entries(this._config.list).length; i++) {
            const [key, value] = Object.entries(this._config.list)[i]

            this._output += this.getRecord(key, value, i == 0, i == this._entries.length - 1)
        }

        this._output += this._after
    }

    async build(): Promise<void> {
        this.genOutput()
        await this.writeFile()
    }

    async writeFile(): Promise<void> {
        const file = Bun.file(this.filePath)
        await Bun.write(file, this._output)
    }

    protected getRecord(key: string, value: string, isFirst: boolean, isLast: boolean): string {
        return ''
    }
}