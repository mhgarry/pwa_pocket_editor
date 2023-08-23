const HtmlWebpackPlugin = require('html-webpack-plugin'); //generates my html file
const WebpackPwaManifest = require('webpack-pwa-manifest'); //to build my mainfest file with 
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin'); //to inject my manifest into my application

module.exports = () => {
  return {
    mode: 'development', 
    // entry point 
    entry: {
      main: './src/js/index.js', //sets index.js as the main entry point to be read from 
      install: './src/js/index.js', //sets index.js as the point to install service worker
    },
    // output for pwa bundle
    output: {
      filename: '[name].bundle.js', //our bundle output file
      path: path.resolve(__dirname, 'dist'), //outputs our bundle.js file to a created 'dist' file
     },
     //plugins for webpack
     plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE',
      }), //creating an HTML file for bundle titled 'JATE'
      new WebpackPwaManifest({ //creating a manifest.json file with the following configurations
        fingerprints: false,
        inject: true, //inject service worker into bundle
        name: 'JATE', //name bundle 'JATE'
        short_name: 'JATE',
        description: 'Just Another Text Editor', //describe bundle as Just Another Text Editor
        background_color: '#225ca3', //set color
        theme_color: '#225ca3', //set tcolor
        start_url: '/', //specify entry point
        publicPath: '/', //specify publish point
        icons: [
          {
            src: path.resolve('src/images/logo.png'), //pull logo src from src/images/logo.png
            sizes: [96, 128, 192, 256, 284, 512], //specify sizes that logo can be
            destination: path.join('asssets', 'icons') //destination folder icons under asssets where logo will be in final bundle
          }
        ]
      })
     ]
  }
}