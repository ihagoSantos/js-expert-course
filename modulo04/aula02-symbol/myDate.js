const kItems = Symbol('kItems')

export default class MyDate {
    constructor(...args) {
        this[kItems] = args.map(arg => new Date(...arg))
    }

    get [Symbol.toStringTag]() {
        return 'WHAT?'
    }

    [Symbol.toPrimitive](coercionType) {
        if(coercionType !== "string") throw new TypeError()

        const items = this[kItems]
            .map(item => 
                    new Intl
                        .DateTimeFormat('pt-BR', {
                            month: 'long', day: '2-digit', year: 'numeric'
                        })
                        .format(item)
            )
        return new Intl
            .ListFormat('pt-BR', { style: 'long', type: 'conjunction'})
            .format(items)
        // return this[kItems].map(item => )
    }

    *[Symbol.iterator]() { // adicionar o * para permitir o uso do yield
        for (const item of this[kItems]) {
            yield item
        }
    }
    async *[Symbol.asyncIterator]() { // adicionar o * para permitir o uso do yield
        const timeout = ms => new Promise(r => setTimeout(r, ms))

        for(const item of this[kItems]){
            await timeout(100)
            yield item.toISOString()
        }
    }
}
