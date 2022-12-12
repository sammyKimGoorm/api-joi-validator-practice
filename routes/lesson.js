const router = require("express").Router();
const { validate, validateWithErrorHandle } = require("../middleware/validate");
const {
    getLesson,
    getLessonInChannel,
    postLesson,
} = require("../validation/lessonValidation");

router.get("/v1", validate(getLesson), (req, res) => {
    return res.json(req.query);
});

router.get(
    "/v2",
    validate(getLesson, { useAnotherMessage: true }),
    (req, res) => {
        return res.json(req.query);
    }
);

router.get("/v3", validateWithErrorHandle(getLesson), (req, res) => {
    return res.json(req.query);
});

router.get("/v1/channel", validate(getLessonInChannel), (req, res) => {
    return res.json(req.query);
});

router.get(
    "/v2/channel",
    validate(getLessonInChannel, { useAnotherMessage: true }),
    (req, res) => {
        return res.json(req.query);
    }
);

router.get(
    "/v3/channel",
    validateWithErrorHandle(getLessonInChannel),
    (req, res) => {
        return res.json(req.query);
    }
);

router.post("/v1", validate(postLesson, { convert: false }), (req, res) => {
    return res.json(req.body);
});

router.post("/v2", validate(postLesson), (req, res) => {
    return res.json(req.body);
});

module.exports = router;
