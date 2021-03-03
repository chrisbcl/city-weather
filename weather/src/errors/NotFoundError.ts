import { CustomError } from './CustomError';

export class NotFoundError extends CustomError {
    statusCode: number = 404;

    constructor() {
        super('Route not found');

        // Only because we are extending a built in class
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors(): { message: string } {
        return { message: 'Not found' };
    }
}
