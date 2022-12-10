const router = require("express").Router();
const { validate, validateWithErrorHandle } = require("../middleware/validate");
const {
    getLesson,
    getLessonInChannel,
} = require("../validation/lessonValidation");

router.get("/v1", validate(getLesson), (req, res) => {
    return res.json(req.query);
});

router.get("/v2", validate(getLesson, true), (req, res) => {
    return res.json(req.query);
});

router.get("/v3", validateWithErrorHandle(getLesson), (req, res) => {
    return res.json(req.query);
});

router.get("/v1/channel", validate(getLessonInChannel), (req, res) => {
    return res.json(req.query);
});

router.get("/v2/channel", validate(getLessonInChannel, true), (req, res) => {
    return res.json(req.query);
});

router.get(
    "/v3/channel",
    validateWithErrorHandle(getLessonInChannel),
    (req, res) => {
        return res.json(req.query);
    }
);

module.exports = router;
