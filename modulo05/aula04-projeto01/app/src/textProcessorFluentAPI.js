const Person = require('./person')
const { evaluateRegex } = require('./utils')

/**
 * O objetivo do Fluent API é executar tarefas
 * como um pipeline, step by step e no fim chama
 * o build. MUITO similar ao padrão Builder.
 * A diferença que aqui é sobre processos, o Builder
 * é sobre construção de objetos.
 */
class TextProcessorFluentAPI {
    // propriedade privada
    #content
    constructor(content) {
        this.#content = content
    }

    extractPeopleData() {
        // ?<= fala que vai extrair os dados que virão depois desse grupo
        // [contratante|contratada] ou um ou outro, (e tem a flag no fim da expressão pra pegar maiuscula e minuscula)
        // :\s{1} vai procurar o caracter literal de dois pontos seguindo de um espaço
        // tudo acima fica dentro de um parenteses para falar "vamos pegar dai pra frente"

        // (?!\s) negative look around, vai ignorar os contratantes no fim do documento (que só tem espaço a frente deles)
        // .*\n pega qualquer coisa até o primeiro \n
        //.*? non greety, esse ? faz com que ele pare na primeira recorrencia, assim ele evita ficar em loop

        // $ informar que a pesquisa acaba no fim da linha
        // g -> global
        // m -> multiline
        // i -> insensitive
        const matchPerson = evaluateRegex(/(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gmi)
        // faz o match para encontrar a string inteira que contem os dados que precisamos
        const onlyPerson = this.#content.match(matchPerson)
        // console.log('onlyPerson', matchPerson.test(this.#content))
        this.#content = onlyPerson
        return this
    }

    divideTextInColumns() {
        const splitRegex = evaluateRegex(/,/)
        this.#content = this.#content.map(line => line.split(splitRegex))
        return this
    }

    removeEmptyCharacters() {
        const trimSpacesRegex = evaluateRegex(/^\s+|\s+$|\n/g)
        this.#content = this.#content.map(line => line.map(data => data.replace(trimSpacesRegex, '')))
        return this
    }
    
    mapPerson(){
        this.#content = this.#content.map(c => new Person(c))
        return this
    }

    build() {
        return this.#content
    }
}

module.exports = TextProcessorFluentAPI