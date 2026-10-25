import { existsSync, mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"

const directory = join(process.cwd(), ".generated")
const file = join(directory, "portfolio-rag-index.json")
mkdirSync(directory, { recursive: true })
if (!existsSync(file)) writeFileSync(file, '{"version":1,"pages":0,"chunks":[]}\n')
