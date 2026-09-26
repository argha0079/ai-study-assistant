import { StatusCodes } from "http-status-codes";

class UnauthorizedError extends Error {
    constructor(message = "Unauthorized", code = "UNAUTHORIZED") {
        super(message);
        this.name = "UnauthorizedError";
        this.message = message;
        this.statusCode = StatusCodes.UNAUTHORIZED;
        this.code = code;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default UnauthorizedError;
