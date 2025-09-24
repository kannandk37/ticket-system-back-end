import { Ticket } from "../entity";
import { Ticket as TicketSchema } from '../data/schema';
import { ticketEntityToTicketRecord, ticketRecordToTicketEntity, ticketRecordsToTicketEntities } from "./transformer";
import { ObjectId } from 'mongodb'

export class TicketDataManager {

    async tickets(search: string, filters: any, page: number, limit: number) {
        return new Promise<Ticket[]>(async (resolve, reject) => {
            try {
                const searchQuery = search
                    ? {
                        $or: [
                            { title: { $regex: search, $options: "i" } },
                            { description: { $regex: search, $options: "i" } },
                        ],
                    }
                    : {};

                const filtersData: any = {};
                if (filters) {
                    if (filters.status) {
                        filtersData.status = filters.status;
                    }
                    if (filters.priority) {
                        filtersData.priority = filters.priority;
                    }
                    if (filters.from || filters.to) {
                        filtersData.created_at = {};
                        if (filters.from) {
                            filtersData.created_at.$gte = new Date(filters.from);
                        }
                        if (filters.to) {
                            filtersData.created_at.$lte = new Date(filters.to);
                        }
                    }
                    if (filters.cursor) {
                        filtersData._id = {
                            $lt: new ObjectId(filters.cursor as string)
                        }
                    }
                }
                const query = { ...searchQuery, ...filtersData };
                let tickets = await TicketSchema
                    .find(query)
                    .sort({ created_at: -1, _id: -1 })
                    // .skip(page * limit) // offset based
                    .limit(limit);
                if (tickets?.length > 0) {
                    resolve(ticketRecordsToTicketEntities(tickets));
                } else {
                    resolve([])
                }
            } catch (error) {
                reject(error);
            }
        })
    }

    async createTicket(ticket: Ticket) {
        return new Promise<Ticket>(async (resolve, reject) => {
            try {
                let ticketData = ticketEntityToTicketRecord(ticket);
                let persistedTicket = await TicketSchema.create(ticketData);
                resolve(ticketRecordToTicketEntity(persistedTicket))
            } catch (error) {
                reject(error);
            }
        })
    }

    async ticketWithId(id: string) {
        return new Promise<Ticket>(async (resolve, reject) => {
            try {
                let persistedTicket = await TicketSchema.findById({
                    _id: new ObjectId(id)
                });
                if (persistedTicket) {
                    resolve(ticketRecordToTicketEntity(persistedTicket))
                } else {
                    resolve(null)
                }
            } catch (error) {
                reject(error);
            }
        })
    }

    async deleteTicketWithId(id: string) {
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                let persistedTicket = await TicketSchema.deleteOne({
                    _id: new ObjectId(id)
                });
                resolve(persistedTicket.acknowledged)
            } catch (error) {
                reject(error);
            }
        })
    }

    async countTickets(search: string, filters: any) {
        return new Promise<number>(async (resolve, reject) => {
            try {
                const searchQuery = search
                    ? {
                        $or: [
                            { title: { $regex: search, $options: "i" } },
                            { description: { $regex: search, $options: "i" } },
                        ],
                    }
                    : {};

                const filtersData: any = {};
                if (filters) {
                    if (filters.status) {
                        filtersData.status = filters.status;
                    }
                    if (filters.priority) {
                        filtersData.priority = filters.priority;
                    }
                    if (filters.from || filters.to) {
                        filtersData.created_at = {};
                        if (filters.from) {
                            filtersData.created_at.$gte = new Date(filters.from);
                        }
                        if (filters.to) {
                            filtersData.created_at.$lte = new Date(filters.to);
                        }
                    }
                }

                const query = { ...searchQuery, ...filtersData };
                let count = await TicketSchema.countDocuments(query);
                resolve(count)
            } catch (error) {
                reject(error);
            }
        })
    }

    async updateTicketWithChangeById(id: string, changes: Partial<Ticket>) {
        return new Promise<Ticket>(async (resolve, reject) => {
            try {
                let changesInfo = ticketEntityToTicketRecord(changes as Ticket);
                let persistedTicket = await TicketSchema.updateOne({
                    _id: new ObjectId(id)
                }, changesInfo);
                resolve(ticketRecordToTicketEntity(persistedTicket))
            } catch (error) {
                reject(error);
            }
        })
    }
}