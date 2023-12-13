const { Router } = require('express')
const { upload } = require('../utils/csvs/upload')
const uploadCsvFileController = require('../controllers/uploadCsvFileController')
const router = Router()

router.post('/upload-file', upload.single('csvFile'), uploadCsvFileController)

module.exports = router
