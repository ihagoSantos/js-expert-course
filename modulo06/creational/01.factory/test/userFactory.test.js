const rewiremock = require('rewiremock/node')
const { deepStrictEqual } = require('assert')

// <poderia estar em outro arquivo>
const dbData = [{ name: 'Mariazinha' }, { name: 'Joaozinho' }]
class MockDatabase {
    connect = async () => this
    find = async (query) => dbData
}

rewiremock(() => require('./../src/util/database')).with(MockDatabase)

    ; (async () => {
        {
            const expected = [{ name: 'MARIAZINHA' }, { name: 'JOAOZINHO' }]
            rewiremock.enable()
            const UserFactory = require('../src/factory/userFactory') // precisa importar o user factory após habilitar o rewiremock para que o mock funcione
            const userFactory = await UserFactory.createInstance()

            const result = await userFactory.find()
            deepStrictEqual(result, expected)
            rewiremock.disable()
        }
        { // Não recomendado pois bate em um banco de dados externo
            const expected = [{ name: 'IHAGOSANTOS' }]
            const UserFactory = require('../src/factory/userFactory')

            const userFactory = await UserFactory.createInstance()
            const result = await userFactory.find()
            deepStrictEqual(result, expected)
        }
    })()