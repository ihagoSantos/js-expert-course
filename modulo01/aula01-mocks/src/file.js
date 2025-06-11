const { readFile } = require('fs/promises')
const { error } = require('./constants')
const DEFAULT_OPTIONS = {
    maxLines: 3,
    fields: ['id', 'name', "profession", "age"]
}

class File {
    static async csvToJSON(filePath) {
        const content = await readFile(filePath, "utf8")
        const validation = this.isValid(content)
        if (!validation.valid) throw new Error(validation.error)
        return this.parseCSVToJSON(content)
    }

    static isValid(csvString, options = DEFAULT_OPTIONS) {
        // para ver o conteúdo do arquivo
        // fs.readFileSync('./mocks/threeItems-valid.csv', 'utf8')
        // [0] = headers
        // [1] = line
        // [2] = line
        const [header, ...fileWithoutHeader] = this.splitCsv(csvString)
        const isHeaderValid = header === options.fields.join(',')

        if (!isHeaderValid) {
            return {
                error: error.FILE_FIELDS_ERROR_MESSAGE,
                valid: false
            }
        }

        if (
            !fileWithoutHeader.length ||
            fileWithoutHeader.length > options.maxLines
        ) {
            return {
                error: error.FILE_LENGTH_ERROR_MESSAGE,
                valid: false
            }
        }

        return { valid: true }
    }

    static parseCSVToJSON(csvString) {
        const lines = this.splitCsv(csvString)
        // remover a primeira linha (header)
        const firstLine = lines.shift()
        const header = firstLine.split(',')

        return lines.map(line => {
            const columns = line.split(',')
            let user = {}
            for (const index in columns) {
                user[header[index]] = columns[index].trim()
            }
            return user
        })
    }

    static splitCsv(csvString) {
        return csvString.split(/\r?\n/)
    }
}

module.exports = {
    File
}