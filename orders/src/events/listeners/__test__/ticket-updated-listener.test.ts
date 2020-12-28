import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { TicketUpdatedEvent } from '@ej-tickets/common';
import { natsWrapper } from '../../../nats-wrapper'
import { TicketUpdatedListener } from '../ticket-udpated-listener';
import { Ticket } from '../../../models/ticket';

const setup = async () => {
    // Create a listener
    const listener = new TicketUpdatedListener(natsWrapper.client);

    // Create and save a ticket
    const ticket = Ticket.build({
        id: mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20
    });
    await ticket.save();

    // Create a fake data object
    const data: TicketUpdatedEvent['data'] = {
        id: ticket.id,
        version: ticket.version + 1,
        title: 'new concert',
        price: 999,
        userId: 'This doesn\'t matter for this listener'
    }

    // Create a fake message object
    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    // Return
    return { listener, ticket, data, msg };
};


it('finds, updates, and saves a ticket', async () => {
    const {msg, data, ticket, listener } = await setup();
    
    await listener.onMessage(data, msg);

    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket!.title).toEqual(data.title);
    expect(updatedTicket!.price).toEqual(data.price);
    expect(updatedTicket!.version).toEqual(data.version);
});

it('acks the message', async () => {
    const { msg, data, listener } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});

it('does not call ack if the event has a skipped version number', async () => {
    const { data, msg, listener, ticket } = await setup();

    // Set the version of the data object to be much higher
    data.version = 10;

    try {
        await listener.onMessage(data, msg);
    } catch (err) {
        // do nothing
    }

    expect(msg.ack).not.toHaveBeenCalled();
})