const { handleHttpError, handleHttpErrorCustome } = require('../utils/handlesMessage/handleHttpError')
const createPDF = require('../utils/pdfs/generatePDF')
const renderTemplate = require('../utils/pdfs/renderTemplate')
const sharp = require('sharp')
const request = require('request')
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
}

const generateOnePDFController = async (req, res) => {
  try {
    const data = req.body

    if (Object.keys(data).length === 0) {
      return handleHttpErrorCustome({ res, message: 'Ingrese el dato de un registro', code: 404 })
    }
    let url = data.Fotografia.url
    request({ url, encoding: null }, function (error, response, body) {
      if (!error) {
        sharp(body).rotate().resize(300, 300).toBuffer().then(function (foto1) {
          const b64encoded = btoa(String.fromCharCode.apply(null, foto1))
          const datajpg = 'data:image/jpg;base64,' + b64encoded
          data.Fotografia.url = datajpg
        }).then(function () {
          url = data.FotografiaII.url
          request({ url, encoding: null }, function (error, response, body) {
            if (!error) {
              sharp(body).rotate().resize(200, 200).toBuffer().then(function (foto2) {
                const b64encoded2 = btoa(String.fromCharCode.apply(null, foto2))
                const datajpg2 = 'data:image/jpg;base64,' + b64encoded2
                data.FotografiaII.url = datajpg2
              }).then(async function () {
                const HTMLContent = renderTemplate('pdfTemplateOne', data)
                const pdfBuffer = await createPDF({ templateHTML: HTMLContent })
                res.setHeader('Content-Type', 'application/pdf')
                // res.setHeader('Content-Disposition', 'attachment; filename=prueba1.pdf')
                res.write(pdfBuffer)
                res.end()
              })
            }
          })
        })
      }
    })
  } catch (error) {
    handleHttpError({ res, error: error.message })
  }
}

module.exports = {
  generateOnePDFController,
  generatePDFController
}
