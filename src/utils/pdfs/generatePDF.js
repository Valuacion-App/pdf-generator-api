const puppeteer = require('puppeteer')

const createPDF = async ({ templateHTML }) => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  try {
    const page = await browser.newPage()
    await page.setContent(templateHTML)
    await page.emulateMediaType('screen')
    const pdf = await page.pdf({
      format: 'Letter',
      printBackground: true,
      timeout: 0,
      margin: {
        top: '0.5cm',
        bottom: '1.5cm'
      }
    })
    await browser.close()
    return pdf
  } catch (e) {
    await browser.close()
    console.error(e)
  }
}

module.exports = createPDF
