import { readFile } from 'fs/promises'

export default class DatabaseRepository {
    static async loadData() {
        const raw = await readFile(
            new URL('./../database.json', import.meta.url),
            'utf-8'
        )
        return JSON.parse(raw)
    }
}