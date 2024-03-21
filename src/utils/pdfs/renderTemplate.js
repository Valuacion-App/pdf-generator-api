const hbs = require('handlebars')
const fs = require('fs')
const path = require('path')

function renderTemplate (templateName, data, isTwo) {
  const htmlFilePath = path.join(__dirname, `../../resources/templates/${templateName}.hbs`)
  const html = fs.readFileSync(htmlFilePath, 'utf8')

  if (isTwo) {
    hbs.registerHelper('ifSecond', function (index, options) {
      if (index === 0 || index % 2 !== 0) {
        return options.fn(this)
      } else {
        return options.inverse(this)
      }
    })
  } else {
    hbs.registerHelper('ifThird', function (index, options) {
      if (index === 0 || index % 3 !== 0) {
        return options.fn(this)
      } else {
        return options.inverse(this)
      }
    })
  }

  const template = hbs.compile(html)
  const renderedHTML = template(data)
  return renderedHTML
}

module.exports = renderTemplate
