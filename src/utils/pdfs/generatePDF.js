const puppeteer = require('puppeteer')
require('dotenv').config()

const createPDF = async ({ templateHTML }) => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--single-process', '--no-zygote' ],
    executablePath: process.env.NODE_ENV === "production" ? process.env.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath(),
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
