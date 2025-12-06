import { NotImplementedException } from "../../util/exceptions.js";
export default class BaseBusiness {
    _validateRequiredFields(data) {
        throw new NotImplementedException(
            this._validateRequiredFields.name
        )
    }
    _create(data) {
        throw new NotImplementedException(
            this._create.name
        )
    }

    /**
     * Padrão Template Method (Martin Fowler)
     * A proposta do padrão é garantr um fluxo de métodos,
     * definindo uma sequência a ser executada.
     * 
     * Esse create é a implementação efetiva do Template Method,
     */
    create(data) {
        const isValid = this._validateRequiredFields(data)
        if (!isValid) throw new Error('Invalid data')

        return this._create(data)
    }
}