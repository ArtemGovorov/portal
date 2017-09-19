require.config({
    baseUrl: '../../app/src',
    urlArgs: 'cb=' + Math.random(),
    paths: {
        'angular': '../../lib/angular/angular.min',
        'angular-mocks': '../../lib/angular-mocks/angular-mocks',
        'jasmine': '../../lib/jasmine/lib/jasmine-core/jasmine',
        'jasmine-html': '../../lib/jasmine/lib/jasmine-core/jasmine-html',
        'sinon': '../../lib/sinon/lib/sinon',
        'squire': '../../lib/squire/src/Squire',
        'boot': '../../lib/jasmine/lib/jasmine-core/boot',
        'di.core': '../../lib/di.core',
        'test': '../../app.tests/src',
        'jquery': '../../lib/jquery/dist/jquery',
        'underscore': '../../lib/underscore/underscore',
        'app.mocks': '../../app.tests/mocks',
        'core.mocks': '../../lib/di.core.test/mocks',
        'testHelper': '../../lib/di.core.test/utility/testHelper',
        'moment': '../../lib/moment/moment'
    },
    shim: {
        'angular': {
            deps: ['jasmine'],
            exports: 'angular'
        },
        'angular-mocks': {
            deps: ['angular'],
            exports: 'angularMocks'
        },
        'angular-translate': {
            deps: ['angular'],
            exports: 'angular-translate'
        },
        'angular-translate-loader-static-files': {
            deps: ['angular', 'angular-translate'],
            exports: 'angular-translate-loader-static-files'
        },
        'angular-local-storage': {
            deps: ['angular'],
            exports: 'angular-local-storage'
        },
        'jasmine': {
            exports: 'jasmine'
        },
        'jasmine-html': {
            deps: ['jasmine'],
            exports: 'jasmineHtml'
        },
        'boot': {
            deps: ['jasmine', 'jasmine-html'],
            exports: 'JasmineBoot'
        },
        'squire': {
            exports: 'squire'
        },
        'underscore': {
            exports: '_'
        }
    },
    deps: [
        'jquery',
        'underscore',
        'di.core/di.core.global',
        'angular-mocks'
    ]
});