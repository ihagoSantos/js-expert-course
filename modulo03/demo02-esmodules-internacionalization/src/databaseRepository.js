import { readFile, writeFile } from 'fs/promises'

export default class DatabaseRepository {
    static async loadData() {
        const raw = await readFile(
            new URL('./../database.json', import.meta.url),
            'utf-8'
        )
        return JSON.parse(raw)
    }
    static async save(data) {
        // nao tem __filename, __dirname
        const { pathname: databaseFile } = new URL('./../database.json', import.meta.url)
        const currentData = JSON.parse((await readFile(databaseFile)))
        currentData.push(data)
        await writeFile(databaseFile, JSON.stringify(currentData))
    }
}