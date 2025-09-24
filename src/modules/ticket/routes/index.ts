import { Router, Request, Response, NextFunction } from 'express';
import { ticketInfoToTickeEntity } from './transformer';
import { TicketBusinessManager } from '../business';
import { StatusCodes } from 'http-status-codes';

const router = Router();

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const ticket = await new TicketBusinessManager().ticketWithId(id);
        res.status(StatusCodes.OK).send(ticket);
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).send("Ticket Not Found");
    }
});

router.get('/', async (req: Request, res: Response) => {
    try {
        let search: string
        if (req.query.search) {
            search = req.query.search?.toString()
        }

        let filter: any = {}
        if (req.query.status) {
            filter['status'] = req.query.status
        }
        if (req.query.priority) {
            filter['priority'] = req.query.priority
        }
        let page = Number(req.query.page) || 1;
        let limit = Number(req.query.limit) || 10;

        let tickets = await new TicketBusinessManager().tickets(search, filter, page, limit);
        let totalCount = await new TicketBusinessManager().countTickets(search, filter);
        res.status(StatusCodes.OK).send({ data: tickets, total: totalCount });
    } catch (error) {
        res.status(StatusCodes.OK).send([]);
    }
});

router.post('/', async (req: Request, res: Response) => {
    try {
        let ticketInfo = req.body;
        let ticket = ticketInfoToTickeEntity(ticketInfo);
        const persistedTicket = await new TicketBusinessManager().createTicket(ticket);
        res.status(StatusCodes.CREATED).send(persistedTicket);
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).send("Unable to Create Ticket");
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        let changes = ticketInfoToTickeEntity(req.body);
        const ticket = await new TicketBusinessManager().updateTicketWithChangeById(id, changes);
        res.status(StatusCodes.OK).send(ticket);
    } catch (_err) {
        res.status(StatusCodes.BAD_REQUEST).send('Invalid update data');
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await new TicketBusinessManager().deleteTicketWithId(id);
        res.status(StatusCodes.OK).send('sucess');
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).send("Unable to delete Ticket");
    }
});

export default router;


