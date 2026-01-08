import { expect, describe, test, jest, beforeEach } from '@jest/globals'
import { RickAndMortyUSA } from '../../src/business/integrations/rickAndMortyUSA.js'
import { RickAndMortyUSAAdapter } from '../../src/business/adapters/rickAndMortyUSAAdapter.js'

describe("#RickAndMortyUSAAdapter", () => {
    beforeEach(() => { jest.clearAllMocks() })
    test("#getCharacters should be an adapter from RickAndMortyUSA.getCharactersFromXML", async () => {
        const USAIntegration = jest.spyOn(RickAndMortyUSA, 'getCharactersFromXML').mockResolvedValue([])
        await RickAndMortyUSAAdapter.getCharacters()
        expect(USAIntegration).toHaveBeenCalledTimes(1)
    })
})