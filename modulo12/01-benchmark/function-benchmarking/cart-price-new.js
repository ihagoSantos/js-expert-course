export default class Cart {
    constructor({products}) {
        this.products = products
        this.total = this.getCartPrice()
    }

    /**
     * MÁ PRÁTICA (forma desotimizada)
     */
    getCartPrice() {
        let price = 0
        for(const product of this.products) {
            price += product.price
        }

        return price
    }
}