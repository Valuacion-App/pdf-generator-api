const { Router } = require('express')
const { generateOnePDFController, generateMultiplePDFsController } = require('../controllers/pdfController')
const router = Router()

router.post('/one', generateOnePDFController)
router.post('/multiple', generateMultiplePDFsController)

module.exports = router
