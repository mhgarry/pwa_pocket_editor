const HtmlWebpackPlugin = require('html-webpack-plugin'); // Generates HTML file
const WebpackPwaManifest = require('webpack-pwa-manifest'); // Generates manifest file
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin'); // Injects service worker into the application

module.exports = () => {
  return {
    mode: 'development', 
    entry: {
      main: './src/js/index.js', // Main entry point for the application logic
      install: './src/js/service-worker.js', // Entry point for service worker installation
    },
    output: {
      filename: '[name].bundle.js', // Output bundle file name
      path: path.resolve(__dirname, 'dist'), // Output directory path
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html', // HTML template file for HtmlWebpackPlugin
        title: 'JATE', // Title for the HTML file
      }),
      new WebpackPwaManifest({
        fingerprints: false, // Don't use fingerprints in file names
        inject: true, // Inject service worker into bundle
        name: 'JATE', // Name of the PWA
        short_name: 'JATE', // Short name of the PWA
        description: 'Just Another Text Editor', // Description of the PWA
        background_color: '#225ca3', // Background color for the PWA
        theme_color: '#225ca3', // Theme color for the PWA
        start_url: '/', // Entry point URL
        publicPath: '/', // Public base path for assets
        icons: [
          {
            src: path.resolve('src/images/logo.png'), // Path to logo image
            sizes: [96, 128, 192, 256, 384, 512], // Icon sizes
            destination: path.join('assets', 'icons'), // Destination folder for icons
          },
        ],
      }),
      new InjectManifest({ // Inject service worker manifest
        swSrc: './src-sw.js', // Source file for service worker
        swDest: 'src-sw.js', // Destination for service worker in the build
      }),
    ],
    module: {
      rules: [
        {
          // CSS loader configuration
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'], 
        },
        {
          // Babel loader configuration for JavaScript
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader', // Use Babel to load and transform ES6
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          }, 
        },
      ],
    },
  };
};
