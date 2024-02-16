const { procesarImagen } = require('./tranformImage')

const cleanData = async ({ dataTasacion }) => {
  const image1 = dataTasacion.urlImage1
  const image2 = dataTasacion.urlImage2
  if (image1) dataTasacion.urlImage1 = await procesarImagen(image1)
  if (image2) dataTasacion.urlImage2 = await procesarImagen(image2)
  return dataTasacion
}

module.exports = cleanData
