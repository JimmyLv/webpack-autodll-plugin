/**
 * See the webpack docs for more information about plugins:
 * https://webpack.js.org/contribute/writing-a-plugin/#basic-plugin-architecture
 */

class WebpackAutodllPlugin {
  apply(compiler) {
    compiler.hooks.done.tap('WebpackAutodllPlugin', (
      stats /* stats is passed as an argument when done hook is tapped.  */
    ) => {
      console.log('Hello World!');
    });
  }
}

module.exports = WebpackAutodllPlugin;
