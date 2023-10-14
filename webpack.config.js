const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const mode = process.env.NODE_ENV;
console.log('mode:', mode);
// Create an array to hold the plugins
const plugins = [
  new MiniCssExtractPlugin(),
  new HtmlWebpackPlugin({
    template: 'index.html',
  }),
  new Dotenv(),
];

// Conditionally add plugins based on development or production mode
if (mode === 'development') {
  plugins.push(new webpack.HotModuleReplacementPlugin());
  plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = {
  entry: [
    './client/index.jsx',
  ].concat(mode === 'development' ? ['webpack-dev-server/client?http://localhost:8080', 'webpack/hot/dev-server'] : []),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  mode: mode,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { runtime: 'automatic' }],
            ],
            plugins: [
              'babel-plugin-styled-components',
            ].concat(mode === 'development' ? 'react-refresh/babel' : []),
          },
        },
      },
      {
        test: /skin\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s?css$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  devServer: {
    static: {
      publicPath: '/build',
      directory: path.resolve(__dirname, 'build'),
    },
    historyApiFallback: true,
    proxy: {
      // Proxy all requests except for the ones that start with /build
      // This will allow the dev server to serve the built assets from the /build directory
      '/!(build/**/*.*|index.html)': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
    port: 8080,
  },
  plugins: plugins,
  devtool: mode === 'development' ? 'eval-source-map' : 'source-map',
};