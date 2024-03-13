const hbs = require('handlebars')
const fs = require('fs')
const path = require('path')

function renderTemplate (templateName, data) {
  const htmlFilePath = path.join(__dirname, `../../resources/templates/${templateName}.hbs`)
  const html = fs.readFileSync(htmlFilePath, 'utf8')
  hbs.registerHelper('ifThird', function (index, options) {
    if (index === 0 || index % 3 !== 0) {
      return options.fn(this)
    } else {
      return options.inverse(this)
    }
  })
  const template = hbs.compile(html)
  const renderedHTML = template(data)
  return renderedHTML
}

module.exports = renderTemplate
