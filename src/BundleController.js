const path = require('path')
const webpack = require('webpack')
const { DLL_ROOT } = require('./constants/path')

class BundleController {
  webpackConfig
  dllReferencePlugin
  constructor(options) {
    this.webpackConfig = options.webpackConfig
    this.dllReferencePlugin = new webpack.DllReferencePlugin({
      manifest: path.join(DLL_ROOT, 'vendors.json'),
    })
  }

  async webpackBuild() {
    return new Promise((resolve, reject) => {
      webpack(this.webpackConfig, (err, stats) => {
        if (err) {
          reject(err)
        } else {
          console.log(`📘 DLL created`)

          const assets = stats.toJson().assets.map((asset) => asset.name)
          resolve(assets)
        }
      })
    })
  }
}

module.exports = BundleController
