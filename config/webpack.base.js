const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

const SRC = path.resolve('./src');

module.exports = {
  entry: {
    bundle: [path.join(SRC, 'index.js')],
    style: [path.join(SRC, 'assets', 'sass', 'index.scss')],
  },
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.json', '.scss', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: '/node_modules/',
        use: [{ loader: 'babel-loader' }, { loader: 'eslint-loader' }],
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [
          'style-loader',
          'css-loader',
          'resolve-url-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins() {
                return [
                  autoprefixer({
                    flexbox: 'no-2009',
                  }),
                ];
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(SRC, 'assets', 'index.html'),
      title: 'Projet rattrapage IMAC3',
      filename: 'index.html',
      inject: 'body',
    }),
  ],
};
