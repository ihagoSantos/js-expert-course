// node cli-native.mjs --name Ihago --age 31
const [ nodePath, filePath, ...commands ]= process.argv
// console.log(commands)

function parseArguments(commands) {
    const cmd = new Map()
    const commandPrefix = '--'
    for(const key in commands) {
        const index = parseInt(key)
        const command = commands[key]
        
        if(!command.includes(commandPrefix)) continue;

        cmd.set(command.replace(commandPrefix, ''), commands[index + 1])
    }
    return Object.fromEntries(cmd)
}

console.log(parseArguments(commands))