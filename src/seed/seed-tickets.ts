import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';
import { Ticket as TicketSchema } from '../modules/ticket/data/schema';
import { TicketStatus, TicketPriority, Ticket } from '../modules/ticket/entity';
import { ticketEntitiesToTicketRecords, ticketRecordsToTicketEntities } from '../modules/ticket/data/transformer';
import { TicketBusinessManager } from '../modules/ticket/business';
import { connectToDatabase } from '../connection';

dotenv.config();

export async function importTickets() {
    return new Promise<Ticket[]>(async (resolve, reject) => {
        try {
            await connectToDatabase();
            // let existingTickets = await new TicketBusinessManager().tickets(null, null, null, null);
            // if (existingTickets?.length != 0) {
            //     return resolve(existingTickets)
            // } else {
                console.log(`Seeding tickets, in process`);

                const count = Number(process.env.TICKET_SEED_COUNT);

                const ticketSeedData: Ticket[] = Array.from({ length: count }).map(() => ({
                    title: faker.lorem.sentence(),
                    description: faker.lorem.sentence(),
                    status: faker.helpers.arrayElement([TicketStatus.OPEN, TicketStatus.IN_PROGRESS, TicketStatus.CLOSED] as const),
                    priority: faker.helpers.arrayElement([TicketPriority.LOW, TicketPriority.MEDIUM, TicketPriority.HIGH] as const),
                }));

            //     let tickets = await TicketSchema.insertMany(ticketEntitiesToTicketRecords(ticketSeedData));
                console.log(`Seeded ${ticketSeedData.length} tickets`);
            //     if (tickets?.length == count) {
            //         let ticketsData = ticketRecordsToTicketEntities(tickets);
                    console.log(`Seeding tickets, ended`);
                    return resolve(ticketSeedData)
            //     } else {
            //         return reject("Unable to Seed Ticket for the given count");
            //     }
            // }
        } catch (error) {
            reject(error);
        }
    })
};

// importTickets();
// process.exit(0);
