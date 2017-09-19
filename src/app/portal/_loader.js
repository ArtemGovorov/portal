define([
	'./parties/_loader'
], function (
	partiesLoader) {
	'use strict';

	return function (module) {
		partiesLoader(module);
	};
});
