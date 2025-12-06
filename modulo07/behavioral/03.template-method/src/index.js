import OrderBusiness from "./business/orderBusiness.js";
import Order from "./entities/order.js";

const order = new Order({
    customerId: 'abc123',
    amount: 2500,
    products: [
        { description: 'Product 1' },
        { description: 'Product 2' },
    ],
})

const orderBusiness = new OrderBusiness()
console.info('orderCreated', orderBusiness.create(order))