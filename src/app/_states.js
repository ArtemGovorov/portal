//{CODE:EUP2D}
// di.einvoicing.ui.portal
define(function () {
    'use strict';

    return function (module) {
        module.config(configureAppStates);

        configureAppStates.$inject = ['stateHelperProvider', '$urlRouterProvider'];
        function configureAppStates(stateHelperProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise(function($injector) {
            	var authenticationData = $injector.get('authenticationData');

                if (authenticationData.userData.isAuthenticated === true) {
                    return 'portal/dashboard';
                } else {
                    return 'welcome';
                }
            });

            stateHelperProvider.addStates({
                templateBaseUrl: "src/app/_states",
                states: [
                    {
                    	stateName: "portal",
						isAbstract: true,
                        rights: [ "User" ],
                        data: {
                            header: { title: "EINVOICING.PORTAL.HEADER.MESSAGE" },
                        }
                    },
                    {
                        stateName: "welcome",
                        url: 'welcome?{username}&{password}',
                        params: {
                            reason: undefined,
                            username: undefined,
                            password: undefined
                        },
                    	onlyCreateStateCollection: false,
                    	stateCollection:
						[
							{
								stateName: "resetPassword",
								url: 'welcome/{resetToken}',
								params: {
								    resetToken: ''
								}
							}
						]
                    },
                    {
                        stateName: "impersonate",
                        url: 'impersonate?{username}&{password}',
                        params: {
                            username: undefined,
                            password: undefined
                        }
                    }
                ]
            });

        }
    };
});