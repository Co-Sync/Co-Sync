const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './client/index.jsx',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
        {
            test: /\.jsx?/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                    '@babel/preset-env', 
                    ['@babel/preset-react', {"runtime": "automatic"}],
                ],
                plugins: [
                    "babel-plugin-styled-components"
                ]},
            },
        },
        {
            test: /skin\.css$/i,
            use: [ MiniCssExtractPlugin.loader, 'css-loader' ],
        },
        {
            test: /\.s?css$/i,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ],
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
            '/': 'http://localhost:3000',
        },
        port: 8080,
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new Dotenv(),
    ],
    devtool: 'source-map'
};