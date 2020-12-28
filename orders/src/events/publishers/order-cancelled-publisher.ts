import { Publisher, Subjects, OrderCancelledEvent } from '@ej-tickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    readonly subject = Subjects.OrderCancelled;
}
