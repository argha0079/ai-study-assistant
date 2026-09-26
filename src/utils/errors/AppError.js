class AppError extends Error {
    constructor(name, message, explanation, statusCode, code) {
        super(message);
        this.name = name;
        this.message = message;
        this.explanation = explanation;
        this.statusCode = statusCode;
        this.code = code;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;
