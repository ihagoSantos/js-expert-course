import mocha from 'mocha'
const { describe, it } = mocha
import chai from 'chai'
const { expect } = chai
import Person from '../src/person.js'

describe('Person', () => {
    it('should be return a person instance from a string', () => {
        const person = Person.generateInstanceFromString(
            '1 Bike,Car 20 2020-01-01 2021-01-01'
        )
        const expected = {
            from: '2020-01-01',
            to: '2021-01-01',
            vehicles: ['Bike', 'Car'],
            kmTraveled: '20',
            id: '1'
        }
        expect(person).to.be.deep.equal(expected)
    })

    it('should format values', () => {
        const person = new Person({
            from: '2020-01-01',
            to: '2021-01-01',
            vehicles: ['Bike', 'Car'],
            kmTraveled: '20',
            id: '1'
        })
        const result = person.formatted('pt-BR')

        const expected = {
            id: 1,
            vehicles: 'Bike e Car',
            kmTraveled: '20 km',
            from: '01 de janeiro de 2020',
            to: '01 de janeiro de 2021'
        }

        expect(result).to.be.deep.equal(expected)
    })
})