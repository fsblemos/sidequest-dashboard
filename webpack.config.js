const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const UglifyJs = require('uglifyjs-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const cssimport = require('postcss-import')
const cssnext = require('postcss-cssnext')
const stylelint = require('stylelint')

const path = require('path')

const ENV = (process.env.NODE_ENV) ? process.env.NODE_ENV : 'development'
const isProduction = (ENV === 'production')

const config = {
  entry: {
    app: './src/app/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    filename: '[name].min.js'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
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
                cssnext()
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './src/app/index.html'
    })
  ],
  resolve: {
    extensions: ['*', '.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
}

if (isProduction) {
  config.plugins.push(new UglifyJs())
  config.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }))
}

module.exports = config
