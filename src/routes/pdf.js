const { Router } = require('express')
const { generateOnePDFController, generatePDFController } = require('../controllers/pdfController')
const router = Router()

router.get('/', generatePDFController)
router.post('/one-pdf', generateOnePDFController)

module.exports = router
