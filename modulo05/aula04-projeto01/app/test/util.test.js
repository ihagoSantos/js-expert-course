const { describe, it } = require('mocha')
const { expect } = require('chai')
const { evaluateRegex, InvalidRegexError } = require('../src/utils')
describe('Util', () => {
    it('#evaluateRegex should throw an error using an unsafe regex', () => {
        const unsafeRegex = /^([a-z|A-Z|0-9]+\s?)+$/
        /**
         * Fica rodando em looping e quebra -> catastrofic backtracking
         * 
        time \
        node --eval "/^([a-z|A-Z|0-9]+\s?)+$/.test('e aeee man como vai voce e como vai voce e como vai voce e como vai voce e como vai voce e como vai voce?') && console.log('legal')"
         *  */ 
        expect(() => {
            evaluateRegex(unsafeRegex)
        }).to.throw(InvalidRegexError, `This ${unsafeRegex} is unsafe!`)
    })

    it('#evaluateRegex should not throw an error using an valid regex', () => {
        const validRegex = /^([a-z])$/
        expect(() => {evaluateRegex(validRegex)}).to.not.throw
        expect(evaluateRegex(validRegex)).to.be.deep.equal(validRegex)
    })
})