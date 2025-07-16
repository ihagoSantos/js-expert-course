'use strict';

const { watch, promises: { readFile } } = require('fs')

// watch(__filename, async (event, filename) => {
//     console.log((await readFile(filename)).toString())
// })

class File {
    watch(event, filename) {
        console.log('this', this)
        console.log('arguments', Array.prototype.slice.call(arguments))
        this.showContent(filename)
    }
    async showContent(filename) {
        console.log((await readFile(filename)).toString())
    }
}

const file = new File()

/**
 * dessa forma, ele ignora o 'this' da classe File e herda o 'this' do watch!
 */
// watch(__filename, file.watch)
/**
 * alternativa para não herdar o this da funcao
 * mas fica feio! kkkk
 */
// watch(__filename, (event, filename) => file.watch(event, filename))

/**
 * podemos deixar explícito qual é o contexto que essa função deve seguir
 * o .bind retorna uma funçção com o 'this' que se mantém de file, ignorando o watch
 * o .bind() substitui o 'this' dessa função e retorna uma nova
 * sempre que for delegar uma função para que outra execute passe o .bind() com o contexto que você quer
 * que o 'this' siga
 */
// watch(__filename, file.watch.bind(file)) 

/**
 * a diferença entre um e outro, é que você passa os argumentos como array e outro uma lista de argumentos
 */
file.watch.call({ showContent: () => console.log('hey sinon!') }, null, __filename)
file.watch.apply({ showContent: () => console.log('hey sinon!') }, [null, __filename])
