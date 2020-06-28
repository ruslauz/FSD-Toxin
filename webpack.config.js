const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

console.log(isDev);
console.log(process.env.NODE_ENV);


module.exports = {
  mode: `${process.env.NODE_ENV}`,

  entry: {
    app: './index.js'
  },

  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  devServer: {
    // host: 'localhost',
    port: 3000,
    open: 'Google Chrome',
    writeToDisk: true,
    contentBase: './dist',
    // hot: true
  },

  // devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader',
            options: {
              pretty: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader',
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          }
        ]
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
          }
        ]
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/pug/pages/ui-kit-colors/ui-kit-colors.pug',
      filename: 'ui-kit-colors.html',
    }),

    new HtmlWebpackPlugin({
      template: './src/pug/pages/ui-kit-cards/ui-kit-cards.pug',
      filename: 'ui-kit-cards.html',
    }),

    new CleanWebpackPlugin(),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/images'),
          to: path.resolve(__dirname, 'dist/images')
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ]
}