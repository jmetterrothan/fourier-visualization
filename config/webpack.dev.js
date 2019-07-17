const merge = require('webpack-merge');

const baseConfig = require('./webpack.base');

// @ts-ignore
module.exports = merge(baseConfig, {
  mode: 'development',
  output: {
    publicPath: '/',
    filename: '[name].[chunkhash].js',
  },
  devServer: {
    port: 8080,
    historyApiFallback: true,
    watchContentBase: false,
    open: true,
  },
  devtool: 'cheap-eval-source-map',
  plugins: [],
});
