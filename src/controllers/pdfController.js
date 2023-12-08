const { handleHttpError, handleHttpErrorCustome } = require('../utils/handlesMessage/handleHttpError')
const createPDF = require('../utils/pdfs/generatePDF')
const renderTemplate = require('../utils/pdfs/renderTemplate')

const generatePDFController = async (req, res) => {
  const reportes = { reports: [{ name: 'articulo1' }, { name: 'articulo2' }] }
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

const generateOnePDFController = async (req, res) => {
  try {
    const data = req.body

    if (Object.keys(data).length === 0) {
      return handleHttpErrorCustome({ res, message: 'Ingrese el dato de un registro', code: 404 })
    }

    const HTMLContent = renderTemplate('pdfTemplateOne', data)
    const pdfBuffer = await createPDF({ templateHTML: HTMLContent })

    res.setHeader('Content-Type', 'application/pdf')
    // res.setHeader('Content-Disposition', 'attachment; filename=prueba1.pdf')
    res.write(pdfBuffer)
    res.end()
  } catch (error) {
    handleHttpError({ res, error: error.message })
  }
}

module.exports = {
  generateOnePDFController,
  generatePDFController
}
