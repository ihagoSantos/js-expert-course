import Http from 'http'

// middleware, interceptor, gateway -> decorator
async function InjectHttpInterceptor() {
    const oldEmit = Http.Server.prototype.emit;
    Http.Server.prototype.emit = function(...args) {
        const [type, req, res] = args
        if(type === 'request') {
            res.setHeader('X-Instrumented-By', 'IhagoSantos')
        }
        return oldEmit.apply(this, args)
    }
}

export {InjectHttpInterceptor}