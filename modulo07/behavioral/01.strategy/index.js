import ContextStrategy from "./src/base/contextStrategy.js"
import MongoDBStrategy from "./src/strategies/mondoDBStrategy.js"
import PostgresStrategy from "./src/strategies/postgresStrategy.js"

const postgresConnectionString = "postgres://ihagosantos:senha123@localhost:5432/heroes"
const postgresContext = new ContextStrategy(new PostgresStrategy(postgresConnectionString))
await postgresContext.connect()

const mongoDBConnectionString = "mongodb://ihagosantos:senhaadmin@localhost:27017/heroes"
const mongoDBContext = new ContextStrategy(new MongoDBStrategy(mongoDBConnectionString))

await mongoDBContext.connect()
const data = [
    { name: 'alicevanderburgo', type: 'transaction' },
    { name: 'mariasilva', type: 'activityLog' },
]

// postgresContext.create({ name: data[0].name })
// console.log(await postgresContext.read())

// mongoDBContext.create({ name: data[1].name })
// console.log(await mongoDBContext.read())

const contextTypes = {
    transaction: postgresContext,
    activityLog: mongoDBContext,
}

for (const { type, name } of data) {
    const context = contextTypes[type]
    await context.create({ name: `${name}_${Date.now()}` })
    console.log(type, await context.dbStrategy.constructor.name)
    console.log(await context.read())
}