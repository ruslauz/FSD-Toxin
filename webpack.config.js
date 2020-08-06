const path = require('path')
const fs = require('fs')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
    app: './index.js',
  },

  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/FSD-Toxin/'
  },

  devServer: {
    // host: 'localhost',
    port: 3000,
    open: 'Google Chrome',
    writeToDisk: true,
    contentBase: './dist',
    // hot: true
  },

  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },

  devtool: 'source-map',

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
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',          },
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
        test: /\.(jpg|png|gif|svg)$/,
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
        test: /\.(ttf|woff|woff2|eot)$/,
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

    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, 'src/images'),
    //       to: path.resolve(__dirname, 'dist/images')
    //     },
    //     {
    //       from: path.resolve(__dirname, 'src/fonts'),
    //       to: path.resolve(__dirname, 'dist/fonts')
    //     }
    //   ]
    // }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ]
}