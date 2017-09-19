//{CODE:EUP02}
// di.einvoicing.ui.portal
define([
    'angular',
    // Application Angular components
    'appConfig',
    './_run',
	'./portal/_loader',
	'../../lib/di.core/di.core.spa',
    // External Angular components
	'angular-animate',
    'angular-ui-router',
    'angular-translate',
    'angular-translate-loader-static-files',
    'angular-local-storage',
	'valdr',
	'angular-sanitize',
	'ng-file-upload',
    'ngIdle',
    'angularModalService',
    'angular-clipboard'
], function (
    ng,
    configLoader,
    runLoader,
    portalLoader,
    diCoreAngularLoader) {
	'use strict';

	var module = ng.module('di.einvoicing.ui.portal', [
		'ngAnimate',
		'ui.router',
        'pascalprecht.translate',
        'LocalStorageModule',
		'valdr',
		'ngSanitize',
		'ngFileUpload',
        'ngIdle',
        'angularModalService',
        'angular-clipboard'
	]);

	configLoader(module);
	runLoader(module);
	portalLoader(module);
	diCoreAngularLoader(module);

	return module;
});
