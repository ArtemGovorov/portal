//{CODE:CGA01}
// di.core.global.angular
define(function () {
    'use strict';

    /** angular helper */
    window.$di.angular.snippetRegistrar = {
        registerSnippet: registerSnippet,
        createContext: createContext
    };

    return window.$di.angular.snippetRegistrar;

    function registerSnippet(module, directiveName, templateUrl, controller, controllerAs) {
        module.directive(directiveName, directive);

        function directive() {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: templateUrl,
                controller: controller,
                controllerAs: controllerAs
            };
        }
    }

    function createContext(module, templateBaseUrl) {
        return {
            registerSnippet: registerSnippetInContext
        };

        function registerSnippetInContext(directiveName, templateName, controller, controllerAs) {
            var templateUrl = templateBaseUrl + '/' + templateName;

            registerSnippet(module, directiveName, templateUrl, controller, controllerAs);
        }
    }
});