var path = require('path');
// var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
var webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin')

var node_dir = __dirname + '/../node_modules';

module.exports = {
  devtool: 'source-map',
  entry: {
    app: './src/entry',
    vendor: [
      "jquery",
      "react",
      "react-dom",
      "react-router",
      "redux",
      "redux-thunk",
      "react-redux",
      "signalR",
      "moment",
      "react-day-picker",
      "react-bootstrap-typeahead",
      "react-redux-form",
      "babel-polyfill",
      "axios",
      "bootstrap-loader",
      "dom-helpers",
      "i18n-react",
      "react-overlays"
    ]
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'usp.[chunkhash].js',
    publicPath: '/Scripts/',
    libraryTarget: 'var'
  },
  resolve: {
    alias: {
      'jquery': node_dir + '/jquery/dist/jquery.min.js',
      'react-redux': node_dir + '/react-redux/dist/react-redux.min.js',
      'react-bootstrap-typeahead' : node_dir + '/react-bootstrap-typeahead/dist/react-bootstrap-typeahead.min.js',
      'signalR': __dirname + '/../src/libs/jquery.signalR-2.2.0.min.js'
    },
    extensions: ['', '.js']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en-.*|es|fr|pl)$/),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.[chunkhash].bundle.js"),
    new htmlWebpackPlugin({
      filename: 'Views/Shared/_Layout.cshtml',
      template: '!!handlebars!./src/index.hbs',
      inject: false,
      cache: false
      })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, '../src')
      },
      {
        test: /\.png$/,
        loader: 'file?name=images/[name].[ext]'
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].html'
      },
      { test: require.resolve("jquery"), loader: 'expose?$' },
      { test: require.resolve("jquery"), loader: "imports?jQuery=jquery" },
      { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.yml$/, loader: 'json!yaml' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=65000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=65000&mimetype=application/octet-stream" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=65000&mimetype=image/svg+xml" },
      { test: /bootstrap\/dist\/js\/umd\//, loader: 'imports?jQuery=jquery' },
      { test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports?jQuery=jquery' }
    ]
  }
};
