const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      editor: './src/js/editor.js',
      header: './src/js/header.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Webpack plugin
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Just Another Text Editor'
      }),
      // Inject service worker
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
      // Create manifest file
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'J.A.T.E.',
        description: 'Takes notes with JavaScript syntax highlighting!',
        crossorigin: 'use-credentials', // can be null, use credentials or anonymous
        start_url: './',
        publicPath: './',
        filename: 'manifest.js',
        theme_color: '#225ca3',
        background_color: '#225ca3',
        display: 'standalone',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            purpose: 'any',
            destination: path.join('assets', 'icons'),
          }
        ]
      })
    ],
    module: {
      rules: [
        {
          // CSS loaders
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /^\.m?js$/,
          exclude: /node_modules/,
          // Babel loader
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/transform-runtime', '@babel/plugin-proposal-object-rest-spread'],
            },
          }
        }
      ],
    },
  };
};
