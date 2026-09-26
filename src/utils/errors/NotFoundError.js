import { StatusCodes } from "http-status-codes";

class NotFoundError extends Error {
    constructor(message = "Resource not found", code = "RESOURCE_NOT_FOUND") {
        super(message);
        this.name = "NotFoundError";
        this.message = message;
        this.statusCode = StatusCodes.NOT_FOUND;
        this.code = code;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default NotFoundError;
