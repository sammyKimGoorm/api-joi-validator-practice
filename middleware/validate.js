const Joi = require("joi");
const { pick } = require("lodash");
const ApiError = require("../utils/errors/apiError");

exports.validate = (schema) => (req, res, next) => {
    const validSchema = pick(schema, ["query", "body", "params"]);
    const object = pick(req, Object.keys(validSchema));

    const { value, error } = Joi.compile(validSchema)
        .prefs({ errors: { label: "key" }, abortEarly: false })
        .validate(object);

    if (error) {
        const errorMessage = error.details
            .map((details) => details.message)
            .join(", ")
            .replaceAll('"', "");

        return next(
            new ApiError({
                statusCode: 400,
                message: errorMessage,
                errorCode: error.name,
            })
        );
    }

    Object.assign(req, value);
    return next();
};

exports.validateWithErrorHandle = (schema) => (req, res, next) => {
    const validSchema = pick(schema, ["query", "body", "params"]);
    const object = pick(req, Object.keys(validSchema));

    const { value, error } = Joi.compile(validSchema)
        .prefs({ errors: { label: "key" }, abortEarly: false })
        .validate(object);

    if (error) {
        const errorMessage = error.details
            .map((details) => details.message)
            .join(", ")
            .replaceAll('"', "");

        return res
            .status(444)
            .json({ message: errorMessage, code: error.name });
    }

    Object.assign(req, value);
    return next();
};
