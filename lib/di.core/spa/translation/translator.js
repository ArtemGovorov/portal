//{CODE:CAT08}
// di.core.angular.translation
define(function () {
    'use strict';

    return function (module) {
        var guard = $di.exception.guard;
        var util = $di.utility.util;
        var debug = $di.debug.debugger.newLogger("translator");

        module.factory('translator', translator);

        translator.$inject = ['$rootScope', '$translate', '$q'];

        function translator($rootScope, $translate, $q) {
            var deregisterTranslateChangeStart = $rootScope.$on('$translateChangeStart', translationChanged);
            var deregisterTranslateRefreshStart = $rootScope.$on('$translateRefreshStart', translationChanged);
            var deregisterTranslateChangeSuccess = $rootScope.$on('$translateChangeSuccess', translationLoaded);

            var translationIsLoaded = false;
            var requests = [];

            tearDown();

            return {
                whenReady : whenReady,
                translate: translate,
                instantTranslate: instantTranslate,
                changeLanguage: changeLanguage,
                getCurrentLanguage: getCurrentLanguage
            };

            /**
           *  Destroy all state, any event listeners and subscriptions
           */
            function tearDown() {
                $rootScope.$on('$destroy', function () {
                    deregisterTranslateChangeStart();
                    deregisterTranslateRefreshStart();
                    deregisterTranslateChangeSuccess();
                });
            }

            function whenReady() {
                if (translationIsLoaded) {
                    return $q.when();
                }

                var request = {
                    defferal: $q.defer()
                };

                requests.push(request);

                return request.defferal.promise;
            }

            /**
			 * Translate a given string while replacing any placeholders in the string with the provided arguments.
			 * @param stringToTranslate
			 * @param translationArguments
			 */
            function translate(stringToTranslate, translationArguments) {
                if (translationIsLoaded) {
                    return $q.when(instantTranslate(stringToTranslate, translationArguments));
                }
                
                var request = {
                    stringToTranslate: stringToTranslate,
                    translationArguments: translationArguments,
                    defferal: $q.defer()
                };
                
                requests.push(request);
                return request.defferal.promise;
            }
            
            function translateMappedArguments(args) {
                return _.each(args, function (value, key) {
                    return args[key] = util.isString(value) ? $translate.instant(value) : value;
                });
            }

            function translationChanged() {
                translationIsLoaded = false;
            }

            function translationLoaded() {
                translationIsLoaded = true;               
                _.each(requests, function (request) {
                    if (util.isDefined(request.stringToTranslate)) {
                        var translated = instantTranslate(request.stringToTranslate, request.translationArguments)
                        request.defferal.resolve(translated);
                    } else {
                        request.defferal.resolve();
                    }
                    
                })

                requests = [];
            }

            function instantTranslate(stringToTranslate, translationArguments) {                
                var translated = $translate.instant(stringToTranslate);
                var args;

                if (translationArguments) {
                    if (util.isObject(translationArguments)) {
                        args = translationArguments;
                    } else {
                        args = $di.utility.placeholders.arguments.split(translationArguments);
                    }

                    translated = $di.utility.placeholders.replace(translated, args, translateMappedArguments);
                }

                return translated;
            }

            /**
             * Changes the language resource file used throughout the application.
             * @param prefix
             */
            function changeLanguage(prefix) {
                guard.throwIfNullOrUndefined("CAT0807E", prefix, "prefix");

                $translate.use(prefix);
            }

            /**
             * Gets the ISO code of the current language being used throughout the application.
             */
            function getCurrentLanguage() {
                return $translate.use();
            }
        }
    };
});