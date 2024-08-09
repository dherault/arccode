import { DateTime } from 'luxon'

import { APP_URL } from '~constants'

import type { Route } from '~router/logic/types'
import { appRoute, noSitemapPrefixes } from '~router/logic/data'

const today = DateTime.now().toISODate()

function printRoutes(route: Route, parentRoute?: Route) {

  if (!route.path) return ''
  if (route.path.includes(':')) return ''
  if (noSitemapPrefixes.some(prefix => route.path?.startsWith(prefix))) return ''

  const lines: string[] = [
    `  <url>
    <loc>${APP_URL}${route.path === '/' ? '' : '/'}${parentRoute && parentRoute.path !== '/' ? `${parentRoute.path}/` : ''}${route.path}</loc>
    <lastmod>${today}</lastmod>
  </url>
`,
  ]

  if (route.children) {
    lines.push(...route.children.map(childRoute => printRoutes(childRoute, route)))
  }

  return lines.join('')
}

function createSitemap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${printRoutes(appRoute)}
</urlset>
`
}

export default createSitemap
