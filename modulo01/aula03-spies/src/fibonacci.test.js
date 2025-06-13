const Fibonacci = require('./fibonacci')
const { createSandbox } = require('sinon')
const assert = require('assert')

const sinon = createSandbox();


; (async () => {
    {
        const fibonacci = new Fibonacci();
        const spy = sinon.spy(
            fibonacci,
            fibonacci.execute.name
        )

        // Número de Sequências: 5
        // [0] input = 5, current = 0, next = 1, resultado = 0
        // [1] input = 4, current = 1, next = 1, resultado = 1
        // [2] input = 3, current = 1, next = 2, resultado = 1
        // [3] input = 2, current = 2, next = 3 -> PARA


        for (const sequencia of fibonacci.execute(3)) {
            // console.log({ sequencia })   
        }

        const expectedCallCount = 4
        assert.strictEqual(spy.callCount, expectedCallCount)
    }

    {
        const fibonacci = new Fibonacci();
        const spy = sinon.spy(
            fibonacci,
            fibonacci.execute.name
        )

        // Número de Sequências: 5
        // [0] input = 5, current = 0, next = 1, resultado = 0
        // [1] input = 4, current = 1, next = 1, resultado = 1
        // [2] input = 3, current = 1, next = 2, resultado = 1
        // [3] input = 2, current = 2, next = 3, resultado = 2
        // [4] input = 1, current = 3, next = 5, resultado = 3
        // [5] input = 0 -> PARA

        const results = [...fibonacci.execute(5)] // transforma todas as saídas da generator function em um array

        const expectedCallCount = 6
        assert.strictEqual(spy.callCount, expectedCallCount)
        // console.log(spy.getCalls()) // visualizar todas as chamadas
        const { args } = spy.getCall(2)
        const expectedParams = [3, 1, 2]
        assert.deepStrictEqual(args, expectedParams, "Erro: Os arrays não são iguais!")
        const expectedResults = [0, 1, 1, 2, 3]
        assert.deepStrictEqual(results, expectedResults, "Erro: Os resultados não são iguais!")
    }


})()