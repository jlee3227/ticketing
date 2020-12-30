import { Subjects, Publisher, PaymentCreatedEvent } from '@ej-tickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}