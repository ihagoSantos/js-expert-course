import { MongoClient } from 'mongodb'
import {createServer} from 'http'
import {promisify} from 'util'
import "dotenv/config"
async function dbConnect() {
    const client = new MongoClient(process.env.MONGO_DB_ATLAS_CONNECTION_URL)
    await client.connect()
    console.log("mongodb is connected")
    const db = client.db('comics')
    return {
        collections: { heroes: db.collection('heroes') },
        client
    }
}

const { collections, client } = await dbConnect()

async function handler(request, response) {
    for await (const data of request){
        try {
            const hero = JSON.parse(data)

            await collections.heroes.insertOne({ 
                ...hero,
                updatedAt: new Date().toISOString(),  
            })
            const heroes = await collections.heroes.find().toArray()
            console.log({ heroes })
            response.writeHead(200)
            response.write(JSON.stringify(heroes))
        } catch (error) {
            console.error('a request error has happened', error)
            response.writeHead(500)
            response.write(JSON.stringify('internal server error'))
        } finally {
            response.end()
        }
    }
}

// await client.close()

/**
 * curl -i localhost:3000 -X POST --data '{"name": "Batman", "age": "50"}'
 */
const server = createServer(handler)
    .listen(3000, () => console.log('running at 3000 and process', process.pid))


const onStop = async (signal) => {
    console.info(`${signal} signal recieved!`)

    console.log('closing http server...')
    await promisify(server.close.bind(server))()
    console.log('http server has closed!')

    //close(true) força o encerramento
    console.log('closing mongo connection...')
    await client.close()
    console.log('mongo connection has closed!')
    // zero é tudo certo, 1 é erro!
    process.exit(0)
}
// SIGINT -> ctrl + c
// SIGTERM -> kill <pid>
['SIGINT', 'SIGTERM'].forEach(event => {
    process.on(event, onStop)
});