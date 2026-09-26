import { StatusCodes } from "http-status-codes";

class ServiceError extends Error {
    constructor(
        message = "Something went wrong",
        explanation = "Service layer error",
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR
    ) {
        super(message);
        this.name = "ServiceError";
        this.message = message;
        this.explanation = explanation;
        this.statusCode = statusCode;
        this.code = "SERVICE_ERROR";
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ServiceError;
