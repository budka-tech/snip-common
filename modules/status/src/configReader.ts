import {parse} from "yaml";

export type IConfigFile = {
    enum: string
    output: Record<IConfigOutput, string>
    list: IConfigRecord
}

export type IConfigOutput = 'go' | 'ts' | 'dart'

export type IConfigRecord = Record<string, string>

export class ConfigReader {
    private _config: IConfigFile | null = null

    constructor(
        private _filePath: string,
    ) {
    }

    get config(): IConfigFile {
        return this._config as IConfigFile
    }

    async parse(): Promise<void> {
        const f = Bun.file(this._filePath)
        const s = await f.text()

        this._config = parse(s) as IConfigFile
    }
}