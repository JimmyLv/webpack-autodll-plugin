const path = require('path')
const webpack = require('webpack')
const DLL_ROOT = path.join(__dirname, 'dev/dll')

module.exports = {
  mode: 'development',
  entry: {
    // TODO: replace with options from WebpackAutodllPlugin directly?
    vendors: ['react', 'react-dom', 'core-js'],
  },
  output: {
    filename: '[name].dll.js',
    path: DLL_ROOT,
    library: '[name]',
  },
  plugins: [
    new webpack.DllPlugin({ name: '[name]', path: path.join(DLL_ROOT, '[name].json') }), // eslint-disable-line no-new
  ],
  module: {
    rules: [
      { test: /\.flow$/, loader: 'ignore-loader' },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
    ],
  },
}
