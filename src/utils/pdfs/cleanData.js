const { procesarImagen } = require('./tranformImage')

const cleanData = async ({ dataTasacion }) => {
  const image1 = dataTasacion.Fotografia.url
  const image2 = dataTasacion.FotografiaII.url
  if (image1) dataTasacion.Fotografia.url = await procesarImagen(image1)
  if (image2) dataTasacion.FotografiaII.url = await procesarImagen(image2)
  return dataTasacion
}

module.exports = cleanData
