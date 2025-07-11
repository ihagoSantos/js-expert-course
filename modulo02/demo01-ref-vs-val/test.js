const { deepStrictEqual } = require('assert')

function changeAgeAndReferene(person) {
    person.age = 25
    person = {
        name: 'John',
        age: 50
    }
    return person
}

let personObj1 = {
    name: 'Alex',
    age: 30
}

let personObj2 = changeAgeAndReferene(personObj1)

deepStrictEqual(personObj1, { name: 'Alex', age: 25 })
deepStrictEqual(personObj2, { name: 'John', age: 50 })