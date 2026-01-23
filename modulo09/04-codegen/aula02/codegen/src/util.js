export default class Util {
    
    // ihago => [0] => i
    // first = i, rest = hago
    static #transform({ str: [ first, ...rest ], upperCase = true }) {
        const firstLetter = upperCase ?
            first.toUpperCase() :
            first.toLowerCase()
        return [firstLetter, ...rest].join('')
    }

    static upperCaseFirstLetter(str) {
        if(!str) return str
        return Util.#transform({str})
    }
    
    static lowerCaseFirstLetter(str) {
        if(!str) return str
        return Util.#transform({str, upperCase: false})
    }
}