var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        app: path.join(__dirname, 'src/app/main'),
        vendor: [
            'moment',
            'moment-timezone',
            'underscore',
            'angular',
            'angular-translate-loader-static-files',
            'bootstrap',
            'jquery',
            'toastr',
            'stacktrace',
            'valdr',
            'notify',
            'bootbox',
            'spin',
            'uri',
            'pikaday',
            'ng-file-upload',
            'jquery.browser',
            'plotly',
            'ngIdle',
            'angularModalService',
            'angular-clipboard',
            'reflect-metadata'
        ]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js"
    },
    resolve: {
        alias: {
            'appModule': path.join(__dirname, 'src/app/app.module'),
            'appConfig': path.join(__dirname, 'src/app/_config'),
            'domReady': path.join(__dirname, 'node_modules/detect-dom-ready/lib/detect-dom-ready'),
            'moment': path.join(__dirname, 'node_modules/moment/min/moment-with-locales.min'),
            'moment-timezone': path
                .join(__dirname, 'node_modules/moment-timezone/builds/moment-timezone-with-data.min'),
            'underscore': path.join(__dirname, 'node_modules/underscore/underscore-min'),
            'angular': path.join(__dirname, 'node_modules/angular/angular'),
            'angular-translate-loader-static-files':
                path.join(__dirname,
                    'node_modules/angular-translate-loader-static-files/angular-translate-loader-static-files.min'),
            'bootstrap': path.join(__dirname, 'lib/bootstrap-custom/bootstrap.min'),
            'jquery': path.join(__dirname, 'node_modules/jquery/dist/jquery.min'),
            'toastr': path.join(__dirname, 'node_modules/toastr/build/toastr.min'),
            'stacktrace': path.join(__dirname, 'lib/stacktrace/dist/stacktrace.min'),
            'valdr': path.join(__dirname, 'lib/valdr/dist/valdr'),
            'notify': path.join(__dirname, 'lib/notifyjs/dist/notify'),
            'bootbox': path.join(__dirname, 'node_modules/bootbox/bootbox.min'),
            'spin': path.join(__dirname, 'node_modules/spin.js/spin.min'),
            'uri': path.join(__dirname, 'node_modules/urijs/src/uri'),
            'pikaday': path.join(__dirname, 'node_modules/pikaday/pikaday'),
            'ng-file-upload': path.join(__dirname, 'node_modules/ng-file-upload/dist/ng-file-upload-all.min'),
            'jquery.browser': path.join(__dirname, 'node_modules/jquery.browser/dist/jquery.browser.min'),
            'plotly': path.join(__dirname, 'node_modules/plotly.js/dist/plotly.min'),
            'ngIdle': path.join(__dirname, 'node_modules/ng-idle/angular-idle.min'),
            'boot': 'node_modules/jasmine-core/lib/jasmine-core/boot',
            'di.core': path.join(__dirname, 'lib/di.core'),
            'core.mocks': path.join(__dirname, 'lib/di.core.test/mocks/spa'),
            'app.mocks': path.join(__dirname, 'app.tests/mocks'),
            'testHelper': path.join(__dirname, 'lib/di.core.test/utility/testHelper'),
            'squire': path.join(__dirname, 'lib/squire/src/Squire'),
            'jasmine': path.join(__dirname, 'node_modules/jasmine-core/lib/jasmine-core/jasmine'),
            '$di': 'window.$di',
            'angularModalService': path.join(__dirname, 'lib/angular-modal-service/dst/angular-modal-service'),
            'angular-clipboard': path.join(__dirname, 'lib/angular-clipboard/angular-clipboard'),
            'ng-metadata/core': path.join(__dirname, 'node_modules/ng-metadata/core'),
            'reflect-metadata': path.join(__dirname, 'node_modules/reflect-metadata/Reflect'),
        },
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            { test: /angular/, use: ['exports-loader?window.angular'] },
            { test: /angular-translate/, use: ['exports-loader?angularTranslate'] },
            { test: /angular-local-storage/, use: ['exports-loader?angularLocalStorage'] },
            { test: /angular-ui-router/, use: ['exports-loader?angularUiRouter'] },
            { test: /bootstrap/, use: ['imports-loader?jQuery=jquery'] },
            { test: /valdr/, use: ['imports-loader?moment'] },
            { test: /notify/, use: ['imports-loader?jQuery=jquery'] },
            { test: /moment-timezone/, use: ['imports-loader?moment'] },
            { test: /pikaday/, use: ['imports-loader?moment'] },
            { test: /squire/, use: ['exports-loader?window.squire'] },
            { test: /jasmine/, use: ['exports-loader?window.jasmine'] },
            { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader?presets[]=es2015'] },
            { test: /\.tsx?$/, loader: 'awesome-typescript-loader' }
        ]
    },
    plugins: [
        new webpack.IgnorePlugin(/\.\/locale$/),
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
            'window.jQuery': 'jquery',
            _: 'underscore',
            angularAnimate: 'angular-animate',
            angularUiRouter: 'angular-ui-router',
            angularTranslate: 'angular-translate',
            angularLocalStorage: 'angular-local-storage'
        })
    ]
}
