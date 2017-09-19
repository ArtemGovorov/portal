//{CODE:CAT0A}
// di.core.angular.translation
define([
	'./diTranslateDirective',
	'./diTranslateFilter',
    './diTranslateLink',
	'./translator',
], function (
	diTranslateDirectiveLoader,
	diTranslateFilterLoader,
    diTranslateLink,
	translatorLoader) {
    'use strict';

    return function (module) {
        diTranslateDirectiveLoader(module);
        diTranslateFilterLoader(module);
        diTranslateLink(module);
        translatorLoader(module);
    };
});