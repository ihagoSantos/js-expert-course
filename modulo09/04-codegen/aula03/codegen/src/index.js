#!/usr/bin/env node

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { createLayersIfNotExists } from './createLayers.js'
import { createFiles } from './createFiles.js'

const { argv: { componentName } } = yargs(hideBin(process.argv))
    .command('skeleton', 'create project skeleton', (builder) => {
        return builder
            .option('component-name', {
                alias: 'c',
                demandOption: true,
                describe: 'component\'s name',
                type: 'array'
            })
            .example('skeleton --component-name product', 'create a project with a single domain')
            .example('skeleton -c product -c person -c colors', 'create a project with a multiple domains')
    })
    .epilog('copyright 2026 - Ihago Santos')

const env = process.env.NODE_ENV
const defaultMainFolder = env === 'dev' ? 'tmp' : 'src'

const layers = [ 'repository', 'service', 'factory' ].sort()
const config = {
    layers,
    defaultMainFolder,
    mainPath: '.'
}

await createLayersIfNotExists(config)

const pendingPromises = []
for(const domain of componentName) {
    pendingPromises.push(createFiles({
        ...config,
        componentName: domain
    }))
}

await Promise.all(pendingPromises)