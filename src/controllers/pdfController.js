const hbs = require('handlebars')
const PuppeteerHTMLPDF = require('puppeteer-html-pdf')

const generatePDFController = async (req, res) => {
  const pdfData = {
    invoiceItems: [
      { item: 'Website Design', amount: 5000 },
      { item: 'Hosting (3 months)', amount: 2000 },
      { item: 'Domain (1 year)', amount: 1000 }
    ],
    invoiceData: {
      invoice_id: 123,
      transaction_id: 1234567,
      payment_method: 'Paypal',
      creation_date: '04-05-1993',
      total_amount: 141.5
    },
    baseUrl: `${req.protocol}://${req.get('host')}` // http://localhost:3000
  }

  const htmlPDF = new PuppeteerHTMLPDF()
  htmlPDF.setOptions({ format: 'A4' })

  try {
    const html = await htmlPDF.readFile('src/resources/templates/template.hbs', 'utf8')
    console.log(html)
    const template = hbs.compile(html)
    const content = template(pdfData)

    const pdfBuffer = await htmlPDF.create(content)
    res.attachment('invoice.pdf')
    res.end(pdfBuffer)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

module.exports = generatePDFController
