import fs from 'node:fs'
import path from 'node:path'

import sharp from 'sharp'

const inputLocation = path.join(__dirname, 'input')
const outputLocation = path.join(__dirname, 'output')
const tempOutputFileLocation = path.join(outputLocation, 'temp.png')

fs.readdirSync(inputLocation).forEach(async file => {
  const inputFileLocation = path.join(inputLocation, file)
  const outputFileLocation = path.join(outputLocation, file)

  const image = sharp(inputFileLocation)
  const metadata = await image.metadata()
  const maxDimension = Math.max(metadata.width ?? 0, metadata.height ?? 0)

  await image
   .extend({
     top: (maxDimension - (metadata.height ?? 0)) / 2,
     bottom: (maxDimension - (metadata.height ?? 0)) / 2,
     left: (maxDimension - (metadata.width ?? 0)) / 2,
     right: (maxDimension - (metadata.width ?? 0)) / 2,
     background: { r: 0, g: 0, b: 0, alpha: 0 },
   })
   .png()
   .toFile(tempOutputFileLocation)

  await sharp(tempOutputFileLocation)
   .resize(256, 256)
   .toFile(outputFileLocation)

  fs.unlinkSync(tempOutputFileLocation)
})
