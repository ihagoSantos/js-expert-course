import { Writable, PassThrough } from 'stream'

import axios from 'axios'

const API_01 = 'http://localhost:3000'
const API_02 = 'http://localhost:4000'

const request = await Promise.all([
    axios({
        method: 'get',
        url: API_01,
        responseType: 'stream'
    }),
    axios({
        method: 'get',
        url: API_02,
        responseType: 'stream'
    })
])

const results = request.map(({ data }) => data)

const output = Writable({
    write(chunk, enc, cb) {
        const data = chunk.toString().replace(/\n/, "")
        // ?=- -> ele faz procurar a partir do - e olhar para traz
        // :"(?<name>.*) -> procura pelo conteúdo dentro das aspas após o : e extrai somente o name
        const name = data.match(/:"(?<name>.*)(?=-)/).groups.name
        console.log(`[${name.toLowerCase()}] ${data}`)
        cb()
    }
})

// results[0].pipe(output)
// results[1].pipe(output)

function merge(streams) {
    return streams.reduce((prev, current, index, items) => {
        // impede que a stream feche sozinha
        current.pipe(prev, { end: false})
        // como colocamos end: false, vamos manipular manualmente quando o nosso current terminar
        // quando ele terminar, vamos verificar se todos no pipeline se encerraram
        // ele vai então forcar a cadeia do anterior a se fechar
        current.on('end', () => items.every(s => s.ended) && prev.end())

        return prev
    }, new PassThrough())
}

const streams = merge(results).pipe(output)