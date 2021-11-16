const path = require('path')
const WebpackAutodllPlugin = require('../../src/index.js')

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  output: {
    path: path.join(__dirname, 'example_dist'),
    filename: '[name].chunk.js',
  },
  plugins: [
    // TODO: need to simplify inside AutodllPlugin, ref: https://github.com/clinyong/dll-link-webpack-plugin/blob/9532c06827/src/BundleController.ts
    // new webpack.DllReferencePlugin({
    //   manifest: vendors
    // }),
    new WebpackAutodllPlugin({
      vendors: ['react', 'react-dom', 'core-js'],
      package: 'package.json',
      ignore: [],
      lockfile: 'yarn.lock',
    }),
  ],
}
