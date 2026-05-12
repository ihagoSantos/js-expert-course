import Http from 'http'

let count = 1;
async function handler(request, response) {
    count ++;
    try {
        if(count % 2 === 0) {
            await Promise.reject('error dentro do handler')
        }

        for await(const data of request ){
            try {
                if(count % 2 !== 0) {
                    await Promise.reject('error dentro do for')
                }
                // response.end()
                
            } catch (error) {
                console.log('a request error has happened', error)
                response.writeHead(500)
                response.write(JSON.stringify({ messaging: 'Request server error' }))
                // response.end()
            }
        }
    } catch (error) {
        console.log('a server error has happened', error)
        response.writeHead(500)
        response.write(JSON.stringify({ messaging: 'Internal server error' }))
        // response.end()
    } finally {
        response.end()
    }
}

Http.createServer(handler).listen(3000, () => console.log('Running at 3000'))