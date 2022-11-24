const express = require('express')
const app = express()
const port = 3000
const edgeChromium = require('chrome-aws-lambda')
const puppeteer = require('puppeteer-core')

app.get('/', async (req, res) => {
  const executablePath = await edgeChromium.executablePath
  const browser = await puppeteer.launch({
    executablePath,
    args: edgeChromium.args,
    headless: true,
  })

  const [page] = await browser.pages();

  await page.goto('https://animixplay.to/v1/do-it-yourself/ep8', { waitUntil: 'networkidle0' });

  const data = await page.content()

  await browser.close();
  
  res.send(data)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
