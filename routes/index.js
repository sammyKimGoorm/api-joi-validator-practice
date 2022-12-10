const router = require('express').Router()

router.use('/lesson', require('./lesson'))

module.exports = router