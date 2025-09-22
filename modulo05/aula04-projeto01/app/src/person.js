const { evaluateRegex } = require('./utils')
class Person {
    // Find: (\w+):\s.*
    // Replace: $1,
    constructor([
        nome,
        nacionalidade,
        casada,
        documento,
        rua,
        numero,
        bairro,
        estado,
    ]) {
        // ^ -> começo da string
        // + -> um ou mais ocorrências
        // (\w{1}) -> pega só a primeira letra e deixa em um grupo
        // [a-zA-Z] -> encontra todas as letras maiusculas ou minusculas, adicionamos o + para ele pegar todas as letras até o final da linha
        // /g -> todas as ocorrências que encontrar
        const firstLetterExp = evaluateRegex(/(^\w{1})([a-zA-Z]+$)/g)
        const formatFirstLetter = (prop) => {
            return prop.replace(firstLetterExp, (fullMatch, group1, group2, index) => {
                // console.log(fullMatch, group1, group2, index)
                return `${group1.toUpperCase()}${group2.toLowerCase()}`
            })
        }
        // Find: (\w+),
        // Replace: this.$1
        this.nome = nome
        this.nacionalidade = formatFirstLetter(nacionalidade)
        this.casada = formatFirstLetter(casada)
        // /^CPF\s([0-9]{3}).([0-9]{3}).([0-9]{3})-([0-9]{2})$/gm Pode ser substituido por \D (tudo que não é digito)
        // /g serve para todas as ocorrências que encontrar
        this.documento = documento.replace(evaluateRegex(/\D/g), '') 
        // comeca a procurar depois do " a " e pega tudo o que tem a frente
        // (?<=) faz com que ignore tudo o que tiver antes desse match
        // conhecido como Positive Lookbehind
        this.rua = rua.match(evaluateRegex(/(?<=\sa\s).*$/)).join()
        this.numero = numero
        // começa a buscar depois do espaço, pega qualquer letra ou digito que até o fim da linha
        this.bairro = bairro.match(evaluateRegex(/(?<=\s).*/)).join()
        // remove o ponto literal (.) do fim da frase
        this.estado = estado.replace(/\./, '')
    }

}

module.exports = Person