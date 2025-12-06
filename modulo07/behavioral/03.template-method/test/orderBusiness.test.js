import { describe, it, jest, beforeEach, expect } from '@jest/globals';

import Orderbusiness from '../src/business/orderBusiness.js'
import Order from '../src/entities/order.js';

describe('Test Suite for Template Method defign pattern', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    describe('OrderBusiness', () => {
        it('executing Order Business without Template Method', () => {
            const order = new Order({
                customerId: 1,
                amount: 100000,
                products: [{ description: 'ferrari' }]
            })
            const orderBusiness = new Orderbusiness()
            // todos devem obrigatoriamente lembrar de seguir a risca esse fluxo de execucao
            // se algum esquecer de chamar a funcao de valiidacao, pode quebrar todo o sistema
            const isValid = orderBusiness._validateRequiredFields(order)
            expect(isValid).toBeTruthy()

            const result = orderBusiness._create(order)
            expect(result).toBeTruthy()
        })
        it('executing Order Business with Template Method', () => {
            const order = new Order({
                customerId: 1,
                amount: 100000,
                products: [{ description: 'ferrari' }]
            })
            const orderBusiness = new Orderbusiness()
            const calledValidationSpy = jest.spyOn(
                orderBusiness,
                orderBusiness._validateRequiredFields.name
            )
            const calledCreationSpy = jest.spyOn(
                orderBusiness,
                orderBusiness._create.name
            )
            // Com template method, a sequencia de passos é sempre
            // executada e evita a replicação de lógica

            const result = orderBusiness.create(order)
            expect(result).toBeTruthy()
            expect(calledValidationSpy).toHaveBeenCalledWith(order)
            expect(calledCreationSpy).toHaveBeenCalledWith(order)
        })
    })
})