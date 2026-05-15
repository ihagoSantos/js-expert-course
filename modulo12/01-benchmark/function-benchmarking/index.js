import Benchmark from "benchmark";
import CartIdOld from "./cart-id-old.js";
import CartIdNew from "./cart-id-new.js";
import CartRmPropOld from "./cart-rm-prop-old.js";
import CartRmPropNew from "./cart-rm-prop-new.js";
import CartPriceOld from "./cart-price-old.js";
import CartPriceNew from "./cart-price-new.js";
import database from '../database.js'
const suite = new Benchmark.Suite;

// suite
//     .add('Cart#cartIdUUID', function(){
//         new CartIdOld()
//     })
//     .add('Cart#cartIdCrypto', function(){
//         new CartIdNew()
//     })
//     .on('cycle', (event) => console.log(String(event.target)))
//     .on('complete', function() {
//         console.log(`Fastest is ${this.filter('fastest').map('name')}`)
//     })
//     .run()

/**
 * RESULTADO:
 * Cart#cartIdUUID x 5,748,521 ops/sec ±2.77% (80 runs sampled)
 * Cart#cartIdCrypto x 7,461,627 ops/sec ±2.66% (82 runs sampled)
 * Fastest is Cart#cartIdCrypto
 */

// Simulando dados com dois itens apenas pois ele irá executar milhões de vezes
// const data = {
//     products: [
//         {
//             id: 'ae',
//             n: undefined,
//             abd: undefined,
//             a: null,
//             b: 123
//         },
//         {
//             id: 'ae',
//             n: undefined,
//             abd: undefined,
//             a: null,
//             b: 123
//         }
//     ]
// }
// suite
//     .add('Cart#rmEmptyPropsMapReduce', function(){
//         new CartRmPropOld(data)
//     })
//     .add('Cart#rmEmptyPropsFor', function(){
//         new CartRmPropNew(data)
//     })
//     .on('cycle', (event) => console.log(String(event.target)))
//     .on('complete', function() {
//         console.log(`Fastest is ${this.filter('fastest').map('name')}`)
//     })
//     .run({ async: true })

/**
 * RESULTADO Com JSON.parse(JSON.stringify(new Product(product))):
 * Cart#rmEmptyPropsMapReduce x 1,090,157 ops/sec ±2.26% (86 runs sampled)
 * Cart#rmEmptyPropsFor x 1,032,744 ops/sec ±2.31% (87 runs sampled)
 * Fastest is Cart#rmEmptyPropsMapReduce
 */

/**
 * RESULTADO com keys.forEach(key => product[key] || delete product[key])
 * Cart#rmEmptyPropsMapReduce x 1,010,200 ops/sec ±4.20% (78 runs sampled)
 * Cart#rmEmptyPropsFor x 2,161,140 ops/sec ±2.96% (84 runs sampled)
 * Fastest is Cart#rmEmptyPropsFor
 */

/**
 * RESULTADO com keys.forEach(key => product[key] || Reflect.deleteProperty(product, key))
 * Cart#rmEmptyPropsMapReduce x 930,799 ops/sec ±4.13% (80 runs sampled)
 * Cart#rmEmptyPropsFor x 2,093,852 ops/sec ±3.07% (80 runs sampled)
 * Fastest is Cart#rmEmptyPropsFor
 */

/**
 * RESULTADO com let newObject = {}
 * Cart#rmEmptyPropsMapReduce x 975,910 ops/sec ±3.35% (81 runs sampled)
 * Cart#rmEmptyPropsFor x 1,938,695 ops/sec ±2.84% (79 runs sampled)
 * Fastest is Cart#rmEmptyPropsFor

 */

suite
    .add('Cart#calcPriceMapReduce', function(){
        new CartPriceOld(database)
    })
    .add('Cart#calcPriceFor', function(){
        new CartPriceNew(database)
    })
    .on('cycle', (event) => console.log(String(event.target)))
    .on('complete', function() {
        console.log(`Fastest is ${this.filter('fastest').map('name')}`)
    })
    .run({ async: true })

/**
 * Cart#calcPriceMapReduce x 524,216 ops/sec ±4.97% (71 runs sampled)
 * Cart#calcPriceFor x 2,250,494 ops/sec ±3.48% (74 runs sampled)
 * Fastest is Cart#calcPriceFor
 */