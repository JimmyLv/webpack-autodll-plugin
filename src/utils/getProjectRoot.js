const path = require('path')
const fs = require('fs')

const getProjectRoot = (dirname = __dirname) => {
  let cd = dirname
  while (cd !== '/') {
    const lockfilePath = path.join(cd, 'yarn.lock')
    if (fs.existsSync(lockfilePath)) return cd
    cd = path.join(cd, '..')
  }
}

module.exports = getProjectRoot
