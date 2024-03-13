const { Router } = require('express')
const { generatePDFController } = require('../controllers/pdfController')
const router = Router()

router.post('/', generatePDFController)

module.exports = router
