var webpackConfig = require('./webpack.config.base');
var wallabyWebpack = require('wallaby-webpack');
var wallabyPostprocessor = wallabyWebpack(webpackConfig);

module.exports = function (wallaby) {
    return {
        files: [
          { pattern: 'src/**/*.js', load: false }
        ],

        tests: [
          { pattern: 'src/**/*.spec.js', load: false }
        ],

        postprocessor: wallabyPostprocessor,

        setup: function () {
            window.__moduleBundler.loadTests();
        }
    };
};