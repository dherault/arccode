import fs from 'node:fs'
import path from 'node:path'

import printRouter from '~router/logic/createRouter'
import printSitemap from '~router/logic/createSitemap'

fs.writeFileSync(path.join(__dirname, '../Router.tsx'), printRouter(), 'utf8')
fs.writeFileSync(path.join(__dirname, '../../../public/sitemap.xml'), printSitemap(), 'utf8')

console.log('✨ Done!')
