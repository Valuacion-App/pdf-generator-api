require('dotenv').config()
const express = require('express')
const cors = require('cors')
const ROUTE_URL = '/api/v1'

// Routes
const welcomeRoute = require('./src/routes/welcome')
const generatePDFRoute = require('./src/routes/pdf')
const uploadFile = require('./src/routes/uploadFile')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use(ROUTE_URL, welcomeRoute)
app.use(ROUTE_URL + '/generate-pdf', generatePDFRoute)
app.use(ROUTE_URL, uploadFile)

app.listen(PORT, (req, res) => {
  console.log(`Listening on http://localhost:${PORT}${ROUTE_URL}`)
})
