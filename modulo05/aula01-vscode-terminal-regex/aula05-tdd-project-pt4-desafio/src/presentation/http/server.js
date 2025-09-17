const http = require('http')
const routes = require('./routes/routes')


const handler = (request, response) => {
    const { url, method } = request
    const routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`
    const chosen = routes[routeKey] || routes.default
    return chosen(request, response)
}

const app = http.createServer(handler)
    .listen(3000, () => console.log('server is running'))

module.exports = app