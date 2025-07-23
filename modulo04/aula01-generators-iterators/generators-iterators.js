const assert = require("assert")

function* multiply(arg1, arg2) {
    yield arg1 * arg2
}

function* main() {
    yield 'Hello'
    yield '-'
    yield 'World'
    // yield multiply(20, 20) 
    // se não passar o * no yield, ele não vai entender que queremos que a função seja executada. 
    // Retornará apenas a função para ser executada posteriormente
    yield* multiply(20, 20)
}

const generator = main()
// o generator por padrão possui as funções next() e return()
// console.log(generator.next())
// console.log(generator.next())
// console.log(generator.next())
// console.log(generator.next())
// console.log(generator.next())
assert.deepStrictEqual(generator.next(), { value: 'Hello', done: false })
assert.deepStrictEqual(generator.next(), { value: '-', done: false })
assert.deepStrictEqual(generator.next(), { value: 'World', done: false })
assert.deepStrictEqual(generator.next(), { value: 400, done: false })
assert.deepStrictEqual(generator.next(), { value: undefined, done: true })

assert.deepStrictEqual(Array.from(main()), ['Hello', '-', 'World', 400])
assert.deepStrictEqual([...main()], ['Hello', '-', 'World', 400])

// -------- async iterators
const { readFile, stat, readdir } = require('fs/promises')
function* promisified() {
    yield readFile(__filename)
    yield Promise.resolve('Hey Dude')
}

// // dessa forma, as promises retornadas não estão desolvidas
// console.log('promisified', [...promisified()])
// // Maneira 1 de contornar o problema
// Promise.all([...promisified()]).then(results => console.log('promisified', results))
//     // Maneira 2 de contornar o problema
//     ; (async () => {
//         for await (item of promisified()) {
//             console.log('for await', item.toString())
//         }
//     })()

async function* systemInfo() {
    const file = await readFile(__filename)
    yield { file: file.toString() }

    const { size } = await stat(__filename)
    yield { size }

    const dir = await readdir(__dirname)
    yield { dir }
}

; (async () => {
    for await (item of systemInfo()) {
        console.log('for await', item)
    }
})()