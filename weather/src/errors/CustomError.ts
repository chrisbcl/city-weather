/**
 * Custom Error class
 */
export abstract class CustomError extends Error {
    constructor(message: string) {
        super(message);

        // Only because we are extending a built in class
        Object.setPrototypeOf(this, CustomError.prototype);
    }

    abstract readonly statusCode: number;
    abstract serializeErrors(): { message: string };
}
