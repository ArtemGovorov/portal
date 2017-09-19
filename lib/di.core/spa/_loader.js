//{CODE:CAN01}
// di.core.angular
define([
	'./translation/_loader',
	'./controls/_loader'
], function (
	translationLoader,
	controlsLoader
) {
	'use strict';

	return function (module) {		
		translationLoader(module);
	    controlsLoader(module);
	};
});