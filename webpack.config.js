const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

require('dotenv').config({});

const IS_PROD = process.env.NODE_ENV === 'production';
const JS_EXT = IS_PROD ? '.min.js' : '.js';
const CSS_EXT = IS_PROD ? '.min.css' : '.css';

module.exports = {
    target: 'web',
    entry: './app/src/App',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: `static/assets/app${JS_EXT}`
    },
    optimization: {
        minimize: IS_PROD
    },
    plugins: [
        new HTMLWebpackPlugin({template: './app/src/index.html', filename:'static/index.html'}),
        new ExtractTextPlugin(`static/assets/app${CSS_EXT}`),
        new Dotenv()
    ],
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            },
            {
                test: /\.less$/,
                include: [
                    path.resolve(__dirname, 'app/src/less')
                ],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {minimize: IS_PROD}
                        },
                        {loader: 'less-loader'}
                    ]
                })
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    }
};