const csv = require('csv-parser')
const fs = require('fs')
const results = []
let imageI
let imageII
const prefix = 'https://adalo-uploads.imgix.net/'

const addPrefixToImages = (data) => {
  if (data.Fotografia) {
    imageI = JSON.parse(data.Fotografia.replace(/'/g, '"'))
    imageI.url = prefix + imageI.url

    data.Fotografia = imageI
  }
  if (data.FotografiaII) {
    imageII = JSON.parse(data.FotografiaII.replace(/'/g, '"'))
    imageII.url = prefix + imageII.url
    data.FotografiaII = imageII
  }
  return data
}

const importDataFromCsv = async (req, res) => {
  await fs
    .createReadStream('TXdataAnt.csv')
    .pipe(csv())
    .on('data', (data) => {
      const newData = addPrefixToImages(data)
      newData.Fecha = new Date(newData.Fecha).toISOString().split('T')[0]
      results.push(newData)
    })
    .on('end', () => {
      res.json(results)
    })
}

module.exports = { importDataFromCsv }
