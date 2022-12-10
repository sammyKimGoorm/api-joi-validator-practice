class ApiError extends Error {
    constructor({ statusCode, message, errorCode }) {
        super(message);
        this.statusCode = statusCode
        this.message = message
        this.code = errorCode

        Error.captureStackTrace(this, this.constructor);
    }
}


module.exports = ApiError