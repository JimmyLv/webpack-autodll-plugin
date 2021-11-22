const path = require('path')
const getProjectRoot = require('../utils/getProjectRoot')
const NODE_MODULES_PATH = path.resolve('./node_modules')

const PROJECT_ROOT = getProjectRoot(NODE_MODULES_PATH)
const DLL_ROOT = path.join(PROJECT_ROOT, '.atuodll-plugin')
const CACHE_HASH = path.join(DLL_ROOT, 'yarn.lock.md5')

module.exports = { PROJECT_ROOT, DLL_ROOT, CACHE_HASH }
