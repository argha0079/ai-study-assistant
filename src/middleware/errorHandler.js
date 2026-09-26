import logger from "../config/loggerConfig.js";
import PrismaError from "../utils/errors/PrismaError.js";

function errorHandler(err, req, res, _next) {
    let handledError = err;

    if (err.name && err.name.startsWith("Prisma")) {
        handledError = new PrismaError(err);
    }

    logger.error({
        name: err.name,
        message: err.message,
        stack: err.stack,
        path: req.originalUrl,
    });

    const statusCode = handledError.statusCode || 500;
    const errorCode = handledError.code || "INTERNAL_ERROR";
    const errorMessage = handledError.message || "Something went wrong";

    const response = {
        error: {
            code: errorCode,
            message: errorMessage,
        },
    };

    if (handledError.details) {
        response.error.details = handledError.details;
    }

    res.status(statusCode).json(response);
}

export default errorHandler;
