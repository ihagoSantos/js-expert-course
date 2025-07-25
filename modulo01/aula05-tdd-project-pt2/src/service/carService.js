const BaseRepository = require("../repository/base/baseRepository")

class CarService {
    constructor({ cars }) {
        this.carsRepository = new BaseRepository({ file: cars })
    }

    getRandomPositionFromArray(list) {
        const listLenght = list.length
        return Math.floor(
            Math.random() * listLenght
        )
    }

    chooseRandomCar(carCategory) {
        const randomCarIndex = this.getRandomPositionFromArray(carCategory.carIds)
        const carId = carCategory.carIds[randomCarIndex]
        return carId
    }
    async getAvailableCar(carCategory) {
        const carId = this.chooseRandomCar(carCategory)
        const car = await this.carsRepository.find(carId)
        return car
    }
}

module.exports = CarService