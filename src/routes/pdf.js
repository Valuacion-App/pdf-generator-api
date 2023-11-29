const { Router } = require('express')
const generatePDFController = require('../controllers/pdfController')
const router = Router()

router.get('/', generatePDFController)

module.exports = router
