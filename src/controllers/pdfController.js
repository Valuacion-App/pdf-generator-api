const { handleHttpError, handleHttpErrorCustome } = require('../utils/handlesMessage/handleHttpError')
const createPDF = require('../utils/pdfs/generatePDF')
const renderTemplate = require('../utils/pdfs/renderTemplate')
const cleanData = require('../utils/cleanData/cleanData')

const generatePDFController = async (req, res) => {
  try {
    const tasationData = req.body
    const { isTwoData } = req.query
    const reportes = { datas: [] }
    let templateHTMLname = 'pdfTemplate'

    if (Object.keys(tasationData).length === 0) {
      return handleHttpErrorCustome({ res, message: 'Ingrese un conjundo de items de tasacion', code: 400 })
    }
    for (const data of tasationData) {
      reportes.datas.push(await cleanData({ dataTasacion: data }))
    }

    if (isTwoData === 'true') {
      templateHTMLname = 'pdfTemplateTelecom'
    }

    const booleanTemplate = isTwoData === 'true'
    const HTMLContent = renderTemplate(templateHTMLname, reportes, booleanTemplate)
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
  generatePDFController
}
