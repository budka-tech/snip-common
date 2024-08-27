import {ConfigReader} from "./src/configReader.ts";
import {GenGo} from "./src/genGo.ts";
import {GenTs} from "./src/genTs.ts.ts";
import {GenDart} from "./src/genDart.ts";
import * as path from "node:path";

const configReader = new ConfigReader("./config.yml");
await configReader.parse()

const outPath = path.join(__dirname, "../../dist/")

const genGo = new GenGo(configReader.config, outPath);
const genTs = new GenTs(configReader.config, outPath);
const genDart = new GenDart(configReader.config, outPath);
genGo.build()
genTs.build()
genDart.build()
