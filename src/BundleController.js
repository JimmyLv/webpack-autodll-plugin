const path = require('path')
const webpack = require('webpack')
const { DLL_ROOT } = require('./constants/path')

const defaultModule = {
  rules: [
    { test: /\.flow$/, loader: 'ignore-loader' },
    {
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    },
  ],
}

class BundleController {
  webpackConfig
  dllReferencePlugin
  constructor(options) {
    this.webpackConfig = {
      cache: {
        type: 'filesystem',
        buildDependencies: {
          config: [__filename],
        },
      },
      entry: {
        vendors: options.vendors,
      },
      output: {
        filename: '[name].dll.js',
        path: DLL_ROOT,
        library: '[name]',
      },
      plugins: [
        new webpack.DllPlugin({
          context: __dirname,
          name: '[name]',
          path: path.join(DLL_ROOT, '[name].json'),
        }),
      ],
      module: defaultModule,
    }
    this.dllReferencePlugin = new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: path.join(DLL_ROOT, 'vendors.json'),
    })
  }

  async webpackBuild() {
    console.time('buildDll')

    return new Promise((resolve, reject) => {
      webpack(this.webpackConfig, (err, stats) => {
        if (err) {
          reject(err)
        } else {
          console.log(`📘 DLL created`)
          console.timeEnd('buildDll')

          const assets = stats.toJson().assets.map((asset) => asset.name)
          resolve(assets)
        }
      })
    })
  }
}

module.exports = BundleController
