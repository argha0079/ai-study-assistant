function errorHandler(err, req, res, next) {
    console.error(`[${new Date().toISOString()}] ${err.stack}`);
    res.status(500).json({
        error: { code: "INTERNAL_ERROR", message: "Something went wrong" }
    });
}

export default errorHandler;