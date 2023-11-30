const createPDF = require('../utils/pdfs/generatePDF')
const renderTemplate = require('../utils/pdfs/renderTemplate')

const generateOnePDFController = async (req, res) => {
  const data = {
    cabecera: {
      solicitante: 'JUZGADO PUBLICO CIVIL - COMERCIAL NRO 1 COCHABAMBA',
      Propietario: 'LAB SA',
      Ciudad: 'COCHABAMBA',
      Provincia: 'CERCADO',
      Direccion: 'AV. KILLMAN NRO 1691 ZONA',
      UbicacionAmbiente: 'BUNKER - BLOQUE NRO 4',
      DocumentacionDelBien: 'NINGUNA - DETALLAR EN CASO DE EXISTIR'
    },
    reports: [{
      Codigo: 'Q333',
      Detalle: 'Proyector ',
      Descripcion: 'Proyector 3M 910 color negro y plomo',
      Fecha: '2023-11-23T13:23:56.000Z',
      Ubication: 'CEMPA - CENTRO DE INSTRUCCIONES',
      Article: '003',
      Va: '',
      Fotografia: {
        url: 'https://adalo-uploads.imgix.net/972334c0a27b07f224dff19507e33dd7c0d51f09a1cd61c82db638390fd58e15.jpg',
        size: 202783,
        width: 1030,
        height: 1080,
        filename: 'IMG_20231123_092421_877.jpg'
      },
      Viñeta: '16139',
      CodigoTasacion: 'TQ273',
      EstadoDelArticulo: 'Regular; K2 = 0.5',
      SubGroup: 'OTROS',
      Created: '2023-11-23T13:27:22.842Z',
      Updated: '2023-11-23T13:27:22.842Z'
    }]
  }
  const HTML = renderTemplate('template', data)
  const pdfBuffer = await createPDF({ templateHTML: HTML })

  res.setHeader('Content-Type', 'application/pdf')
  res.write(pdfBuffer)
  res.end()
}

const generateMultiplePDFsController = async (req, res) => {
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

module.exports = { generateOnePDFController, generateMultiplePDFsController }
