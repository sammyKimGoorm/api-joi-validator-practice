const router = require("express").Router();
const { validate, validateWithErrorHandle } = require("../middleware/validate");
const { getLesson, getLessonInChannel } = require("../validation/lessonValidation");

router.get("/", validate(getLesson), (req, res) => {
    return res.json(req.query);
});

router.get("/channel", validate(getLessonInChannel), (req, res) => {
    return res.json(req.query);
});

module.exports = router;
