import {ConfigReader} from "./src/configReader.ts";
import {GenGo} from "./src/genGo.ts";
import {GenTs} from "./src/genTs.ts.ts";
import {GenDart} from "./src/genDart.ts";

const configReader = new ConfigReader("./config.yml");
await configReader.parse()

const genGo = new GenGo(configReader.config, __dirname);
const genTs = new GenTs(configReader.config, __dirname);
const genDart = new GenDart(configReader.config, __dirname);
genGo.build()
genTs.build()
genDart.build()
