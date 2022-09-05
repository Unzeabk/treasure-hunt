const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer') // eslint-disable-line
  .BundleAnalyzerPlugin
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    optimization: {
      minimize: true
    },
    plugins: [
      /* Refer to https://www.npmjs.com/package/webpack-bundle-analyzer for more details */
      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled',
        generateStatsFile: true
      }),
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        threshold: 10240,
        minRatio: 0.8
      }),
    ]
  },
  chainWebpack: config => {
    config.optimization.minimizer('terser').tap((args) => {
      args[0].terserOptions.output = {
        ...args[0].terserOptions.output,
        comments: false  // exclude all comments from output
      }
      return args
    });
  }
}
