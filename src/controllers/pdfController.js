const createPDF = require('../utils/pdfs/generatePDF')
const renderTemplate = require('../utils/pdfs/renderTemplate')
let reportsList = []
fetch('http://localhost:3000/api/v1/importData')
  .then(data => {
    return data.json()
  })
  .then(item => {
    reportsList = item
  })

const generatePDFController = async (req, res) => {
  console.log(reportsList)
  const reportes = { reports: reportsList }

  const HTML = renderTemplate('template', reportes)
  const pdfBuffer = await createPDF({ templateHTML: HTML })

  // Configurar los encabezados de la respuesta
  res.setHeader('Content-Type', 'application/pdf')
  // res.setHeader('Content-Disposition', 'attachment; filename=prueba1.pdf')

  // Transmitir los buffers como respuesta
  res.write(pdfBuffer)

  // Finalizar la respuesta
  res.end()
  // res.send('Hola')
}

module.exports = generatePDFController
