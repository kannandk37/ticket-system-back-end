import { Ticket } from "../../entity"
import { ObjectId } from 'mongodb'

export function ticketRecordsToTicketEntities(ticketRecords: any[]) {
    let tickets: Ticket[] = [];
    ticketRecords.forEach((element) => {
        let ticket = ticketRecordToTicketEntity(element)
        tickets.push(ticket)
    });
    return tickets
}

export function ticketRecordToTicketEntity(ticketRecord: any) {
    let ticket = new Ticket()
    if (ticketRecord._id) {
        ticket.id = ticketRecord._id?.toString()
    }
    if (ticketRecord.title) {
        ticket.title = ticketRecord.title
    }
    if (ticketRecord.description) {
        ticket.description = ticketRecord.description
    }
    if (ticketRecord.status) {
        ticket.status = ticketRecord.status
    }
    if (ticketRecord.priority) {
        ticket.priority = ticketRecord.priority
    }
    if (ticketRecord.created_at) {
        ticket.createdAt = ticketRecord.created_at
    }
    if (ticketRecord.updated_at) {
        ticket.updatedAt = ticketRecord.updated_at
    }
    return ticket
}


export function ticketEntitiesToTicketRecords(tickets: Ticket[]) {
    let ticketRecords: any[] = [];
    tickets.forEach((element: Ticket) => {
        let ticketRecord = ticketEntityToTicketRecord(element)
        ticketRecords.push(ticketRecord)
    });
    return ticketRecords
}

export function ticketEntityToTicketRecord(ticket: Ticket) {
    let ticketRecord: any = {}
    if (ticket.id) {
        ticketRecord._id = new ObjectId(ticket.id);
    }
    if (ticket.title) {
        ticketRecord.title = ticket.title
    }
    if (ticket.description) {
        ticketRecord.description = ticket.description
    }
    if (ticket.status) {
        ticketRecord.status = ticket.status
    }
    if (ticket.priority) {
        ticketRecord.priority = ticket.priority
    }
    return ticket
}

