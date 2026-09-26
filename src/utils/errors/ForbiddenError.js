import { StatusCodes } from "http-status-codes";

class ForbiddenError extends Error {
    constructor(message = "Forbidden", code = "FORBIDDEN") {
        super(message);
        this.name = "ForbiddenError";
        this.message = message;
        this.statusCode = StatusCodes.FORBIDDEN;
        this.code = code;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ForbiddenError;
