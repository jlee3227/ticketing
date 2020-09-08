import { Publisher, Subjects, TicketUpdatedEvent } from '@ej-tickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
}
