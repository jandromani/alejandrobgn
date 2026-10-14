import { writeFile } from "node:fs/promises"

const endpoint = process.argv[2] ?? "http://127.0.0.1:9333"
const base = process.argv[3] ?? "http://127.0.0.1:3006"
const targets = [
  ["home-graphic-direction-v2.png", "/", 1440, 1000],
  ["writing-graphic-direction-v2.png", "/writing", 1440, 1100],
  ["article-graphic-direction-v2.png", "/writing/avoiding-vendor-lock-in", 1440, 1100],
  ["about-graphic-direction-v2.png", "/about", 1440, 1100],
  ["writing-mobile-graphic-direction-v2.png", "/writing", 390, 844],
  ["article-mobile-graphic-direction-v2.png", "/writing/avoiding-vendor-lock-in", 390, 844],
  ["about-mobile-graphic-direction-v2.png", "/about", 390, 844],
  ["home-operating-field-graphic-direction-v2.png", "/", 1440, 1000, 940],
]

async function createPage(url) {
  const response = await fetch(`${endpoint}/json/new?${encodeURIComponent(url)}`, { method: "PUT" })
  return response.json()
}

async function capture([name, path, width, height, scrollY = 0]) {
  const page = await createPage(`${base}${path}`)
  const ws = new WebSocket(page.webSocketDebuggerUrl)
  let id = 0
  const pending = new Map()
  ws.onmessage = event => {
    const message = JSON.parse(event.data)
    if (message.id && pending.has(message.id)) { pending.get(message.id)(message); pending.delete(message.id) }
  }
  await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject })
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const callId = ++id
    pending.set(callId, result => result.error ? reject(new Error(result.error.message)) : resolve(result.result))
    ws.send(JSON.stringify({ id: callId, method, params }))
  })
  await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 600 })
  await send("Page.enable")
  await send("Page.navigate", { url: `${base}${path}` })
  await new Promise(resolve => setTimeout(resolve, 1600))
  if (scrollY) { await send("Runtime.evaluate", { expression: `window.scrollTo(0, ${scrollY})` }); await new Promise(resolve => setTimeout(resolve, 450)) }
  const result = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false })
  await writeFile(`artifacts/${name}`, Buffer.from(result.data, "base64"))
  console.log(`Captured ${name}`)
  ws.close()
  await fetch(`${endpoint}/json/close/${page.id}`)
}

for (const target of targets) await capture(target)
