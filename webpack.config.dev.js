var webpack = require('webpack');
var config_dev = require('./webpack.config.base.js');

var commonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' });
var limitChunkCountPlugin = new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 2 });

config_dev.plugins.push(commonsChunkPlugin);
config_dev.plugins.push(limitChunkCountPlugin);

module.exports = config_dev;