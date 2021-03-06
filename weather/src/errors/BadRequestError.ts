import { CustomError } from './CustomError';

/**
 * Bad Request Error that returns a custom message with the 400 status code
 */
export class BadRequestError extends CustomError {
    readonly statusCode = 400;

    constructor(public readonly message: string) {
        super(message);

        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeErrors(): { message: string } {
        return { message: this.message };
    }
}
