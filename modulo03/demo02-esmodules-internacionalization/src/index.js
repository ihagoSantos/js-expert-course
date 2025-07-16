/**
 * Se estiver usando o node v14.3 usar as flags --experimental-json-modules e --experimental-top-level-await
 */
import DatabaseRepository from './databaseRepository.js'
import Person from './person.js'
import TerminalController from './terminalController.js'
const DEFAULT_LANG = 'pt-BR'
const STOP_TERM = ':q'

const database = await DatabaseRepository.loadData()
const terminalController = new TerminalController()

terminalController.initializeTerminal(database, DEFAULT_LANG)

async function mainLoop() {
    try {
        const answer = await terminalController.question(">> ")
        if (answer === STOP_TERM) {
            terminalController.closeTerminal()
            console.log('process finished!')
            return
        }
        const person = Person.generateInstanceFromString(answer)
        console.log('person', person.formatted(DEFAULT_LANG))
        return mainLoop()

    } catch (error) {
        console.error("DEU RUIM**", error)
        return mainLoop()
    }
}

await mainLoop()