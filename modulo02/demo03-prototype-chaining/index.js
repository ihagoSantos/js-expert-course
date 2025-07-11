const assert = require('assert')

const obj = {}
const arr = []
const fn = () => { }

// internamente, objetos literais viram funções explicitas -> 
// -> Number
// -> String
// -> Object
// -> Array
// -> Function
console.log(
    'new Object() is {}?',
    new Object().__proto__ === {}.__proto__
)
assert.deepStrictEqual(new Object().__proto__, {}.__proto__)

// __proto__ é a referência do objeto que possui as propriedades nele
// __proto__ é uma instância de Object
console.log(
    'obj.__proto__ === Object.prototype',
    obj.__proto__ === Object.prototype
)
assert.deepStrictEqual(obj.__proto__, Object.prototype)

console.log(
    'arr.__proto__ === Array.prototype',
    arr.__proto__ === Array.prototype
)
assert.deepStrictEqual(arr.__proto__, Array.prototype)

console.log('fn.__proto__ === Function.prototype',
    fn.__proto__ === Function.prototype
)
assert.deepStrictEqual(fn.__proto__, Function.prototype)

// o __proto__ de Object.prototype é null
// todo mundo herda de null
console.log(
    'obj.__proto__.__proto__ === null',
    obj.__proto__.__proto__ === null
)
assert.deepStrictEqual(obj.__proto__.__proto__, null)

// --------------
console.log('-'.repeat(50))

// Forma de fazer objeto no ES5 antes da chegada das classes
function Employee() { }
Employee.prototype.salary = () => 'salary**'
console.log(
    'Employee.prototype.salary()',
    Employee.prototype.salary()
)
function Supervisor() { }
// Supervisor herda a instância de Employee
Supervisor.prototype = Object.create(Employee.prototype)
console.log(
    'Supervisor.prototype.salary()',
    Supervisor.prototype.salary()
)
Supervisor.prototype.profitShare = () => 'proftShare**'

function Manager() { }
// Manager herda a instância de Supervisor
Manager.prototype = Object.create(Supervisor.prototype)
Manager.prototype.monthlyBonuses = () => 'monthlyBonuses**'

// podemos chamar via prototype, mas se tentar chamar direto dá erro!
console.log(
    'Manager.prototype.salary()',
    Manager.prototype.salary()
)
// console.log('Manager.salary()', Manager.salary()) // retorna erro

// se não chamar o 'new', o primeiro __proto__ vai ser SEMPRE
// a instancia de Function, sem herdar nossas classes
// Para acessar as classes sem o new, pode acessar direto via prototype
console.log(
    'Manager.prototype.__proto__ === Supervisor.prototype',
    Manager.prototype.__proto__ === Supervisor.prototype
)
assert.deepStrictEqual(Manager.prototype.__proto__, Supervisor.prototype)

// --------------
console.log('-'.repeat(50))

// quando chamamos com o 'new' o __proto__ recebe o prototype
// atual do objeto
console.log(
    'manager().__proto__: %s, manager.salary(): %s',
    new Manager().__proto__, new Manager().salary()
)
console.log(
    'Supervisor.prototype === new Manager().__proto__.__proto__',
    Supervisor.prototype === new Manager().__proto__.__proto__
)
assert.deepStrictEqual(Supervisor.prototype, new Manager().__proto__.__proto__)

// --------------
console.log('-'.repeat(50))

const manager = new Manager()
console.log('manager.salary()', manager.salary())
console.log('manager.profitShare()', manager.profitShare())
console.log('manager.monthlyBonuses()', manager.monthlyBonuses())

console.log(
    '%s -> %s -> %s -> %s -> %s -> %s',
    manager,
    manager.__proto__,
    manager.__proto__.__proto__,
    manager.__proto__.__proto__.__proto__,
    manager.__proto__.__proto__.__proto__.__proto__,
    manager.__proto__.__proto__.__proto__.__proto__.__proto__,
)

assert.deepStrictEqual(manager.__proto__, Manager.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__, Supervisor.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__, Employee.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__, Object.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__.__proto__, null)

// --------------
console.log('-'.repeat(50))

class T1 {
    ping() { return 'ping' }
}
class T2 extends T1 {
    pong() { return 'pong' }
}
class T3 extends T2 {
    shoot() { return 'shoot' }
}

const t3 = new T3()
console.log(
    't3 inherits null?',
    t3.__proto__.__proto__.__proto__.__proto__.__proto__ === null
)
console.log('t3.ping()', t3.ping())
console.log('t3.pong()', t3.pong())
console.log('t3.shoot()', t3.shoot())

assert.deepStrictEqual(
    t3.__proto__, T3.prototype
)
assert.deepStrictEqual(
    t3.__proto__.__proto__, T2.prototype
)
assert.deepStrictEqual(
    t3.__proto__.__proto__.__proto__, T1.prototype
)
assert.deepStrictEqual(
    t3.__proto__.__proto__.__proto__.__proto__, Object.prototype
)
assert.deepStrictEqual(
    t3.__proto__.__proto__.__proto__.__proto__.__proto__, null
)