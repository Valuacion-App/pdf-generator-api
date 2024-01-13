const { Router } = require('express')
const { generateOnePDFController, generatePDFController, generateThreePDFController } = require('../controllers/pdfController')
const router = Router()

router.get('/', generatePDFController)
router.post('/one-pdf', generateOnePDFController)
router.post('/three-pdf', generateThreePDFController)

module.exports = router
