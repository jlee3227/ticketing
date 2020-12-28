import { Publisher, Subjects, OrderCreatedEvent } from '@ej-tickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
}
