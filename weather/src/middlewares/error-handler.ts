import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/CustomError';

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
    if (err instanceof CustomError) {
        res.status(err.statusCode).send({ error: err.serializeErrors() });
        return;
    }

    console.error(err);
    res.status(400).send({ error: err.message });
};
