//{CODE:CAT06}
// di.core.angular.translation
define(function () {
    'use strict';

    return function (module) {
        module.directive('diTranslate', diTranslate);

        diTranslate.$inject = ['diTranslateLink'];

        function diTranslate(translateLink) {
            return {
                restrict: 'A',
                link: link
            };

            /**
             * Translates the value given to the directive along with replacing the arguments appropriately.
             */
            function link(scope, element, attrs) {
                translateLink.link(scope, element, attrs);
            }
        }

        return diTranslate;
    };
});