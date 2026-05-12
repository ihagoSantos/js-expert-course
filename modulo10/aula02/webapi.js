import http from 'http'

import { Readable } from 'stream'

function api1(request, response) {
    
    // response.write('teste01\n')
    // response.write('teste02\n')
    // response.write('teste03\n')

    // return request.pipe(response)
    let count = 0
    const maxItems = 99
    const readable = Readable({
        read() {
            const everySecond = (intervalContext) => {
                if(count++ <= maxItems) {
                    this.push(JSON.stringify({ id: Date.now() + count, name: `Ihago-${count}` }) + "\n")
                    return
                }

                clearInterval(intervalContext)
                this.push(null)
            }

            setInterval(function () { everySecond(this) })
        }
    })

    readable.pipe(response)
}

function api2(request, response) {
    let count = 0
    const maxItems = 99
    const readable = Readable({
        read() {
            const everySecond = (intervalContext) => {
                if(count++ <= maxItems) {
                    this.push(JSON.stringify({ id: Date.now() + count, name: `Zézin-${count}` }) + "\n")
                    return
                }

                clearInterval(intervalContext)
                this.push(null)
            }

            setInterval(function () { everySecond(this) })
        }
    })

    readable.pipe(response)
}

http.createServer(api1).listen(3000, () => console.log('server running at 3000'))
http.createServer(api2).listen(4000, () => console.log('server running at 4000'))