import https from 'https'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '../public/images/covers')

const covers = {
  'food-0': 'photo-1555939594-58d7cb561ad1',
  'food-1': 'photo-1565299624946-b28f40a0ae38',
  'food-2': 'photo-1504674900247-0877df9cc836',
  'food-3': 'photo-1567620905732-2d1ec7ab7445',
  'drink-0': 'photo-1621263764928-df1444c5e859',
  'drink-1': 'photo-1546173159-315724a31696',
  'drink-2': 'photo-1495474472287-4d71bcdd2085',
  'drink-3': 'photo-1544145945-f90425340c7e',
  'craft-0': 'photo-1558618666-fcd25c85cd64',
  'craft-1': 'photo-1513506003901-1e6a229e2d15',
  'craft-2': 'photo-1598300042247-d088f8ab3a91',
  'market-0': 'photo-1578662996442-48f60103fc96',
  'market-1': 'photo-1488459716781-31db52582fe9',
  'market-2': 'photo-1556742049-0cfed4f6a45d',
  'tech-0': 'photo-1511707171634-5f897ff02aa9',
  'tech-1': 'photo-1516321497487-e288fb19713f',
  'tech-2': 'photo-1512941937669-90a1b58e7e9c',
  'service-0': 'photo-1454165804606-c3d57bc86b40',
  'service-1': 'photo-1600880292203-757bb62b4baf',
  'service-2': 'photo-1556761175-b413da4baf72',
  'flower-0': 'photo-1487530811176-3780de880c2d',
  'flower-1': 'photo-1519378058457-4c29a0a2efac',
  'flower-2': 'photo-1487530811176-3780de880c2d',
  'pet-0': 'photo-1587300003388-59208cc962cb',
  'pet-1': 'photo-1548199973-03cce0bbc87b',
  'fun-0': 'photo-1516450360452-9312f5e86fc7',
  'fun-1': 'photo-1511578314322-379afb476865',
  'fun-2': 'photo-1530023367847-a683933f4172',
  'fashion-0': 'photo-1445205170230-053b83016050',
  'fashion-1': 'photo-1441986300917-64674bd600d8',
  'fashion-2': 'photo-1445205170230-053b83016050',
  'beauty-0': 'photo-1562322140-8baeececf3df',
  'beauty-1': 'photo-1521590832167-7bcbfaa6381f',
  'beauty-2': 'photo-1562322140-8baeececf3df',
  'mood-0': 'photo-1506905925346-21bda4d32df4',
  'mood-1': 'photo-1507003211169-0a1dd7228f2d',
  'mood-2': 'photo-1499209974431-9dddcece7f88',
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest)
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close()
        fs.unlinkSync(dest)
        return download(res.headers.location, dest).then(resolve).catch(reject)
      }
      if (res.statusCode !== 200) {
        file.close()
        fs.unlinkSync(dest)
        return reject(new Error(`${url} -> ${res.statusCode}`))
      }
      res.pipe(file)
      file.on('finish', () => file.close(() => resolve(dest)))
    }).on('error', reject)
  })
}

fs.mkdirSync(outDir, { recursive: true })

let ok = 0
let fail = 0
for (const [name, id] of Object.entries(covers)) {
  const url = `https://images.unsplash.com/${id}?w=800&h=500&fit=crop&q=80`
  const dest = path.join(outDir, `${name}.jpg`)
  try {
    await download(url, dest)
    const size = fs.statSync(dest).size
    if (size < 5000) throw new Error('too small')
    console.log('OK', name, size)
    ok++
  } catch (e) {
    console.error('FAIL', name, e.message)
    fail++
  }
}
console.log(`done: ${ok} ok, ${fail} fail`)
