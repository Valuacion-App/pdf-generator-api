const { handleHttpError, handleHttpErrorCustome } = require('../utils/handlesMessage/handleHttpError')
const createPDF = require('../utils/pdfs/generatePDF')
const renderTemplate = require('../utils/pdfs/renderTemplate')
const cleanData = require('../utils/pdfs/cleanData')
const generatePDFController = async (req, res) => {
  const data = req.body
  const reportes = { reports: data }
  const HTML = renderTemplate('template', reportes)
  const pdfBuffer = await createPDF({ templateHTML: HTML })

  // Configurar los encabezados de la respuesta
  res.setHeader('Content-Type', 'application/pdf')
  // res.setHeader('Content-Disposition', 'attachment; filename=prueba1.pdf')

  // Transmitir los buffers como respuesta
  res.write(pdfBuffer)

  // Finalizar la respuesta
  res.end()
}

const generateOnePDFController = async (req, res) => {
  try {
    const data = req.body

    if (Object.keys(data).length === 0) {
      return handleHttpErrorCustome({ res, message: 'Ingrese el dato de un registro', code: 404 })
    }
    const cleanTasacion = await cleanData({ dataTasacion: data })
    const HTMLContent = renderTemplate('pdfTemplateOne', cleanTasacion)
    const pdfBuffer = await createPDF({ templateHTML: HTMLContent })
    res.setHeader('Content-Type', 'application/pdf')
    // res.setHeader('Content-Disposition', 'attachment; filename=prueba1.pdf')
    res.write(pdfBuffer)
    res.end()
  } catch (error) {
    handleHttpError({ res, error: error.message })
  }
}

const generateThreePDFController = async (req, res) => {
  try {
    const tasationData = req.body
    const reportes = { datas: [] }
    if (Object.keys(tasationData).length === 0) {
      return handleHttpErrorCustome({ res, message: 'Ingrese el dato de un registro', code: 404 })
    }
    for (const data of tasationData) {
      reportes.datas.push(await cleanData({ dataTasacion: data }))
      // reportes.datas.push(data)
    }
    const HTMLContent = renderTemplate('pdfTemplateThree', reportes)
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
  generatePDFController,
  generateThreePDFController
}
