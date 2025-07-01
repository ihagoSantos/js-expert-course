const CarController = require('../controllers/carControllers')
const controller = new CarController();
const routes = {
    '/rent:post': (req, res) => controller.rent(req, res),
    default: (request, response) => {
        response.writeHead(404)
        return response.end('not found!')
    }
}

module.exports = routes