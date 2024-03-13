const sharp = require('sharp')
const heicConvert = require('heic-convert')
async function procesarImagen (url) {
  try {
    const response = await fetch(url)
    const arrayBuffer = await response.arrayBuffer()

    let body = Buffer.from(arrayBuffer)
    if (url.includes('heic')) {
      body = await heicConvert({ buffer: body, format: 'PNG' })
    }

    const bufferImagen = await sharp(body).rotate().resize(300, 300).toBuffer()
    const b64encoded = Buffer.from(bufferImagen).toString('base64')
    const dataURL = 'data:image/jpg;base64,' + b64encoded
    return dataURL
  } catch (error) {
    console.error('Error al procesar la imagen:', error)
    throw error
  }
}

module.exports = { procesarImagen }
