const { fillEmptyFields } = require('./fillEmptyFields')
const { getShortDate } = require('./getDate')
const { procesarImagen } = require('./optimizeImage')

const cleanData = async ({ dataTasacion }) => {
  const image1 = dataTasacion.urlImage1
  const image2 = dataTasacion.urlImage2

  if (image1) dataTasacion.urlImage1 = await procesarImagen(image1)
  if (image2) dataTasacion.urlImage2 = await procesarImagen(image2)

  dataTasacion.bullet = fillEmptyFields(dataTasacion.bullet)
  dataTasacion.code = fillEmptyFields(dataTasacion.code)
  dataTasacion.date = getShortDate(dataTasacion.date)
  return dataTasacion
}

module.exports = cleanData
