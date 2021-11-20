const path = require('path')
const getProjectRoot = require('../utils/getProjectRoot')

const PROJECT_ROOT = getProjectRoot()
const DLL_ROOT = path.join(PROJECT_ROOT, 'dev', 'dll')
const CACHE_HASH = path.join(DLL_ROOT, 'yarn.lock.md5')

module.exports = { PROJECT_ROOT, DLL_ROOT, CACHE_HASH }
