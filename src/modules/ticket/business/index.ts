import { TicketDataManager } from "../data";
import { Ticket } from "../entity";

export class TicketBusinessManager {

    async tickets(search: string, filter: any, page: number, limit: number) {
        return new Promise<Ticket[]>(async (resolve, reject) => {
            try {
                let ticketPersistor = new TicketDataManager();
                let tickets = await ticketPersistor.tickets(search, filter, page, limit);
                resolve(tickets);
            } catch (error) {
                reject(error);
            }
        })
    }

    async createTicket(ticket: Ticket) {
        return new Promise<Ticket>(async (resolve, reject) => {
            try {
                let ticketPersistor = new TicketDataManager();
                let persistedTicket = await ticketPersistor.createTicket(ticket);
                resolve(persistedTicket);
            } catch (error) {
                reject(error);
            }
        })
    }

    async ticketWithId(ticketId: string) {
        return new Promise<Ticket>(async (resolve, reject) => {
            try {
                let ticketPersistor = new TicketDataManager();
                let ticketDetails = await ticketPersistor.ticketWithId(ticketId);
                if (ticketDetails) {
                    resolve(ticketDetails);
                } else {
                    return reject("Ticket not Found");
                }
            } catch (error) {
                reject(error);
            }
        })
    }

    async updateTicketWithChangeById(ticketId: string, changes: Ticket) {
        return new Promise<Ticket>(async (resolve, reject) => {
            try {
                let ticketPersistor = new TicketDataManager();
                let ticketData = await this.ticketWithId(ticketId);
                if (ticketData) {
                    let updatedTicket = await ticketPersistor.updateTicketWithChangeById(ticketData.id, changes);
                    resolve(updatedTicket);
                } else {
                    return reject("Ticket not Found");
                }
            } catch (error) {
                reject(error);
            }
        })
    }

    async deleteTicketWithId(ticketId: string) {
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                let ticketPersistor = new TicketDataManager();
                let deletedTicket = await ticketPersistor.deleteTicketWithId(ticketId);
                resolve(deletedTicket);
            } catch (error) {
                reject(error);
            }
        })
    }

    async countTickets(search: string, filter: any) {
        return new Promise<number>(async (resolve, reject) => {
            try {
                let ticketPersistor = new TicketDataManager();
                let count = await ticketPersistor.countTickets(search, filter);
                resolve(count);
            } catch (error) {
                reject(error);
            }
        })
    }
}