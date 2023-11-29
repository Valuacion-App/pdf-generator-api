const createPDF = require('../utils/pdfs/generatePDF')
const renderTemplate = require('../utils/pdfs/renderTemplate')

const generatePDFController = async (req, res) => {
  const reportes = { reports: [{ name: 'articulo1' }, { name: 'articulo2' }] }
  const HTML = renderTemplate('template', reportes)
  const pdfBuffer = await createPDF({ templateHTML: HTML })
  console.log(pdfBuffer)

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
