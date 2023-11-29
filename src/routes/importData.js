const { Router } = require('express')
const { importDataFromCsv } = require('../utils/importDataFromCsv')
const router = Router()

router.get('/importData', importDataFromCsv)

module.exports = router
