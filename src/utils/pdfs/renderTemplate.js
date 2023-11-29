const hbs = require('handlebars')
const fs = require('fs')
const path = require('path')

function renderTemplate (templateName, data) {
  const htmlFilePath = path.join(__dirname, `../resources/templates/${templateName}.hbs`)
  const html = fs.readFileSync(htmlFilePath, 'utf8')

  const template = hbs.compile(html)
  const renderedHTML = template(data)
  return renderedHTML
}

module.exports = renderTemplate
