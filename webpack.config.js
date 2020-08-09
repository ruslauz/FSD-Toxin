const path = require('path')
const fs = require('fs')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const PATHS = {
  dev: 'src',
  prod: 'dist',
  assets: 'assets'
};
const PAGES_DIR = `./${PATHS.dev}/pug/pages`
const PAGES = fs.readdirSync(PAGES_DIR)
  .map((dir) => fs.readdirSync(`${PAGES_DIR}/${dir}`))
  .flat()
  .filter((filename) => filename.endsWith('.pug'))

module.exports = {
  mode: `${process.env.NODE_ENV}`,

  entry: {
    app: ['@babel/polyfill', './index.js'],
  },

  output: {
    filename: 'js/[name]-[contenthash:5].js',
    path: __dirname + '/dist',
    publicPath: '/FSD-Toxin/'
  },

  devServer: {
    // host: 'localhost',
    port: 3000,
    open: 'Google Chrome',
    writeToDisk: true,
    contentBase: __dirname + '/dist',
    // hot: true
  },

  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },

  devtool: isDev ? 'source-map' : '',

  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader',
            options: {
              pretty: isDev
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',          
          },
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
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
            options: {
              presets: [
                '@babel/preset-env',
              ],
              plugins: [
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-proposal-private-methods'
              ]
            }
          }
        ]
      },
      {
        test: /(\.(jpe?g|png|gif|svg)$)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]-[contenthash:5].[ext]',
              outputPath: 'images/',
              esModule: false,
            }
          }
        ]
      },
      {
        test: /font.*\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9-]+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
    ]
  },

  plugins: [
    ...PAGES.map(page => {
      return new HtmlWebpackPlugin({
        template: `${PAGES_DIR}/${page.replace(/\.pug$/, '')}/${page}`,
        filename: `${page.replace(/\.pug$/, '.html')}`,
      })
    }),

    new CleanWebpackPlugin(),

    new MiniCssExtractPlugin({
      filename: 'css/[name]-[contenthash:5].css'
    }),
    new FaviconsWebpackPlugin({
      logo: './src/favicon/favicon-logo.png',
      inject: true,
    })
  ]
}