import { createServer } from 'http'
import { statusCodes } from './utils/httpStatusCodes.js'
import HeroEntity from './heroEntity.js'

async function handler(request, response){
    for await(const data of request){
        try {
            const parsedData = JSON.parse(data)
            // simulando um outro erro, por exemplo de bd
            if(Reflect.has(parsedData, "connectionError")){
                // só um erro genérico para trazer outro cenário de erro inesperado
                throw new Error("error connecting to DB!")
            }

            const hero = new HeroEntity(parsedData)
            
            if(!hero.isValid()) {
                response.writeHead(statusCodes.BAD_REQUEST)
                response.end(hero.notifications.join('\n'))
                continue;
            }
            
            // Cadastra no banco de dados ...

            response.writeHead(statusCodes.OK)
            response.end()
        } catch (error) {
            console.error({
                message: error.message,
                stack: error.stack
            })
            response.writeHead(statusCodes.INTERNAL_SERVER_ERROR)
            response.end()
        }
    }
}

createServer(handler)
    .listen(3000, () => console.log('running at 3000'))

/**
 * curl -i localhost:3000 -X POST --data '{"name": "vingador", "age": 80}'
 */