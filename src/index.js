/**
 * See the webpack docs for more information about plugins:
 * https://webpack.js.org/contribute/writing-a-plugin/#basic-plugin-architecture
 */

class WebpackAutodllPlugin {
  constructor(options) {
    this.options = options
  }
  apply(compiler) {
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
