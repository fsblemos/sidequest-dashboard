const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJs = require('uglifyjs-webpack-plugin');

const cssimport = require('postcss-import');
const cssnext = require('postcss-cssnext');
const stylelint = require('stylelint');

const path = require('path');

const ENV = (process.env.NODE_ENV) ? process.env.NODE_ENV : 'development';
const isProduction = (ENV === 'production');

module.exports = {
    entry: {
        app: "./src/web/main.js"
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: "umd",
        filename: "[name].min.js"
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            { test: /^src\/web\/index.html$/, loader: "file" },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                stylelint({
                                    configFile: '.stylelintrc.json'
                                }),
                                cssimport(),
                                cssnext(),
                            ]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/web/index.html' })
    ].concat((isProduction) ? [
        new UglifyJs(),
        new webpack.DefinePlugin({
            'process.env': {
              NODE_ENV: '"production"'
            }
          })
    ] : []),
    resolve: {
        extensions: ['*', '.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    }
}