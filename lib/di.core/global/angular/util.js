//{CODE:CGA04}
// di.core.global.angular
define([
    '../utility/util'
], function (util) {
    'use strict';

    window.$di.angular.util = {
        $watch: $watch,
        $watchCollection: $watchCollection
    };

    return window.$di.angular.util;

    /**
     * Watch function that only invokes the callback if the new value is a
     * non-empty object and is not equal to the optional ignore object
     */
    function $watch(scope, objFunction, callback, ignoreObj) {
        return scope.$watch(objFunction, function (newValue) {
            if (util.isRealObject(newValue) && (newValue !== (ignoreObj || {}))) {
                callback(newValue);
            }
        });
    }

    function $watchCollection(scope, object, listener) {
        return scope.$watchCollection(object, function (newValue) {
            if (util.isArray(newValue) && newValue.length > 0) {
                listener(newValue);
            }
        });
    }
});