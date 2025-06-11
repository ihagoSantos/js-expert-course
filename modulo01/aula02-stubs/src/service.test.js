const Service = require('./service')
const assert = require('assert')
const { createSandbox } = require('sinon')
const sinon = createSandbox()

const BASE_URL_1 = 'https://pokeapi.co/api/v2/pokemon/1/'
const BASE_URL_2 = 'https://pokeapi.co/api/v2/pokemon/2/'

const mocks = {
    bulbasaur: require('./../mocks/bulbasaur.json'),
    ivysaur: require('./../mocks/ivysaur.json'),
};

; (async () => {

    // {
    //     // vai para a internet
    //     const service = new Service()
    //     const dados = await service.makeRequest(BASE_URL_2)
    //     console.log('dados', JSON.stringify(dados))
    // }

    const service = new Service()
    const stub = sinon.stub(
        service,
        service.makeRequest.name // retorna o nome do método como string
    )

    stub
        .withArgs(BASE_URL_1)
        .resolves(mocks.bulbasaur)
    stub
        .withArgs(BASE_URL_2)
        .resolves(mocks.ivysaur)

    {
        const expected = {
            id: 1,
            name: "bulbasaur",
            abilities: ['overgrow', 'chlorophyll']
        }
        const results = await service.getPokemon(BASE_URL_1)
        assert.deepStrictEqual(expected, results)

    }

    {
        const expected = {
            id: 2,
            name: "ivysaur",
            abilities: ['overgrow', 'chlorophyll']
        }
        const results = await service.getPokemon(BASE_URL_2)
        assert.deepStrictEqual(expected, results)

    }
})()