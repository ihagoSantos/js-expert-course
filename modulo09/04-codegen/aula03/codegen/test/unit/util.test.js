import {
    expect,
    describe,
    it,
    jest,
    beforeEach,
} from '@jest/globals'

import Util from '../../src/util.js'
describe('#Util - Strings', () => {

    beforeEach(() => {
        jest.restoreAllMocks()
        jest.clearAllMocks()
    })

    it('#upperCaseFirstLetter should transform the first letter in upperCase', () => {
        const data = 'hello'
        const expected = 'Hello'
        const result = Util.upperCaseFirstLetter(data)
        expect(result).toStrictEqual(expected)
    })
    it('#lowerCaseFirstLetter should transform the first letter in lowerCase', () => {
        const data = 'Hello'
        const expected = 'hello'
        const result = Util.lowerCaseFirstLetter(data)
        expect(result).toStrictEqual(expected)
    })
    it('#upperCaseFirstLetter give an empty string it should return empty', () => {
        const data = ''
        const expected = ''
        const result = Util.upperCaseFirstLetter(data)
        expect(result).toStrictEqual(expected)
    })
    it('#lowerCaseFirstLetter give an empty string it should return empty', () => {
        const data = ''
        const expected = ''
        const result = Util.lowerCaseFirstLetter(data)
        expect(result).toStrictEqual(expected)
    })
})