const addPrefixToImages = require('./addPrefixToImages')

const dataMapper = (data) => {
  const dataClean = addPrefixToImages(data)
  dataClean.IsCPU = dataClean.Article === 'EQUIPO DE COMPUTACIÓN'
  return dataClean
}

module.exports = dataMapper
