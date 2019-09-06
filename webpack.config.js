const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

const config = {
  mode: 'none',
  plugins: [new CompressionPlugin({
    test: /\.js(\?.*)?$/i,
    exclude: /\/node_modules/,
    cache: true
  })],
  module: {
    rules: [
      {
        test: /\.gz$/,
        enforce: 'pre',
        use: 'gzip-loader'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};


module.exports = config;

