const { describe, it, after, before } = require('mocha')

const supertest = require('supertest')
const assert = require('assert')

describe('API Suite test', () => {
    let app
    before((done) => {
        app = require('./api')
        app.once('listening', done)
    })

    after((done) => {
        app.close(done)
    })
    describe('/contact:get', () => {
        it('should request the contact route and return HTTP status 200', async () => {
            const response = await supertest(app)
                .get('/contact')
                .expect(200)

            assert.strictEqual(response.text, 'contact us page')
        })
    })
    describe('/login:post', () => {
        it('should request the login route and return HTTP status 200', async () => {
            const response = await supertest(app)
                .post('/login')
                .send({ username: 'ihagosantos', password: '123' })
                .expect(200)

            assert.strictEqual(response.text, 'login succeeded!')
        })

        it('should request the login route and return HTTP status 401', async () => {
            const response = await supertest(app)
                .post('/login')
                .send({ username: 'xuxadasilva', password: 'erro' })
                .expect(401)

            assert.ok(response.unauthorized)
            assert.strictEqual(response.text, 'login failed!')
        })
    })
    describe("route not found", () => {
        it('should request unmaped route and return HTTP status 404', async () => {
            const response = await supertest(app)
                .get('/')
                .expect(404)
            assert.ok(response.notFound)
            assert.strictEqual(response.text, 'not found!')
        })
    })
})