export default class Marketing {
    update({ id, userName }) {
        // importante lembrar que o update é responsável por gerenciar seus errors/exceptions
        // não deve-se ter await no notify para evitar travar a thread. A responsabilidade é só emitir eventos
        console.log(`\n[${id}] - [marketing] will send an welcome email to ${userName}`)
    }
}