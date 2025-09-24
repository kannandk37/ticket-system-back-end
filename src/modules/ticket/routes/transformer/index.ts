import { Ticket } from "../../entity"

export function ticketInfoToTickeEntity(ticketInfo: any) {
    let ticket = new Ticket()
    if (ticketInfo.id) {
        ticket.id = ticketInfo.id
    }
    if (ticketInfo.title) {
        ticket.title = ticketInfo.title
    }
    if (ticketInfo.description) {
        ticket.description = ticketInfo.description
    }
    if (ticketInfo.status) {
        ticket.status = ticketInfo.status
    }
    if (ticketInfo.priority) {
        ticket.priority = ticketInfo.priority
    }
    return ticket
}

