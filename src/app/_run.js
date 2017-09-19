//{CODE:EUP2E}
// di.einvoicing.ui.portal.core
define(function () {
	'use strict';

	return function (module) {
		module.run(configureInitialLanguage);
		module.run(stateChangeStartEventHandler);
		module.run(initLoginLogoutEventHandler);
		module.run(applyValidationRules);
		module.run(readAuthenticationStore);

		configureInitialLanguage.$inject = ['languageHandler'];
		function configureInitialLanguage(languageHandler) {
			languageHandler.applyLanguage();
		}

		stateChangeStartEventHandler.$inject = ['$rootScope', 'headerData', 'stateAuthenticator', 'forceUrlReloader'];
		function stateChangeStartEventHandler($rootScope, headerData, stateAuthenticator, forceUrlReloader) {
		    $rootScope.stateChangeCounter =
		    {
		        forceRefresh: false,
		        stateChangeCount: 0
		    }

		    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

		        forceUrlReloader.process($rootScope, toState, toParams, fromState, fromParams);

		        var authorized = stateAuthenticator.authenticateState(toState);

		        if (!authorized) {
		            $rootScope.toState = toState;
		            $rootScope.toParams = toParams;
		            event.preventDefault();
		            return;
		        } else {
		            $rootScope.toState = null;
		            $rootScope.toParams = null;
		        }

				if (toState.data && toState.data.header) {
					headerData.set(toState.data.header);
				}
			});
		}

		initLoginLogoutEventHandler.$inject = ['authenticationClientEventHandler'];
		function initLoginLogoutEventHandler(authenticationClientEventHandler) {
			authenticationClientEventHandler.init();
		}

		applyValidationRules.$inject = ['validationInitialiser', 'validationRulesStore'];
		function applyValidationRules(validationInitialiser, validationRulesStore) {
			var validationRules = validationRulesStore.getValidationRules();
			
			if (validationRules) {
				validationInitialiser.applyValidationRules(validationRules);
			}
		}

		readAuthenticationStore.$inject = ['authenticationStore'];
		function readAuthenticationStore(authenticationStore) {
		    authenticationStore.getAuthenticationData();
		}
	};
});


