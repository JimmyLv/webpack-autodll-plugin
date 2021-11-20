import fs from 'fs'
import { CACHE_HASH, DLL_ROOT } from './constants/path'
const webpack = require('webpack')

class BundleController {
  webpackConfig
  constructor(options) {
    this.webpackConfig = options.webpackConfig
  }

  async webpackBuild() {
    // fs.writeFileSync(CACHE_HASH, hash)
    // TODO: update to use webpackBuild() automatically, ref: https://github.com/clinyong/dll-link-webpack-plugin/blob/master/src/BundleController.ts#L156
    return new Promise((resolve, reject) => {
      webpack(this.webpackConfig, (err, stats) => {
        if (err) {
          reject(err)
        } else if (stats.hasErrors()) {
          console.log('stats.hasErrors', stats.toJson().errors.join('\n'))
          console.log('-----', stats.toJson().errors)
          // reject(new Error(stats.toJson().errors.join('\n')))
        } else {
          console.log(`📘 DLL created`)

          const assets = stats.toJson().assets.map((asset) => asset.name)
          // this.modifyGenerateFileModifyTime();
          // this.updateOutputJSNames(assets);
          resolve(assets)
        }
      })
    })
  }
}

module.exports = BundleController
