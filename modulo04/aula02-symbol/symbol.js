const assert = require("assert")

// ---- Keys

const uniqueKey = Symbol("userName")

const user = {}

user['userName'] = 'value for normal Objects'
user[uniqueKey] = 'value for symbol'


// console.log('getting normal Objects:', user.userName)
// cada vez que o symbol é chamado, oculpa uma posição diferente na memória
// sempre único em nível de endereço de memória
// console.log('getting symbol:', user[Symbol("userName")]) 

assert.deepStrictEqual(user.userName, 'value for normal Objects')
// sempre único em nível de endereço de memória
assert.deepStrictEqual(user[Symbol("userName")], undefined)
assert.deepStrictEqual(user[uniqueKey], 'value for symbol')


// é mais dificil de acessar o dado diretamente pelo symbol, entretanto ele não é privado. 
// Não colocar informação sensível
// console.log('symbols', Object.getOwnPropertySymbols(user))
// const anotherSymbol = Symbol("anotherSymbol")
// user[anotherSymbol] = 'another value for symbol'
// console.log('symbols', Object.getOwnPropertySymbols(user))

assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey)

// bypass - má pratica (nem tem no codebase do node)
user[Symbol.for('password')] = 123
assert.deepStrictEqual(user[Symbol.for('password')], 123)

// ---- END Keys

// Well Known Symbols
const obj = {
    // iterators -> é o que o * (generator) faz por debaixo dos panos
    [Symbol.iterator]: () => ({
        items: ['c', 'b', 'a'],
        next() {
            return {
                done: this.items.length === 0,
                // remove o ultimo e retorna
                value: this.items.pop(),
            }
        },
    })
}

// for(o of obj) {
//     console.log('item', o)
// }

// console.log('items', [...obj])

assert.deepStrictEqual([...obj], ['a', 'b', 'c'])

const MyDate = require('./myDate').default

const myDate = new MyDate(
    [2022, 0, 1],
    [2022, 1, 2],
)

const expectedDates = [
    new Date(2022, 0, 1),
    new Date(2022, 1, 2),
]

assert.deepStrictEqual(myDate.kItems, undefined) // kItems não é acessível fora da classe MyDate

assert.deepStrictEqual(Object.prototype.toString.call(myDate),'[object WHAT?]')

// console.log(myDate + 1)
assert.throws(() => myDate + 1, TypeError)

// console.log('String(myDate)', String(myDate)) 

// chama o [Symbol.toPrimitive]() ao fazer a conversão
assert.deepStrictEqual(String(myDate), '01 de janeiro de 2022 e 02 de fevereiro de 2022')

// chama o [Symbol.iterator()] para percorrer os dados
assert.deepStrictEqual([...myDate], expectedDates)

// chama o [Symbol.asyncIterator()] para percorrer os dados
;(async() => {
    const dates = []
    for await(const item of myDate) {
        dates.push(item)
    }

    const expectedDatesIsoString = expectedDates.map(date => date.toISOString())

    assert.deepStrictEqual(dates, expectedDatesIsoString)
})()