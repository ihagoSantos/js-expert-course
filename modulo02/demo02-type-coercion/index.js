true + 2 // 3
true - 2 // -1
"21" + true // '21true'
"21" - true // 20
999999999999999 // 10000000000000000
0.1 + 0.2 // 0.30000000000000004
3 > 2 // true
2 > 1 // true
3 > 2 > 1 // false
3 > 2 > 0 // true
'21' - - 1 // 22
'1' == 1 // true
'1' === 1 // false
3 > 2 >= 1 //true
'B' + "a" + + "a" + "a" // 'BaNaNa'

'1' == 1 // Loose Equality Operator -> Coersão implícita (faz a conversão dos valores implicitamente)
'1' === 1 // Strict Equality Operator -> Não faz a conversão dos valores

// Conversão explícita
String(123) // '123'
// Conversão implícita
123 + '' // '123'

// ------------------------
console.assert(String(123) === '123', 'explicit conversion to string')
console.assert(123 + '' === '123', 'implicit converson to string')

// if (null || 1) {
//     console.log('ae!')
// }

// if ('hello' || 1) {
//     console.log('ae2!')
// }

// const r = 'hello' || 1 // essa expressão não retorna true ou false e sim o valor que for true (sempre o primero se os dois forem true)
// console.log('r', r)
// if (r) {
//     console.log('ae3!')
// }

console.assert(('hello' || 123) === 'hello', "|| returns the first element if both are true!")
console.assert(('hello' && 123) === 123, "&& returns the last element if both are true!")

// ------------------------
const item = {
    name: "IhagoSantos",
    age: 30,
}
// console.log('item', item + 0)
const item2 = {
    name: "IhagoSantos",
    age: 30,
    toString() {
        return `Name: ${this.name}, Age: ${this.age}`
    },
}
// console.log('item2', item2 + 0)
const item3 = {
    name: "IhagoSantos",
    age: 30,
    // tipo da conversão for string: 1 se não for primitivo, chama o valueOf()
    toString() {
        return `Name: ${this.name}, Age: ${this.age}`
    },
    // tipo da conversão for number: 1 se não for primitivo, chama o toString()
    valueOf() {
        return { hey: 'dude' }
        // return 7
    },
    // ele tem prioridade
    [Symbol.toPrimitive](coercionType) {
        // console.log('trying to convert to', coercionType)
        const types = {
            string: JSON.stringify(this),
            number: '007'
        }
        return types[coercionType] || types.string
    }
}
// console.log('item3', item3 + 0)
// console.log('item3 concat', ''.concat(item3))

// console.log('tipo da conversão for string: 1 se não for primitivo, chama o valueOf() -> ', String(item3))
// // vai retornar NaN pois o toString retornou a
// console.log('tipo da conversão for number: 1 se não for primitivo, chama o toString()', Number(item3))

// console.log('Date', new Date(item3))
console.assert(item3 + 0 === '{"name":"IhagoSantos","age":30}0')
// console.log('!!item3 is true?', !!item3)
console.assert(!!item3)

// console.log('string.concat', 'Ae'.concat(item3))
console.assert('Ae'.concat(item3) === 'Ae{"name":"IhagoSantos","age":30}')

//console.log('implicit + explicit coercion (using ==)', item == String(item))
console.assert(item == String(item))

const item4 = { ...item3, name: 'Zézin', age: 20 }
// console.log('New Object', item4)

console.assert(item4.name === 'Zézin' && item4.age === 20)