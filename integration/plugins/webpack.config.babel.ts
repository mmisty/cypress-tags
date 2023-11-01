import * as webpack from 'webpack';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import path from 'path';

const tsconfigPath = path.resolve(__dirname, '../tsconfig.json');

const config: webpack.Configuration = {
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [
      // to resolve paths from tsconfig (i.e.cy-local)
      new TsconfigPathsPlugin({
        configFile: tsconfigPath,
        silent: true,
      }),
    ],
    fallback: {
      util: require.resolve('util'),
      path: require.resolve('path-browserify'),
      url: false,
      constants: false,
      stream: false,
      fs: false,
      module: false,
      assert: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            plugins: ['istanbul'],
            presets: ['@babel/preset-typescript'],
            babelrc: false,
          },
        },
      },
    ],
  },
};

module.exports = config;
