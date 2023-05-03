const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');


module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    // TODO: Add and configure workbox plugins for a service worker and manifest file.
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: true
      }),
      new WebpackPwaManifest({
        name: 'My Progressive Web App',
        short_name: 'MyPWA',
        description: 'My Progressive Web App',
        background_color: '#ffffff',
        crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
      }),
      new InjectManifest({
        
      })
    ],
    module: {
      // TODO: Add CSS loaders and babel to webpack.
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        }, 
      ],
    },
  };
};
