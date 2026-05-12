import timers from 'timers/promises'
const timeoutAsync = timers.setTimeout

// ['1', '2'].map(async(item) => {
//     console.log('starting process!')
//     await timeoutAsync(100)
//     console.log(item)
//     console.log(await Promise.resolve('timeout order!'))
//     await timeoutAsync(100)
//     console.log(item)
// })

// const results = ['1', '2'].map(async(item) => {
//     console.log('starting process!')
//     await timeoutAsync(100)
//     console.log(item)
//     console.log(await Promise.resolve('timeout order!'))
//     await timeoutAsync(100)
//     console.log(item)

//     return parseInt(item) * 2
// })
// console.log('results', await Promise.all(results))


setTimeout(async() => {
    console.log('starting process!')
    await timeoutAsync(100)
    console.count('debug')
    console.log(await Promise.resolve('timeout order!'))
    await timeoutAsync(100)
    console.count('debug')

    await Promise.reject('promise rejected on timeout') // unhandledRejection
}, 1000)

const throwError = (msg) => { throw new Error(msg) }

try {
    console.log('hello')
    console.log('world')
    throwError('error dentro do try/catch')
} catch (error) {
    console.log('pego no catch!', error.message)
} finally {
    console.log('executed after all!')
}

process.on('unhandledRejection', (e) => { // captura o promises rejeitadas de forma global
    console.log('unhandledRejection',e.message || e)
    // process.exit(1)
})

process.on('uncaughtException', (e) => { // captura o erro em geral de forma global
    console.log('uncaughtException',e.message || e)
})

Promise.reject("promise rejected!") // unhandledRejection


// se o Promise.reject estiver dentro de um outro contexto, ele cai no undandledRejection
setTimeout(async () => {
    await Promise.reject("promise async/await rejected!") // undandledRejection
})
// mas se ele estiver no contexto global, ele cai no uncaughtException
await Promise.reject("promise async/await rejected!") // uncaughtException

setTimeout(() => {
    throwError('error fora do catch!!')
})
