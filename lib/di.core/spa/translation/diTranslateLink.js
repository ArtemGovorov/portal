//{CODE:CAT06}
// di.core.angular.translation
define(function () {
    'use strict';

    return function (module) {
        module.factory('diTranslateLink', diTranslateLink);

        diTranslateLink.$inject = ['translator'];

        function diTranslateLink(translator) {
            return {
                link: link
            };

            /**
             * Translates the value given to the directive along with replacing the arguments appropriately.
             */
            function link(scope, element, attrs) {
                var languageKey = attrs.diTranslate;
                var args = attrs.translateArguments;
                var targetProperty = attrs.targetProperty;

                if (languageKey === "") {
                    if (element[0].textContent) {
                        languageKey = element[0].textContent;
                    } else if (targetProperty) {
                        languageKey = attrs[targetProperty];
                    }
                }

                translator.translate(languageKey, args).then(function(translated) {
                    if (targetProperty) {
                        element[0][targetProperty] = translated;
                    } else {
                        if (element[0].nodeName === 'INPUT') {
                            element[0].value = translated;
                        } else {
                            element[0].textContent = translated;
                        }
                    }
                });

                

            }
        }

        return diTranslateLink;
    };
});