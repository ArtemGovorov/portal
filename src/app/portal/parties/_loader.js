define(['./contacts/_loader'],
	function (contactsLoader) {
		'use strict';

		return function (module) {
			contactsLoader.load(module);
		};
	});