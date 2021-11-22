const path = require('path')
const WebpackAutodllPlugin = require('../../src/index.js')

module.exports = {
  entry: path.join(__dirname, './src/index.js'),
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  output: {
    path: path.join(__dirname, 'example_dist'),
    filename: '[name].chunk.js',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [
    new WebpackAutodllPlugin({
      config: require('./webpack.dll.config'),
      vendors: ['react', 'react-dom', 'core-js'],
      package: 'package.json',
      ignore: [],
      lockfile: 'yarn.lock',
      // cacheDir https://github.com/clinyong/dll-link-webpack-plugin/blob/master/src/index.ts#L10
    }),
  ],
}
