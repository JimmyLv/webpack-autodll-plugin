/* cwd needs to be project root */
const fs = require('fs')
// const webpack = require('webpack')
// const config = require('./webpack/dev.clientdll.config')
const crypto = require('crypto')
const path = require('path')
const getProjectRoot = require('./utils/getProjectRoot')

const PROJECT_ROOT = getProjectRoot()
const DLL_ROOT = path.join(PROJECT_ROOT, 'dev', 'dll')
const CACHE_HASH = path.join(DLL_ROOT, 'yarn.lock.md5')

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
    return hash !== cacheHash
  }
}

module.exports = CacheController
