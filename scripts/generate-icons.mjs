import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const projectRoot = process.cwd()
const src = path.join(projectRoot, 'public', 'icons', 'source.png')
const outDir = path.join(projectRoot, 'public', 'icons')

async function exists(file) {
  try {
    await fs.access(file)
    return true
  } catch {
    return false
  }
}

if (!(await exists(src))) {
  console.error(`No encuentro el archivo fuente: ${src}`)
  console.error('Guarda la imagen como public/icons/source.png y vuelve a ejecutar: npm run icons')
  process.exit(1)
}

await fs.mkdir(outDir, { recursive: true })

const image = sharp(src)

await image
  .clone()
  .resize(512, 512, { fit: 'cover' })
  .png({ compressionLevel: 9 })
  .toFile(path.join(outDir, 'icon-512.png'))

await image
  .clone()
  .resize(192, 192, { fit: 'cover' })
  .png({ compressionLevel: 9 })
  .toFile(path.join(outDir, 'icon-192.png'))

await image
  .clone()
  .resize(180, 180, { fit: 'cover' })
  .png({ compressionLevel: 9 })
  .toFile(path.join(outDir, 'apple-touch-icon.png'))

await image
  .clone()
  .resize(32, 32, { fit: 'cover' })
  .png({ compressionLevel: 9 })
  .toFile(path.join(outDir, 'favicon-32.png'))

console.log('OK: iconos generados en public/icons/')
