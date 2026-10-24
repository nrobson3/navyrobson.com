// Review captures for the impeccable finish review, driven through the installed Chrome.
//
// The page pins sections sized in svh, so a "full page" screenshot (which resizes the
// viewport to the document height) would distort it. Instead this walks the real viewport
// down the page and saves every frame, then stitches the frames from the document top:
//   .impeccable/review/<name>.png             stitched, document top first
//   .impeccable/review/<name>-frames/NN.png   each viewport frame as a visitor sees it
//
//   node art/capture.mjs [--url http://localhost:5180/] [--only desktop|mobile|reduced]
import fs from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright-core'

const args = process.argv.slice(2)
const arg = (n, d) => (args.includes(n) ? args[args.indexOf(n) + 1] : d)
const URL = arg('--url', 'http://localhost:5180/')
const ONLY = arg('--only', null)
const OUT = path.resolve('.impeccable/review')
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'

const SETS = [
  { name: 'desktop', viewport: { width: 1440, height: 900 } },
  { name: 'mobile', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
  { name: 'reduced', viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' },
]

const browser = await chromium.launch({ executablePath: CHROME, headless: true })
for (const s of SETS.filter((x) => !ONLY || x.name === ONLY)) {
  const ctx = await browser.newContext({
    viewport: s.viewport,
    isMobile: s.isMobile ?? false,
    hasTouch: s.hasTouch ?? false,
    deviceScaleFactor: s.deviceScaleFactor ?? 1,
    reducedMotion: s.reducedMotion ?? 'no-preference',
  })
  const page = await ctx.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(String(e)))
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
  await page.goto(URL, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  const total = await page.evaluate(() => document.documentElement.scrollHeight)
  const vh = s.viewport.height
  const dir = path.join(OUT, `${s.name}-frames`)
  fs.rmSync(dir, { recursive: true, force: true })
  fs.mkdirSync(dir, { recursive: true })
  const frames = []
  for (let y = 0, i = 0; y < total; y += vh, i++) {
    await page.evaluate((top) => window.scrollTo(0, top), y)
    await page.waitForTimeout(250) // two rAFs for the scroll vars, plus image decode
    const file = path.join(dir, `${String(i).padStart(2, '0')}.png`)
    await page.screenshot({ path: file })
    frames.push(file)
  }
  // stitch: one column, document top first
  const stitched = await page.evaluate(async (srcs) => {
    const imgs = await Promise.all(srcs.map((s) => new Promise((res) => { const im = new Image(); im.onload = () => res(im); im.src = s })))
    const c = document.createElement('canvas')
    c.width = imgs[0].width
    c.height = imgs.reduce((h, im) => h + im.height, 0)
    const g = c.getContext('2d')
    let y = 0
    for (const im of imgs) { g.drawImage(im, 0, y); y += im.height }
    return c.toDataURL('image/png')
  }, frames.map((f) => 'data:image/png;base64,' + fs.readFileSync(f).toString('base64')))
  fs.writeFileSync(path.join(OUT, `${s.name}.png`), Buffer.from(stitched.split(',')[1], 'base64'))
  console.log(`${s.name}: ${frames.length} frames, document ${total}px, errors: ${errors.length ? errors.join(' | ') : 'none'}`)
  await ctx.close()
}
await browser.close()
