import sharp from "sharp"
import { readdir, stat, unlink } from "node:fs/promises"
import { join, extname } from "node:path"

const ROOT = join(process.cwd(), "public", "projects")

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) files.push(...(await walk(full)))
    else if (extname(entry.name).toLowerCase() === ".png") files.push(full)
  }
  return files
}

const pngs = await walk(ROOT)
let before = 0
let after = 0

for (const png of pngs) {
  const webp = png.replace(/\.png$/i, ".webp")
  const originalSize = (await stat(png)).size
  before += originalSize

  await sharp(png)
    .resize({ width: 1500, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(webp)

  const newSize = (await stat(webp)).size
  after += newSize
  await unlink(png)

  console.log(
    `${png.split("/projects/")[1]}: ${(originalSize / 1024).toFixed(0)}KB -> ${(newSize / 1024).toFixed(0)}KB`,
  )
}

console.log(
  `\nTotal: ${(before / 1024 / 1024).toFixed(1)}MB -> ${(after / 1024 / 1024).toFixed(1)}MB (${(
    (1 - after / before) *
    100
  ).toFixed(0)}% smaller)`,
)
