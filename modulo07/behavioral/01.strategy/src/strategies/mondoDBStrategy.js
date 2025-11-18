import mongodb from 'mongodb'
export default class MongoDBStrategy {
    #instance
    constructor(connectionString) {
        const { pathname: dbName } = new URL(connectionString) // validate URL
        this.connectionString = connectionString.replace(dbName, '')
        this.db = dbName.replace(/\W/, '') // remove leading slash
        this.collection = 'warriors'
    }

    async connect() {
        const client = new mongodb.MongoClient(this.connectionString, {
            // useUnifiedTopology: true,
        })
        await client.connect()
        const db = client.db(this.db).collection(this.collection)
        this.#instance = db
    }

    async create(item) {
        return this.#instance.insertOne(item)
    }

    async read(item) {
        return this.#instance.find(item).toArray()
    }
}