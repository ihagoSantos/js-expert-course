import Util from '../util.js'

const componentNameAnchor = '$$componentName'

const template = `
export default class ${componentNameAnchor}Repository {
    constructor() {

    }

    create(data){
        return Promise.reject("method not implemented!")
    }

    read(query) {
        return Promise.reject("method not implemented!")
    }

    update(id, data){
        return Promise.reject("method not implemented!")
    }

    delete(id){
        return Promise.reject("method not implemented!")
    }
}
`

export function repositoryTemplate (componentName) {
    componentName = Util.lowerCaseFirstLetter(componentName)

    const className = Util.upperCaseFirstLetter(componentName)
    return {
        fileName: `${componentName}Repository`,
        template: template.replaceAll(componentNameAnchor, className)
    }
}