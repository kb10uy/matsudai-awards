const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const AutoPrefixer = require('autoprefixer');

const publicDirectory = path.resolve(__dirname, 'dist');

module.exports = {
  entry: {
    main: ['./assets/scripts/main.ts', './assets/styles/main.scss'],
  },
  output: {
    path: publicDirectory,
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [AutoPrefixer()],
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    /*
    new CopyWebpackPlugin([
      {
        from: './assets/static',
        to: publicDirectory,
      },
    ]),
    */
  ],
};
