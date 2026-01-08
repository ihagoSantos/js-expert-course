import { expect, describe, test, jest, beforeEach } from '@jest/globals'
import { RickAndMortyBRL } from '../../src/business/integrations/rickAndMortyBRL.js'
import { RickAndMortyBRLAdapter } from '../../src/business/adapters/rickAndMortyBRLAdapter.js'

describe("#RickAndMortyBRLAdapter", () => {
    beforeEach(() => { jest.clearAllMocks() })
    test("#getCharacters should be an adapter from RickAndMortyBRL.getCharactersFromJSON", async () => {
        const brlIntegration = jest.spyOn(RickAndMortyBRL, 'getCharactersFromJSON').mockResolvedValue([])
        await RickAndMortyBRLAdapter.getCharacters()
        expect(brlIntegration).toHaveBeenCalledTimes(1)
    })
})