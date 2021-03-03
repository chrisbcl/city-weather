import { Request, Response, NextFunction } from 'express';

export const logRequests = (req: Request, _res: Response, next: NextFunction): void => {
    console.log(req.ip, req.url, req.method, req.hostname, req.originalUrl);
    next();
};
