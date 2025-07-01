const { once } = require('events')
const { join } = require('path')
const CarService = require('../../../service/carService')
const carDatabase = join(__dirname, "../../../../database/cars.json")

class CarController {

    constructor() {
        this.carService = new CarService({
            cars: carDatabase
        })
    }

    async rent(request, response) {
        try {
            const { customer, carCategory, numberOfDays } = JSON.parse(await once(request, 'data'))

            const validation = this.validateData({ customer, carCategory, numberOfDays })
            if (!validation.isValid) {
                throw new Error(validation.message)
            }

            const data = await this.carService.rent(customer, carCategory, numberOfDays)
            response.writeHead(200)
            return response.end(JSON.stringify({
                data
            }))

        } catch (error) {
            response.writeHead(400)
            return response.end(error.message)
        }
    }

    validateData({ customer, carCategory, numberOfDays }) {
        if (!this.isNumberOfDaysValid(numberOfDays)) {
            return {
                isValid: false,
                message: 'numberOfDays is invalid'
            }
        }

        if (!this.isCustomerValid(customer)) {
            return {
                isValid: false,
                message: 'customer is invalid'
            }
        }

        if (!this.isCarCategoryValid(carCategory)) {
            return {
                isValid: false,
                message: 'carCategory is invalid'
            }
        }

        return {
            isValid: true,
        }
    }


    isNumberOfDaysValid(numberOfDays) {
        return numberOfDays ? true : false
    }

    isCustomerValid(customer) {
        if (!customer) return false
        if (typeof customer != 'object' || Array.isArray(customer)) return false
        if (!customer?.age) return false
        return true
    }

    isCarCategoryValid(carCategory) {
        if (!carCategory) return false
        if (!carCategory?.carIds) return false
        if (!carCategory?.price) return false
        return true
    }
}


module.exports = CarController