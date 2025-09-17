const { describe, it, after, before } = require('mocha')

const supertest = require('supertest')
const { expect } = require('chai')
const sinon = require('sinon')
const { join } = require('path')
const CarService = require('../../src/service/carService')
const carDatabase = join(__dirname, "./../../database/cars.json")

const mocks = {
    validCarCategory: require('../mocks/valid-carCategory.json'),
    validCar: require('../mocks/valid-car.json'),
    validCustomer: require('../mocks/valid-customer.json'),
}

describe('API Test Suit', () => {
    let app
    let carService = {}
    let sandbox = {}
    before((done) => {
        carService = new CarService({
            cars: carDatabase
        })
        app = require('../../src/presentation/http/server')
        app.once('listening', done)
    })

    after((done) => {
        app.close(done)
    })

    beforeEach(() => {
        sandbox = sinon.createSandbox()
    })

    afterEach(() => {
        sandbox.restore()
    })

    describe('/rent:post', () => {
        it('should request the rent and return HTTP status 200', async () => {
            const car = Object.create(mocks.validCar)
            const carCategory = {
                ...mocks.validCarCategory,
                price: 37.6,
                carIds: [car.id]
            }
            const customer = Object.create(mocks.validCustomer)
            customer.age = 20

            const numberOfDays = 5
            const dueDate = "10 de novembro de 2020"
            const now = new Date(2020, 10, 5)

            sandbox.stub(
                carService.carsRepository,
                carService.carsRepository.find.name
            ).resolves(car)

            sandbox.useFakeTimers(now.getTime())

            const expected = {
                data: {
                    customer,
                    car: mocks.validCar,
                    amount: carService.currencyFormat.format(206.80),
                    dueDate
                }
            }
            const response = await supertest(app)
                .post('/rent')
                .send({ customer, carCategory, numberOfDays })
                .expect(200)

            expect(response.text).to.be.equal(JSON.stringify(expected))
        })

        it('should return HTTP status 404 when route not found', async () => {
            const car = Object.create(mocks.validCar)
            const carCategory = {
                ...mocks.validCarCategory,
                price: 37.6,
                carIds: [car.id]
            }
            const customer = Object.create(mocks.validCustomer)
            customer.age = 20

            const numberOfDays = 5
            const dueDate = "10 de novembro de 2020"
            const now = new Date(2020, 10, 5)

            sandbox.stub(
                carService.carsRepository,
                carService.carsRepository.find.name
            ).resolves(car)

            sandbox.useFakeTimers(now.getTime())

            const expected = {
                data: {
                    customer,
                    car: mocks.validCar,
                    amount: carService.currencyFormat.format(206.80),
                    dueDate
                }
            }
            const response = await supertest(app)
                .post('/')
                .send({ customer, carCategory, numberOfDays })
                .expect(404)

            expect(response.notFound).to.be.true
        })
        it('should return HTTP status 400 when numberOfDays is invalid', async () => {
            const car = Object.create(mocks.validCar)
            const carCategory = {
                ...mocks.validCarCategory,
                price: 37.6,
                carIds: [car.id]
            }
            const customer = Object.create(mocks.validCustomer)
            customer.age = 20

            const numberOfDays = null
            const dueDate = "10 de novembro de 2020"
            const now = new Date(2020, 10, 5)

            sandbox.stub(
                carService.carsRepository,
                carService.carsRepository.find.name
            ).resolves(car)

            sandbox.useFakeTimers(now.getTime())

            const expected = 'numberOfDays is invalid'

            const response = await supertest(app)
                .post('/rent')
                .send({ customer, carCategory, numberOfDays })
                .expect(400)

            expect(response.text).to.be.equal(expected)
        })

        it('should return HTTP status 400 when customer is null', async () => {
            const car = Object.create(mocks.validCar)
            const carCategory = {
                ...mocks.validCarCategory,
                price: 37.6,
                carIds: [car.id]
            }
            const customer = null
            const numberOfDays = 5
            const dueDate = "10 de novembro de 2020"
            const now = new Date(2020, 10, 5)

            sandbox.stub(
                carService.carsRepository,
                carService.carsRepository.find.name
            ).resolves(car)

            sandbox.useFakeTimers(now.getTime())

            const expected = 'customer is invalid'

            const response = await supertest(app)
                .post('/rent')
                .send({ customer, carCategory, numberOfDays })
                .expect(400)

            expect(response.text).to.be.equal(expected)
        })
        it('should return HTTP status 400 when customer is not a object', async () => {
            const car = Object.create(mocks.validCar)
            const carCategory = {
                ...mocks.validCarCategory,
                price: 37.6,
                carIds: [car.id]
            }
            const customer = []
            const numberOfDays = 5
            const dueDate = "10 de novembro de 2020"
            const now = new Date(2020, 10, 5)

            sandbox.stub(
                carService.carsRepository,
                carService.carsRepository.find.name
            ).resolves(car)

            sandbox.useFakeTimers(now.getTime())

            const expected = 'customer is invalid'

            const response = await supertest(app)
                .post('/rent')
                .send({ customer, carCategory, numberOfDays })
                .expect(400)

            expect(response.text).to.be.equal(expected)
        })
        it('should return HTTP status 400 when customer doesnt have age', async () => {
            const car = Object.create(mocks.validCar)
            const carCategory = {
                ...mocks.validCarCategory,
                price: 37.6,
                carIds: [car.id]
            }
            const customer = {}
            const numberOfDays = 5
            const dueDate = "10 de novembro de 2020"
            const now = new Date(2020, 10, 5)

            sandbox.stub(
                carService.carsRepository,
                carService.carsRepository.find.name
            ).resolves(car)

            sandbox.useFakeTimers(now.getTime())

            const expected = 'customer is invalid'

            const response = await supertest(app)
                .post('/rent')
                .send({ customer, carCategory, numberOfDays })
                .expect(400)

            expect(response.text).to.be.equal(expected)
        })
        it('should return HTTP status 400 when carCategory doesnt have carIds array', async () => {
            const car = Object.create(mocks.validCar)
            const carCategory = {
                ...mocks.validCarCategory,
                price: 37.6,
                carIds: null
            }
            const customer = Object.create(mocks.validCustomer)
            customer.age = 20
            const numberOfDays = 5
            const dueDate = "10 de novembro de 2020"
            const now = new Date(2020, 10, 5)

            sandbox.stub(
                carService.carsRepository,
                carService.carsRepository.find.name
            ).resolves(car)

            sandbox.useFakeTimers(now.getTime())

            const expected = 'carCategory is invalid'

            const response = await supertest(app)
                .post('/rent')
                .send({ customer, carCategory, numberOfDays })
                .expect(400)

            expect(response.text).to.be.equal(expected)
        })
        it('should return HTTP status 400 when carCategory doesnt have price', async () => {
            const car = Object.create(mocks.validCar)
            const carCategory = {
                ...mocks.validCarCategory,
                price: null,
                carIds: [car.id]
            }
            const customer = Object.create(mocks.validCustomer)
            customer.age = 20
            const numberOfDays = 5
            const dueDate = "10 de novembro de 2020"
            const now = new Date(2020, 10, 5)

            sandbox.stub(
                carService.carsRepository,
                carService.carsRepository.find.name
            ).resolves(car)

            sandbox.useFakeTimers(now.getTime())

            const expected = 'carCategory is invalid'

            const response = await supertest(app)
                .post('/rent')
                .send({ customer, carCategory, numberOfDays })
                .expect(400)

            expect(response.text).to.be.equal(expected)
        })
        it('should return HTTP status 400 when carCategory is null', async () => {
            const car = Object.create(mocks.validCar)
            const carCategory = null
            const customer = Object.create(mocks.validCustomer)
            customer.age = 20
            const numberOfDays = 5
            const dueDate = "10 de novembro de 2020"
            const now = new Date(2020, 10, 5)

            sandbox.stub(
                carService.carsRepository,
                carService.carsRepository.find.name
            ).resolves(car)

            sandbox.useFakeTimers(now.getTime())

            const expected = 'carCategory is invalid'

            const response = await supertest(app)
                .post('/rent')
                .send({ customer, carCategory, numberOfDays })
                .expect(400)

            expect(response.text).to.be.equal(expected)
        })
    })
})