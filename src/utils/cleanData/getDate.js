const getShortDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-BO', { timeZone: 'America/La_Paz' })
}

module.exports = { getShortDate }
