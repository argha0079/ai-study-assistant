import { StatusCodes } from "http-status-codes";

class ValidationError extends Error {
    constructor(message = "Validation failed", details = null) {
        super(message);
        this.name = "ValidationError";
        this.message = message;
        this.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
        this.code = "VALIDATION_ERROR";
        this.details = details;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ValidationError;