import { expect, describe, it, jest, beforeAll } from '@jest/globals'
import PaymentSubject from '../src/subjects/paymentSubject'
import Payment from '../src/events/payment'
import Shipment from '../src/observers/shipment'
import Marketing from '../src/observers/marketing'

describe('Test Suite for Observer Pattern', () => {
    beforeAll(() => {
        jest.spyOn(console, console.log.name).mockImplementation(() => { })
    })
    it('#PaymentSubject notify observers', () => {
        const subject = new PaymentSubject()
        const observer = {
            update: jest.fn()
        }
        const data = 'hello world'
        const expected = data
        subject.subscribe(observer)
        subject.notify(data)

        expect(observer.update).toHaveBeenCalledWith(expected)
    })

    it('#PaymentSubject should not notify unsubscribed observers', () => {
        const subject = new PaymentSubject()
        const observer = {
            update: jest.fn()
        }
        const data = 'hello world'
        const expected = data
        subject.subscribe(observer)
        subject.unsubscribe(observer)
        subject.notify(data)

        expect(observer.update).not.toHaveBeenCalled()
    })

    it("#Payment should notify subject after a credit card transaction", () => {
        const subject = new PaymentSubject()
        const payment = new Payment(subject)
        const paymentSubjectNotifySpy = jest.spyOn(
            payment.paymentSubject,
            payment.paymentSubject.notify.name
        )
        const data = {
            userName: 'ihago',
            id: Date.now()
        }
        payment.creditCard(data)
        expect(paymentSubjectNotifySpy).toHaveBeenCalledWith(data)
    })
    it("#All should notify subscribed after credit card payment", () => {
        const shipment = new Shipment()
        const marketing = new Marketing()
        const shipmentSpy = jest.spyOn(shipment, shipment.update.name)
        const marketingSpy = jest.spyOn(marketing, marketing.update.name)

        const subject = new PaymentSubject()
        const payment = new Payment(subject)
        const data = { id: Date.now(), userName: 'ihago' }

        subject.subscribe(shipment)
        subject.subscribe(marketing)

        payment.creditCard(data)

        expect(shipmentSpy).toHaveBeenCalledWith(data)
        expect(marketingSpy).toHaveBeenCalledWith(data)
    })
})