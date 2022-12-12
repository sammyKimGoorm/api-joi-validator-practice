const Joi = require("joi");

const commonJoi = Joi.object({
    index: Joi.string(),
    sequence: Joi.string(),
}).or("index", "sequence");

exports.getLesson = {
    query: commonJoi,
};

exports.getLessonInChannel = {
    query: commonJoi.keys({ channelIndex: Joi.string().required() }),
};

exports.postLesson = {
    body: commonJoi.keys({
        subject: Joi.string().required(),
        count: Joi.number(),
    }),
};
