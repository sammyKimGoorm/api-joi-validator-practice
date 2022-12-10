const Joi = require("joi");
const { pick } = require("lodash");
const ApiError = require("../utils/errors/apiError");

const _makeErrorMessage = (details) =>
    details
        .map((details) => details.message)
        .join(", ")
        .replaceAll('"', "");

const _makeErrorMessageWithList = (details) =>
    details.map((details) => details.message.replaceAll('"', ""));

exports.validate = (schema) => (req, res, next) => {
    const validSchema = pick(schema, ["query", "body", "params"]);
    const object = pick(req, Object.keys(validSchema));

    const { value, error } = Joi.compile(validSchema)
        .prefs({ errors: { label: "key" }, abortEarly: false })
        .validate(object);

    if (error) {
        // const errorMessage = _makeErrorMessage(error.details);
        const errorMessage = _makeErrorMessageWithList(error.details);

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
        const errorMessage = _makeErrorMessage(error.details);

        return res
            .status(444)
            .json({ message: errorMessage, code: error.name });
    }

    Object.assign(req, value);
    return next();
};
