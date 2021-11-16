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
    new WebpackAutodllPlugin({
      vendors: ['react', 'react-dom', 'core-js'],
      package: 'package.json',
      ignore: [],
      lockfile: 'yarn.lock',
    }),
  ],
}
