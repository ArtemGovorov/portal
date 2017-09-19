//{CODE:CGU0C}
// di.core.global.utility
define([
    './util'
], function (util) {
    'use strict';

    window.$di.utility.compatability = {
        transitionEndEvent: getTransitionEndEvent()
    };

    return window.$di.utility.compatability;

    function getTransitionEndEvent() {
        var transitionEndNames = {
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'msTransition': 'MSTransitionEnd',
            'transition': 'transitionend'
        };

        if (util.isDefined(window.Modernizr)) {
            return transitionEndNames[window.Modernizr.prefixed('transition')];
        } else {
            return undefined;
        }
    }
});