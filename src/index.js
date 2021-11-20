/**
 * See the webpack docs for more information about plugins:
 * https://webpack.js.org/contribute/writing-a-plugin/#basic-plugin-architecture
 */

const CacheController = require('./CacheController')

class WebpackAutodllPlugin {
  hasCompile
  cacheController

  constructor(options) {
    this.options = options
    this.hasCompile = false
    this.cacheController = new CacheController({
      // configIndex,
      // entry,
      // manifestFile: path.join(cacheDir, MANIFEST_FILE)
    })
  }
  check = async (compilation, cb) => {
    if (!this.hasCompile) {
      this.hasCompile = true
      if (this.cacheController.shouldUpdateCache()) {
        // assets = await this.bundleController.webpackBuild();
      }
    }
    return cb()
  }
  apply(compiler) {
    compiler.hooks.beforeCompile.tapAsync('WebpackAutodllPlugin', this.check)

    compiler.hooks.emit.tapAsync('WebpackAutodllPlugin', (compilation, callback) => {
      console.log('options', this.options)

      console.log('compilation.assets', compilation.assets)
      // console.log("compilation.options", compilation.options);

      callback()
    })
    compiler.hooks.done.tap(
      'WebpackAutodllPlugin',
      (stats /* stats is passed as an argument when done hook is tapped.  */) => {
        console.log('Hello World!')
      },
    )
  }
}

module.exports = WebpackAutodllPlugin
