const router = require('express').Router()

router.use('/api', require('./apiRoutes.js'))
router.use('/', require('./htmlRoutes.js'))

module.exports = router