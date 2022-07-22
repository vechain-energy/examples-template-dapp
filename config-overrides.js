const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')

module.exports = function override (config, env) {
  config.ignoreWarnings = [/Failed to parse source map/]
  config.resolve.fallback = {
    url: require.resolve('url'),
    assert: require.resolve('assert'),
    crypto: require.resolve('crypto-browserify'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    buffer: require.resolve('buffer'),
    stream: require.resolve('stream-browserify'),
    fs: false,
    os: false,
    path: false
  }

  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    }),
    new Dotenv({
      path: env.ENVIRONMENT ? `.env.${env.ENVIRONMENT}` : '.env',
      ignoreStub: true
    })
  )

  return config
}
