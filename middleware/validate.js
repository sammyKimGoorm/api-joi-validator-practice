const Joi = require("joi");
const { pick } = require("lodash");
const httpStatus = require("http-status");
const ApiError = require("../utils/errors/apiError");

const _makeErrorMessage = (details) =>
    details
        .map((details) => details.message)
        .join(", ")
        .replaceAll('"', "");

const _makeErrorMessageWithList = (details) =>
    details.map((details) => details.message.replaceAll('"', ""));

exports.validate =
    (
        schema,
        // convert - when true, attempts to cast values to the required types (e.g. a string to a number). Defaults to true.
        { convert = true, useAnotherMessage = false /* test option */ } = {}
    ) =>
    (req, res, next) => {
        const validSchema = pick(schema, ["query", "body", "params"]);
        const object = pick(req, Object.keys(validSchema));

        const { value, error } = Joi.compile(validSchema)
            .prefs({ errors: { label: "key" }, abortEarly: false })
            .validate(object, { convert });

        if (error) {
            const errorMessage = useAnotherMessage
                ? _makeErrorMessageWithList(error.details)
                : _makeErrorMessage(error.details);

            return next(
                new ApiError({
                    statusCode: httpStatus.BAD_REQUEST,
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
        const errorMessage = _makeErrorMessage(error.details);

        return res.status(httpStatus.BAD_REQUEST).json({
            message: errorMessage,
            code: error.name,
            asdf: "this is error handler in api",
        });
    }

    Object.assign(req, value);
    return next();
};
