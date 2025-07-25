const { describe, it, before, beforeEach, afterEach } = require("mocha")
const { expect } = require('chai')
const sinon = require('sinon')



const CarService = require('../../src/service/carService')
const { join } = require('path')

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
})
