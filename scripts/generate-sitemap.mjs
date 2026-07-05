import { writeFileSync } from 'fs'
import { projects, cases } from '../src/data/mock.js'
import { franchises } from '../src/data/franchises.js'

const SITE = (process.env.VITE_SITE_URL || 'https://www.xiaobenjing.com').replace(/\/$/, '')

const staticPaths = [
  { path: '/', priority: '1.0' },
  { path: '/projects', priority: '0.9' },
  { path: '/cases', priority: '0.9' },
  { path: '/ai', priority: '0.9' },
  { path: '/categories', priority: '0.8' },
  { path: '/guide', priority: '0.8' },
  { path: '/calculator', priority: '0.8' },
  { path: '/challenges', priority: '0.7' },
  { path: '/part-time', priority: '0.7' },
  { path: '/remote', priority: '0.7' },
  { path: '/franchise', priority: '0.7' },
  { path: '/insights', priority: '0.6' },
  { path: '/stories', priority: '0.6' },
]

const urls = [
  ...staticPaths.map(({ path, priority }) => ({ loc: `${SITE}${path}`, priority })),
  ...projects.map((p) => ({ loc: `${SITE}/project/${p.id}`, priority: '0.7' })),
  ...cases.map((c) => ({ loc: `${SITE}/case/${c.id}`, priority: '0.6' })),
  ...franchises.map((f) => ({ loc: `${SITE}/franchise/${f.id}`, priority: '0.5' })),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc><changefreq>weekly</changefreq><priority>${u.priority}</priority></url>`).join('\n')}
</urlset>
`

writeFileSync('public/sitemap.xml', xml, 'utf8')
console.log(`sitemap.xml: ${urls.length} URLs → public/sitemap.xml`)
