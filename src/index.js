const CacheController = require('./CacheController')
const BundleController = require('./BundleController')

class WebpackAutodllPlugin {
  hasCompile
  cacheController

  constructor(options) {
    this.options = options
    this.hasCompile = false
    this.cacheController = new CacheController()
    this.bundleController = new BundleController({
      vendors: options.vendors,
    })
  }
  check = async (compilation, cb) => {
    if (!this.hasCompile) {
      this.hasCompile = true
      if (this.cacheController.shouldUpdateCache()) {
        const assets = await this.bundleController.webpackBuild()
        console.log('cached assets', assets)
      } else {
        console.log(`📘 Using cached DLL`)
        // resolve()
      }
    }
    return cb()
  }
  apply(compiler) {
    compiler.hooks.beforeCompile.tapAsync('WebpackAutodllPlugin', this.check)

    compiler.hooks.done.tap(
      'WebpackAutodllPlugin',
      (stats /* stats is passed as an argument when done hook is tapped.  */) => {
        console.log('🔥🚀 Of Course I Still Love You.')
      },
    )

    this.bundleController.dllReferencePlugin.apply(compiler)
  }
}

module.exports = WebpackAutodllPlugin
