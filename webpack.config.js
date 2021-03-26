var packageJSON = require('./package.json');
var path = require('path');
var webpack = require('webpack');
module.exports = {
    mode: 'production',
    devtool: false,
    entry:{"app": "./src/main/react/entry/app.js"},
    output: {
        path: path.join(__dirname, 'src/main/webapp/static/app'),
        filename: '[name].bundle.js',
        },
    optimization: {
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        },
    plugins: [
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
	        },
            {
                test: /\.(png|gif|jpe|jpg)(\?.*$|$)?/,
                loader: 'file-loader',
                options: {
                    outputPath: 'images/',
                    publicPath: 'static/app/images/',
                    name: '[name].[ext]',
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)?/,
                loader: 'file-loader',
                options: {
                    outputPath: 'fonts/',
                    publicPath: 'static/app/fonts/',
                    name: '[name].[ext]',
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            }
        ]
    },
}