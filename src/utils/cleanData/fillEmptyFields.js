const fillEmptyFields = (field) => {
  if (field === '' || field === null) return 'Sin dato'
  else return field
}

module.exports = { fillEmptyFields }
