const router = require('express').Router()

router.use('/api', require('./notesRoutes.js'))
router.use('/', require('./viewRoutes.js'))

module.exports = router