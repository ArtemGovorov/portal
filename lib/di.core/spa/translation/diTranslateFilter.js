//{CODE:CAT0B}
// di.core.angular.translation
define(function () {
    'use strict';

    return function (module) {
        module.filter('diTranslate', diTranslate);

        diTranslate.$inject = ['translator'];

        function diTranslate(translator) {
            return function (input) {
                return translator.instantTranslate(input);
            };
        }

        return diTranslate;
    };
});