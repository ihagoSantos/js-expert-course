import ProductFactory from './factory/productFactory.js'
import ColorFactory from './factory/productFactory.js'
import PersonFactory from './factory/personFactory.js'

const product = ProductFactory.getInstance()
const color = ColorFactory.getInstance()
const person = PersonFactory.getInstance()

console.log(product)
console.log(color)
console.log(person)