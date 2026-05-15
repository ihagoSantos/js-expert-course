import Product from "../src/entities/product.js"

export default class Cart {
    constructor({products}) {
        this.products = this.removeUndefinedProps(products)
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
}