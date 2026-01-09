// para importar do diretorio use a flag abaixo
// --experimental-specifier-resolution=node
// import FluentSQLBuilder from "../fluentsql-jest-tdd-yt";
import FluentSQLBuilder from '@ihago.santos/fluentsql'

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dataPath = path.join(__dirname, './database/data.json')
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))

const result = FluentSQLBuilder.for(data)
    .where({ registered: /^(2020|2019)/ })
    .select(['name'])
    .limit(3)
    // .groupCount('name')
    .countBy('name')
    .build()

console.table(result)


// Semantic versioning -> Major.Minor.Patch
// 1 -> Major version (breaking change. e.g. a rebrand feature set added)
// 2 -> Minor Version (non-breaking noteworthy change. e.g. new component updated styles)
// 3 -> Patch Version (Small request or bug fix, e.g. update or edit existing elements)

// npm login -> login user on npm
// npm version patch -> increment patch version
// npm version minor -> increment minor version
// npm version major -> increment major version

// npm publish -> publish new version

// npm outdated -> mostra pacotes desatualizados
// npm update -> atualiza pacotes desatualizados (não atualiza para major version para evitar erro. é necessário rodar npm install packageName@latest)
// para voltar na versão mais recente da 1 -> npm install packageName@1.x
