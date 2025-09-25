import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import createHttpError from 'http-errors';
import { connectToDatabase } from './connection';
import ticketsRouter from './modules/ticket/routes';
import { importTickets } from './seed/seed-tickets';
import type { VercelRequest, VercelResponse } from '@vercel/node';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const errorLogger = (error: Error, request: Request, response: Response, next: NextFunction) => {
    console.log(`error on calling url:: ${request.baseUrl}${request.url}`);
}

app.get('/test', (req: Request, res: Response) => {
    res.json({ status: 'ok' });
});

app.use('/api/tickets', ticketsRouter);

app.use((req: Request, _res: Response, next: NextFunction) => {
    next(createHttpError(404, 'Not Found'));
});

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        message: err.message || 'Internal Server Error',
        statusCode,
    });
});

app.use(errorLogger);

const port = process.env.PORT || 3000;

connectToDatabase()
    .then(async () => {
        console.log('connected to database');
        // below is for local
        // app.listen(port, () => {
        //     console.log(`Server running on http://localhost:${port}`);
        // });
        await importTickets();
    })
    .catch((error) => {
        console.error('Failed to connect to database', error);
        process.exit(1);
    });

// this is for vercel
export default (req: VercelRequest, res: VercelResponse) => {
    return app(req as any, res as any);
};
