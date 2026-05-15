// import { v4 as uuid } from 'uuid' // Crypto é mais rápido
import { randomUUID as uuid } from 'crypto'
import Product from "./product.js"

export default class Cart {
    constructor({at, products}) {
        this.id = uuid()
        this.at = at
        this.products = this.removeUndefinedProps(products)
        this.total = this.getCartPrice()
    }

    /**
     * MÁ PRÁTICA (forma desotimizada)
     */
    removeUndefinedProps(products) {
        const productsEntities = products
            .filter(product => !!Reflect.ownKeys(product).length)
            .map(product => new Product(product))
        
        return JSON.parse(JSON.stringify(productsEntities)) // JSON.stringify() remove chaves com valor undefined na conversão
    }

    getCartPrice() {
        return this.products
            .map(product => product.price)
            .reduce((prev, next) => prev + next, 0)
    }
}