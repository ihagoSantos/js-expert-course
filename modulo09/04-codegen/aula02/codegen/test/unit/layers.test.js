import {
    expect,
    describe,
    it,
    jest,
    beforeEach,
} from '@jest/globals'

import { createLayersIfNotExists } from '../../src/createLayers.js'
import fsPromises from 'fs/promises'
import fs from 'fs'

describe('#Layers - Folder Structure', () => {
    const defaultLayers = ['service', 'repository', 'factory']
    beforeEach(() => {
        jest.restoreAllMocks()
        jest.clearAllMocks()
    })

    it('should create folders if it doesent exists', async () => {
        jest.spyOn(fsPromises, 'mkdir').mockResolvedValue()
        jest.spyOn(fs, 'existsSync').mockReturnValue(false)
        await createLayersIfNotExists({ mainPath: '', layers: defaultLayers })

        expect(fs.existsSync).toHaveBeenCalledTimes(defaultLayers.length)
        expect(fsPromises.mkdir).toHaveBeenCalledTimes(defaultLayers.length)
    })
    it('should not create folders if it exists', async () => {
        jest.spyOn(fsPromises, 'mkdir').mockResolvedValue()
        jest.spyOn(fs, 'existsSync').mockReturnValue(true)
        await createLayersIfNotExists({ mainPath: '', layers: defaultLayers })

        expect(fs.existsSync).toHaveBeenCalledTimes(defaultLayers.length)
        expect(fsPromises.mkdir).not.toHaveBeenCalled()
    })
})