// Karma configuration
// Generated on Wed Mar 29 2017 11:00:46 GMT+0100 (GMT Summer Time)

var webpackConfig = require('./webpack.config.test.js');

module.exports = function (config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        frameworks: ['jasmine', 'es6-shim'],
        
        // list of files / patterns to load in the browser
        files: [
            'node_modules/angular/angular.min.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/babel-polyfill/dist/polyfill.js',
            'test.bundle.js'
        ],
        
        plugins: [
            'karma-jasmine',
            'karma-es6-shim',
            'karma-webpack',
            'karma-chrome-launcher',
            'karma-mocha-reporter'
        ],

        webpack: webpackConfig,
        
        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'test.bundle.js': ['webpack']
        },
        
        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['mocha'],

        // Mocha karma reporter https://github.com/litixsoft/karma-mocha-reporter
        mochaReporter: {
            output: 'minimal'
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    });
}
