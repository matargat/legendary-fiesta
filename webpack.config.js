const path = require('path');
const webpack = require('webpack');

const config = {
    mode: 'none',
    module: {
      rules: [
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