import { StatusCodes } from "http-status-codes";

class ConflictError extends Error {
    constructor(message = "Conflict", code = "CONFLICT") {
        super(message);
        this.name = "ConflictError";
        this.message = message;
        this.statusCode = StatusCodes.CONFLICT;
        this.code = code;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ConflictError;
