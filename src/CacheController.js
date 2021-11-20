/* cwd needs to be project root */
const fs = require('fs')
const crypto = require('crypto')
// TODO: replace with target webpack project path or configured
const { CACHE_HASH, PROJECT_ROOT, DLL_ROOT } = require('./constants/path')
const path = require('path')

class CacheController {
  constructor(param) {}

  shouldUpdateCache() {
    let cacheHash
    try {
      cacheHash = fs.readFileSync(CACHE_HASH, 'utf8')
    } catch (e) {
      cacheHash = ''
    }
    const lockfile = fs.readFileSync(path.join(PROJECT_ROOT, 'yarn.lock'), 'utf8')

    const hash = crypto.createHash('md5').update(lockfile).digest('hex')

    console.log({ hash, cacheHash })

    const shouldCache = hash !== cacheHash
    // TODO: move logic out of should predicate
    if (shouldCache) {
      if (!fs.existsSync(DLL_ROOT)) {
        fs.mkdirSync(DLL_ROOT, { recursive: true })
      }

      fs.writeFileSync(CACHE_HASH, hash)
    }
    return shouldCache
  }
}

module.exports = CacheController
