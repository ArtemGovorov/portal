var webpack = require('webpack');
var config_prod = require('./webpack.config.base.js');

var commonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' });
var limitChunkCountPlugin = new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 2 });
var uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({ minimize: true, compress: false, sourceMap: false });

config_prod.plugins.push(commonsChunkPlugin);
config_prod.plugins.push(limitChunkCountPlugin);
config_prod.plugins.push(uglifyJsPlugin);

module.exports = config_prod;