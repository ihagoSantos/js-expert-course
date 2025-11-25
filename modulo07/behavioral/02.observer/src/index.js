import Payment from "./events/payment.js";
import Marketing from "./observers/marketing.js";
import Shipment from "./observers/shipment.js";
import PaymentSubject from "./subjects/paymentSubject.js";

const subject = new PaymentSubject();
const shipment = new Shipment();
const marketing = new Marketing();

subject.subscribe(shipment)
subject.subscribe(marketing)

const payment = new Payment(subject)

payment.creditCard({
    id: Date.now(),
    userName: 'ihago'
})

subject.unsubscribe(marketing)
payment.creditCard({
    id: Date.now(),
    userName: 'maria'
})