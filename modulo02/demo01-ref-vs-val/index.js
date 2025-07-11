'use-strict';
const { deepStrictEqual } = require('assert')
let counter = 0
let counter2 = counter
counter2++
console.log('counter', counter) // 0
console.log('counter2', counter2) // 1

// tipos primitivos são armazenados no call stack. Eles geram uma cópia em memória
//Javascript has 5 data types that are passed by value: Boolean, null, undefined, String, and Number. 
// We’ll call these primitive types.
deepStrictEqual(counter, 0)
deepStrictEqual(counter2, 1)

const item = { counter: 0 }
const item2 = item
item2.counter++
console.log('item', item) // { counter: 1 }
console.log('item2', item2) // { counter: 1 }
// tipos de referência (objetos, por exemplo) são armazenados no memory heap. 
// Ele copia o endereço de memória e aponta para o mesmo lugar
// Javascript has 3 data types that are passed by reference: Array, Function, and Object. 
// These are all technically Objects, so we’ll refer to them collectively as Objects.
deepStrictEqual(item, { counter: 1 })
deepStrictEqual(item2, { counter: 1 })