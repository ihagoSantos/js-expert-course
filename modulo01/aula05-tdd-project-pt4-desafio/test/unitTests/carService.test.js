const { describe, it, before, beforeEach, afterEach } = require("mocha")
const { expect } = require('chai')
const sinon = require('sinon')



const CarService = require('../../src/service/carService')
const { join } = require('path')
const Transaction = require("../../src/entities/transaction")

const carDatabase = join(__dirname, "./../../database/cars.json")

const mocks = {
    validCarCategory: require('../mocks/valid-carCategory.json'),
    validCar: require('../mocks/valid-car.json'),
    validCustomer: require('../mocks/valid-customer.json'),
}
describe("CarService test suit", () => {
    let carService = {}
    let sandbox = {}
    before(() => {
        carService = new CarService({
            cars: carDatabase
        })
    })

    beforeEach(() => {
        sandbox = sinon.createSandbox() //cria um sandbox antes de cada teste
    })
    afterEach(() => {
        sandbox.restore() // restaura o sandbox após cada teste
    })

    it("should retrieve a random position from an array", () => {
        const data = [0, 1, 2, 3, 4]
        const result = carService.getRandomPositionFromArray(data)
        expect(result).to.be.lte(data.length).and.be.gte(0)
    })

    it("should choose the first id from carIds in carCategory", () => {
        const carCategory = mocks.validCarCategory
        const carIdIndex = 0

        sandbox.stub(
            carService,
            carService.getRandomPositionFromArray.name
        ).returns(carIdIndex)

        const result = carService.chooseRandomCar(carCategory)
        const expected = carCategory.carIds[carIdIndex]

        expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok
        expect(result).to.be.equal(expected)
    })

    it("given a car category it should return an available car", async () => {
        const car = mocks.validCar
        const carCategory = Object.create(mocks.validCarCategory)// cria uma instância imultável do objeto pai. Dessa forma, posso alterar o objeto sem refletir no pai
        carCategory.carIds = [car.id]

        sandbox.stub(
            carService.carsRepository,
            carService.carsRepository.find.name
        ).returns(car)

        sandbox.spy(
            carService,
            carService.chooseRandomCar.name
        )

        const result = await carService.getAvailableCar(carCategory)
        const expected = car

        expect(carService.chooseRandomCar.calledOnce).to.be.ok
        expect(carService.carsRepository.find.calledWithExactly(car.id)).to.be.ok
        expect(result).to.be.deep.equal(expected)
    })

    it("given a carCategory, customer and numberOfDays it should calculate final amount in real", async () => {
        const customer = Object.create(mocks.validCustomer)
        customer.age = 50

        const carCategory = Object.create(mocks.validCarCategory)
        carCategory.price = 37.6

        const numberOfDays = 5

        // Não depender de dados externos!
        sandbox.stub(
            carService,
            'taxesBasedOnAge'
        ).get(() => [{ from: 40, to: 50, then: 1.3 }])

        const expected = carService.currencyFormat.format(244.40)

        const result = carService.calculateFinalPrice(
            customer,
            carCategory,
            numberOfDays
        )

        expect(result).to.be.deep.equal(expected)
    })

    it('given a customer and a car category it should be return a transaction receipt', async () => {
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
        // stub of Date api
        const now = new Date(2020, 10, 5)
        sandbox.useFakeTimers(now.getTime())

        const expectedAmount = carService.currencyFormat.format(206.80)

        sandbox.stub(
            carService.carsRepository,
            carService.carsRepository.find.name,
        ).resolves(car)

        const result = carService.rent(
            customer, carCategory, numberOfDays
        )


        const expected = new Transaction({
            customer,
            car,
            dueDate,
            amount: expectedAmount
        })

        expect(result).to.be.deep.equal(result)
    })
})
