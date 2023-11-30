const puppeteer = require('puppeteer')

const createPDF = async ({ templateHTML }) => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--proxy-server=http://your-proxy-url:port', '--no-sandbox', '--disable-setuid-sandbox']
  })

  try {
    const page = await browser.newPage()
    // await page.goto('https://www.google.com')
    await page.setContent(templateHTML)
    await page.emulateMediaType('screen')
    const pdf = await page.pdf({
      format: 'A4',
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
