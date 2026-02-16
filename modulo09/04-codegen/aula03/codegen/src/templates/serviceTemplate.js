import Util from '../util.js'

const componentNameAnchor = '$$componentName'
const currentContextAnchor = '$$currentContext'
const repositoryAnchor = '$$repositoryName'

const template = `
export default class ${componentNameAnchor}Service {
    constructor({ repository: ${repositoryAnchor} }){ 
        ${currentContextAnchor} = ${repositoryAnchor}
    }
    
    create(data){
        return ${currentContextAnchor}.create(data)
    }

    read(query) {
        return ${currentContextAnchor}.read(query)
    }

    update(id, data){
        return ${currentContextAnchor}.update(id, data)
    }

    delete(id){
        return ${currentContextAnchor}.delete(id)
    }
}
`

export function serviceTemplate (componentName, repositoryName) {
    componentName = Util.lowerCaseFirstLetter(componentName)
    repositoryName = Util.lowerCaseFirstLetter(repositoryName)

    const currentContext = `this.${repositoryName}`
    const txtFile = template
        .replaceAll(componentNameAnchor, Util.upperCaseFirstLetter(componentName))
        .replaceAll(currentContextAnchor, currentContext)
        .replaceAll(repositoryAnchor, repositoryName)

    return {
        fileName: `${componentName}Service`,
        template: txtFile
    }
}