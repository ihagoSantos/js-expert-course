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
// Exemplo 1
// function* promisified() {
//     yield readFile(__filename)
//     yield Promise.resolve('Hey Dude')
// }

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

// Exemplo 2
// async function* systemInfo() {
//     const file = await readFile(__filename)
//     yield { file: file.toString() }

//     const { size } = await stat(__filename)
//     yield { size }

//     const dir = await readdir(__dirname)
//     yield { dir }
// }

// ; (async () => {
//     for await (item of systemInfo()) {
//         console.log('for await', item)
//     }
// })()

// Passing arguments into Generators
// function* logGenerator() {
//     console.log(0)
//     console.log(1, yield)
//     console.log(2, yield)
//     console.log(3, yield)
// }

// const gen = logGenerator()
// gen.next()
// gen.next("Hey")
// gen.next("-")
// gen.next("Dude")
// gen.next("!")

// Return statement in a Generator
// function* yieldAndReturn() {
//     yield "Hey"
//     return "Dude" // break the yield 
//     yield "!"
// }

// const gen = yieldAndReturn()
// console.log(gen.next())
// console.log(gen.next())
// console.log(gen.next())

// Generator as an object property
const obj = {
    *generator() {
        yield "a"
        yield "b"
    }
}
const gen = obj.generator()
assert.deepStrictEqual([...gen], ['a', 'b'])

//Generator as an object method
class Foo {
    *generator() {
        yield 1
        yield 2
        yield 3
    }
}

const f = new Foo()
const fooGen = f.generator()
assert.deepStrictEqual([...fooGen], [1, 2, 3])
assert.deepStrictEqual([...f.generator()], [1, 2, 3])

// Generator as a computed property
class Bar {
    *[Symbol.iterator]() {
        yield 1
        yield 2
        yield 3
    }
}

assert.deepStrictEqual(Array.from(new Bar()), [1, 2, 3])