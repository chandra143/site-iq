const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

const BUILD_DIR = path.join(__dirname, 'dist');
const APP_DIR = path.join(__dirname, 'src');
// const ASSETS = path.resolve(__dirname, './src/styles/img');

const VENDOR_LIBS = [
    'react', 'react-dom', 'react-router-dom'
];

const config = {
    mode: 'development',
    entry: {
        bundle: APP_DIR + '/app/main.js',
        vendor: VENDOR_LIBS,
        // assets: ASSETS
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.es6'],
        modules: ['node_modules']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.(css|scss)$/,
                loader: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loader: 'url-loader?limit=10000!img-loader?progressive=true'
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg)$/i,
                loader: 'url-loader?limit=10000&name=[name].[ext]',
                options: { sourceMap: true }
            }
        ]
    },
    devServer: {
        contentBase: BUILD_DIR,
        compress: true,
        port: 8080,
        disableHostCheck: false,
    },
    plugins: [
        new htmlWebpackPlugin({
            template: 'index.html',
            favicon: "./src/styles/img/icon-gas-pump.png"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
}

module.exports = config;
