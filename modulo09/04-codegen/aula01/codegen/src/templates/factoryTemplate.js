import Util from '../util.js'

const serviceNameAnchor = '$$serviceName'
const repositoryNameAnchor = '$$repositoryName'

const serviceNameDepAnchor = '$$serviceNameDep'
const repositoryNameDepAnchor = '$$repositoryNameDep'

const componentNameAnchor = '$$componentName'


const template = `
import ${serviceNameAnchor} from '../service/${serviceNameDepAnchor}.js'

import ${repositoryNameAnchor} from '../repository/${repositoryNameDepAnchor}.js'
export default class ${componentNameAnchor}Factory {
    static getInstance() {
        const repository = new ${repositoryNameAnchor}()
        const service = new ${serviceNameAnchor}({ repository })
        return service
    }
}
`

export function factoryTemplate (componentName, repositoryName, serviceName) {
    componentName = Util.lowerCaseFirstLetter(componentName)
    repositoryName = Util.lowerCaseFirstLetter(repositoryName)
    serviceName = Util.lowerCaseFirstLetter(serviceName)

    const txtFile = template
        .replaceAll(componentNameAnchor, Util.upperCaseFirstLetter(componentName))

        .replaceAll(serviceNameDepAnchor, serviceName)
        .replaceAll(repositoryNameDepAnchor, repositoryName)

        .replaceAll(serviceNameAnchor, Util.upperCaseFirstLetter(serviceName))
        .replaceAll(repositoryNameAnchor, Util.upperCaseFirstLetter(repositoryName))

    return {
        fileName: `${componentName}Factory`,
        template: txtFile
    }
}

