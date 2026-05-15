import Product from "../src/entities/product.js"

export default class Cart {
    constructor({products}) {
        this.products = this.removeUndefinedProps(products)
    }

    removeUndefinedProps(products) {
        const result = []
        for(const product of products){
            const keys = Reflect.ownKeys(product)
            if(!keys.length) continue
            // 1o
            // result.push(JSON.parse(JSON.stringify(new Product(product)))) // mantenho por enquanto para verificar se isso impacta na performace. Objetivo atual é verificar a performace dos loops
            
            // 2o
            // keys.forEach(key => product[key] || delete product[key]) // comparando o delete

            // keys.forEach(key => product[key] || Reflect.deleteProperty(product, key))
            // result.push(new Product(product))

            // 3o
            let newObject = {}
            keys.forEach(key => {
                if(!keys[key]) return;
                newObject[key] = keys[key]
            })
            result.push(new Product(newObject))
        }
        return result
    }
}