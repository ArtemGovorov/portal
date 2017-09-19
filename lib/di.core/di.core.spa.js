//{CODE:CAU0L}
// di.core
define([
	'./spa/_loader'
], function (
	spaLoader) {
    'use strict';

    return function (module) {
        spaLoader(module);
    };
});