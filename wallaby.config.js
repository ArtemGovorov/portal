var wallabyWebpack = require('wallaby-webpack');
var webpackConfig = require('./webpack.config.base');
delete webpackConfig.entry;
webpackConfig.resolve.extensions = ['.js', '.ts'];

var rules = webpackConfig.module.rules.filter(function (rule) {
    return (rule.loader !== "awesome-typescript-loader" &&
        rule.use[0] !== 'babel-loader?presets[]=es2015');
});

webpackConfig.module.rules = rules;
webpackConfig.module.rules.push({ test: /\.js$/, loader: 'angular2-template-loader', exclude: /node_modules/ });
webpackConfig.module.rules.push({ test: /\.html$/, loader: 'html-loader' });

webpackConfig.entryPatterns = [
    'lib/di.core/di.core.global.js',
    'src/app/**/*spec.js'
];

var wallabyPostprocessor = wallabyWebpack(webpackConfig);

module.exports = function (wallaby) {
    return {
        files: [
            { pattern: "node_modules/babel-polyfill/dist/polyfill.js", load: true, instrument: false },
            { pattern: "node_modules/angular/angular.js", load: true, instrument: false },
            { pattern: "node_modules/angular-mocks/angular-mocks.js", load: true, instrument: false },
            { pattern: "node_modules/ng-metadata/core.js", load: false, instrument: false },

            { pattern: "lib/di.core/**/*.js", load: false, instrument: false },
            { pattern: "lib/di.core/global/_main.js", load: true },
            { pattern: "src/app/**/*.js", load: false },
            { pattern: "src/app/**/*.ts", load: false },
            { pattern: "src/app/**/*.html", load: false },
            "!src/app/**/*spec.js",
            "!src/app/**/*spec.ts",
            "!lib/di.core/build/*.js"
        ],
        tests: [
            { pattern: "src/app/**/*spec.js", load: false },
            { pattern: "src/app/**/*spec.ts", load: false },
            "!src/app/portal/parties/**/*spec.js",
        ],
        compilers: {
            '**/*.js': wallaby.compilers.babel()
        },
        testFramework: "jasmine",
        postprocessor: wallabyPostprocessor,
        setup: function () {
            window.__moduleBundler.loadTests();
        }
    };
};
