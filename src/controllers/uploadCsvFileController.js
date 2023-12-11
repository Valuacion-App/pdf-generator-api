const csv = require('csv-parser')
const { Readable } = require('stream')
const dataMapper = require('../utils/csvs/dataMapper')

const uploadCsvFileController = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se proporcionó un archivo CSV' })
  }

  let csvData = req.file.buffer.toString()

  // Eliminar espacios en blanco al principio y al final de la cadena
  csvData = csvData.trim()

  // Eliminar la primera línea si está en blanco
  if (csvData.startsWith('\n') || csvData.startsWith('\r\n')) {
    csvData = csvData.substring(csvData.indexOf('\n') + 1)
  }

  const results = []
  Readable.from(csvData)
    .pipe(csv())
    .on('data', (data) => {
      const newData = dataMapper(data)
      results.push(newData)
    })
    .on('end', () => {
      res.json(results)
    })
}

module.exports = uploadCsvFileController
