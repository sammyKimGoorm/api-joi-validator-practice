exports.errorCatchHandler = (callback) => (req, res, next) =>
    Promise.resolve(callback).catch((error) => next(error));
