//{CODE:EUP0B}
// di.einvoicing.ui.portal.core

define(['./config'], function (configModule) {
    'use strict';

    var config = configModule.config;

    return function (module) {
        module.constant('PORTAL_CONFIG', config);

        module.config(endpointsConfig);
        module.config(configureLocationProvider);
        module.config(httpConfig);
        module.config(loggerProxyConfig);
        module.config(exceptionHandlerConfig);
        module.config(notifierConfig);
        module.config(translationModuleConfig);
        module.config(userAuthenticationProxyConfig);
        module.config(stateAuthenticatorConfig);
        module.config(authenticationClientEventSubscriberConfig);
        module.config(validationInitialiserConfig);
        module.config(configureValdrDateValidation);
        module.config(invoiceListConfiguratorConfig);
        module.config(auditListConfiguratorConfig);
        module.config(purchaseOrderListConfiguratorConfig);
        module.config(purchaseOrderViewerLinesConfiguratorConfig);
        module.config(userSecurityProxyConfig);
        module.config(documentAttachmentConfiguratorConfig);
        module.config(relatedDocumentsConfiguratorConfig);
        module.config(grnListConfiguratorConfig);
        module.config(serviceStatusMonitorConfig);
        module.config(userIdleActivityMonitorConfig);
        module.config(forceUrlReloaderConfig);

        $di.debug.debugger.enabled = config.debuggerEnabled;

        endpointsConfig.$inject = ['endpointsProvider'];

        function endpointsConfig(endpointsProvider) {
            endpointsProvider.configure({
                endpoints: {
                    webApi: config.app.webApiAddress,
                    app: config.app.appUrl
                },
                defaultEndpoint: 'webApi'
            });
        }

        configureLocationProvider.$inject = ['$locationProvider'];

        function configureLocationProvider($locationProvider) {
            $locationProvider.html5Mode(true);
        }

        httpConfig.$inject = ['$httpProvider'];

        function httpConfig($httpProvider) {
            $httpProvider.defaults.useXDomain = true;

            $httpProvider.defaults.headers.common['Cache-Control'] = 'no-cache';
            $httpProvider.defaults.headers.common['Pragma'] = 'no-cache';
            $httpProvider.defaults.headers.common['ClientVersion'] = config.app.version;

            delete $httpProvider.defaults.headers.common['X-Requested-With'];
        }

        loggerProxyConfig.$inject = ['loggerProxyProvider'];

        function loggerProxyConfig(loggerProxyProvider) {
            loggerProxyProvider.configure({
                endpoint: 'webApi',
                url: 'log',
                logInfoToServer: true,
                logWarningToServer: true,
                logErrorToServer: true
            });
        }

        exceptionHandlerConfig.$inject = ['exceptionHandlerProvider'];

        function exceptionHandlerConfig(exceptionHandlerProvider) {
            exceptionHandlerProvider.configure({
                appErrorPrefix: '[EInvoicing] ',
                appTitle: 'Di.EInvoicing.Ui.Portal',
                version: '1.1.0',
                notify: true
            });
        }

        notifierConfig.$inject = ['notifierProvider'];

        function notifierConfig(notifierProvider) {
            notifierProvider.configure({
                "closeButton": true,
                successTimeOut: 5000,
                infoTimeOut: 5000,
                warningTimeOut: 10000,
                errorTimeOut: 0,
                positionClass: 'toast-top-center'
            });
        }

        translationModuleConfig.$inject = ['$translateProvider'];

        function translationModuleConfig($translateProvider) {
            $translateProvider.useStaticFilesLoader({
                prefix: './src/languages/',
                suffix: '.json'
            });
            $translateProvider.useSanitizeValueStrategy(null);
        }

        webApiHttpConfig.$inject = ['webApiHttpProvider'];

        function webApiHttpConfig(webApiHttpProvider) {
            webApiHttpProvider.configure({
                endpointName: 'webApi'
            });
        }

        userAuthenticationProxyConfig.$inject = ['userAuthenticationProxyProvider'];

        function userAuthenticationProxyConfig(userAuthenticationProxyProvider) {
            userAuthenticationProxyProvider.configure({
                endpoint: 'webApi',
                url: 'token',
                clientId: 'Di.EInvoicing.Ui.Portal'
            });
        }

        stateAuthenticatorConfig.$inject = ['stateAuthenticatorProvider'];

        function stateAuthenticatorConfig(stateAuthenticatorProvider) {
            stateAuthenticatorProvider.configure({
                securityEnabled: true,
                loginState: 'welcome'
            });
        }

        authenticationClientEventSubscriberConfig.$inject = ['authenticationClientEventSubscriberProvider'];

        function authenticationClientEventSubscriberConfig(authenticationClientEventHandlerProvider) {
            authenticationClientEventHandlerProvider.configure({
                unauthenticatedState: 'welcome',
                authenticatedState: 'portal.dashboard',
                changePasswordState: 'portal.account.management'
            });
        }

        validationInitialiserConfig.$inject = ['validationInitialiserProvider'];

        function validationInitialiserConfig(validationInitialiserProvider) {
            validationInitialiserProvider.addValidator('idValidator');
            validationInitialiserProvider.addValidator('positiveWholeNumberValidator');
            validationInitialiserProvider.addValidator('pastOrTodayValidator');
            validationInitialiserProvider.addValidator('greaterValidator');
            validationInitialiserProvider.addValidator('lessValidator');
            validationInitialiserProvider.addValidator('equalAlwaysValidator');
            validationInitialiserProvider.addValidator('equalIfSelfSetValidator');
            validationInitialiserProvider.addValidator('requiredIfPairSetValidator');
            validationInitialiserProvider.addValidator('requiredIfPairNotSetValidator');
            validationInitialiserProvider.addValidator('productCodeCustomValidator');
        }

        configureValdrDateValidation.$inject = ['$provide'];
        function configureValdrDateValidation($provide) {
            $provide.decorator('futureAndPastSharedValidator', futureAndPastSharedValidatorWithDiMoment);
        }

        futureAndPastSharedValidatorWithDiMoment.$inject = ['$delegate', 'diMoment'];
        function futureAndPastSharedValidatorWithDiMoment(delegate, diMoment) {
            return {
                validate: function (value, comparison) {
                    var valueAsDiMoment = diMoment(value);
                    return delegate.validate(valueAsDiMoment, comparison);
                }
            };
        }

        invoiceListConfiguratorConfig.$inject = ['invoiceListConfiguratorProvider'];

        function invoiceListConfiguratorConfig(invoiceListConfiguratorProvider) {

            var cfg = {
                data: [],
                columns: [],
                enableSelect: true,
                multiSelect: true,
                enablePaging: true,
                fixedHeight: true,
                maxItemsToShow: 500,
                paginationPageSizes: [5, 10, 15, 20, 25, 50],
                paginationPageSize: 10,
                paginationPageNumber: 1,
                maxButtonsShown: 3,
                pagination: {
                    seek: function () { }
                }
            }

            invoiceListConfiguratorProvider.configure(cfg);
        }

        purchaseOrderListConfiguratorConfig.$inject = ['purchaseOrderListConfiguratorProvider'];

        function purchaseOrderListConfiguratorConfig(purchaseOrderListConfiguratorProvider) {

            var cfg = {
                data: [],
                columns: [],
                enableSelect: true,
                multiSelect: true,
                enablePaging: true,
                fixedHeight: true,
                maxItemsToShow: 500,
                paginationPageSizes: [5, 10, 15, 20, 25, 50],
                paginationPageSize: 10,
                paginationPageNumber: 1,
                maxButtonsShown: 3,
                pagination: {
                    seek: function () { }
                }
            }

            purchaseOrderListConfiguratorProvider.configure(cfg);
        }

        auditListConfiguratorConfig.$inject = ['auditListConfiguratorProvider'];

        function auditListConfiguratorConfig(auditListConfiguratorProvider) {

            var cfg = {
                data: [],
                columns: [],
                enableSelect: true,
                multiSelect: false,
                enablePaging: true,
                fixedHeight: true,
                maxItemsToShow: 500,
                paginationPageSizes: [20, 25, 50],
                paginationPageSize: 20,
                paginationPageNumber: 1,
                maxButtonsShown: 3,
                pagination: {
                    seek: function () { }
                }
            }

            auditListConfiguratorProvider.configure(cfg);
        }


        purchaseOrderViewerLinesConfiguratorConfig.$inject = ['purchaseOrderViewerLinesConfiguratorProvider'];

        function purchaseOrderViewerLinesConfiguratorConfig(purchaseOrderViewerLinesConfiguratorProvider) {

            var cfg = {
                data: [],
                columns: [],
                enableSelect: false,
                multiSelect: false,
                enablePaging: false,
                fixedHeight: true,
                maxItemsToShow: 500
            }

            purchaseOrderViewerLinesConfiguratorProvider.configure(cfg);
        }

        userSecurityProxyConfig.$inject = ['userSecurityProxyProvider'];

        function userSecurityProxyConfig(userSecurityProxyProvider) {
            userSecurityProxyProvider.configure({
                endpoint: 'app',
                getSecurityQuestionUrl: 'UserSecurity/GetSecurityQuestion',
                requestPasswordResetUrl: 'UserSecurity/RequestPasswordResetEmail',
                changePasswordUrl: 'UserSecurity/ChangePassword',
                resetPasswordUrl: 'UserSecurity/ResetPassword',
                resetPasswordSiteUrl: '/welcome/',
                getUserUrl: 'UserSecurity/GetUser',
                getQuestionsUrl: 'UserSecurity/GetSecurityQuestions',
                setSecurityQuestionUrl: 'UserSecurity/SetSecurityQuestion',
                requestPasswordResetUrlOnUserBehalf: 'UserSecurity/RequestPasswordResetEmailOnUserBehalf',
                setPasswordWithTokenUrl: 'UserSecurity/SetPasswordWithToken',
                setPasswordAndQuestionWithTokenUrl: 'UserSecurity/SetPasswordAndQuestionWithToken'
            });
        }

        documentAttachmentConfiguratorConfig.$inject = ['documentAttachmentConfiguratorProvider'];

        function documentAttachmentConfiguratorConfig(documentAttachmentConfigurationProvider) {
            documentAttachmentConfigurationProvider.configure({
                maximumAttachmentSize: '10MB',
                disallowedFileExtensions: ['ade', 'adp', 'app', 'asp', 'bas', 'bat', 'cer', 'chm', 'cmd', 'cnt', 'com', 'cpl', 'crt', 'csh', 'der', 'exe', 'fxp',
										'gadget', 'grp', 'hlp', 'hpj', 'hta', 'inf', 'ins', 'isp', 'its', 'jar', 'jnlp', 'js', 'jse', 'ksh', 'lnk', 'mad',
										'maf', 'mag', 'mam', 'maq', 'mar', 'mas', 'mat', 'mau', 'mav', 'maw', 'mcf', 'mda', 'mdb', 'mde', 'mdt', 'mdw', 'mdz',
										'msc', 'msh', 'msh1', 'msh2', 'mshxml', 'msh1xml', 'msh2xml', 'msi', 'msp', 'mst', 'ops', 'osd', 'pcd', 'pif', 'pl',
										'plg', 'prf', 'prg', 'ps1', 'ps1xml', 'ps2', 'ps2xml', 'psc1', 'psc2', 'pst', 'reg', 'scf', 'scr', 'sct', 'shb', 'shs',
										'tmp', 'url', 'vb', 'vbe', 'vbp', 'vbs', 'vsmacros', 'vsw', 'ws', 'wsc', 'wsf', 'wsh', 'xbap', 'xll', 'xnk']
            });
        }

        relatedDocumentsConfiguratorConfig.$inject = ['relatedDocumentsConfiguratorProvider'];

        function relatedDocumentsConfiguratorConfig(relatedDocumentsConfiguratorProvider) {
            var cfg = {
                data: [],
                columns: [],
                enableSelect: true,
                multiSelect: false,
                enablePaging: true,
                fixedHeight: true,
                maxItemsToShow: 500,
                paginationPageSizes: [5, 10, 15, 20, 25, 50],
                paginationPageSize: 10,
                paginationPageNumber: 1,
                maxButtonsShown: 3,
                pagination: {
                    seek: function () { }
                }
            }

            relatedDocumentsConfiguratorProvider.configure(cfg);
        }

        grnListConfiguratorConfig.$inject = ['grnListConfiguratorProvider'];

        function grnListConfiguratorConfig(grnListConfiguratorProvider) {
            var cfg = {
                data: [],
                columns: [],
                enableSelect: true,
                multiSelect: false,
                enablePaging: true,
                fixedHeight: true,
                maxItemsToShow: 500,
                paginationPageSizes: [5, 10, 15, 20, 25, 50],
                paginationPageSize: 10,
                paginationPageNumber: 1,
                maxButtonsShown: 3,
                pagination: {
                    seek: function () { }
                }
            }

            grnListConfiguratorProvider.configure(cfg);
        }

        serviceStatusMonitorConfig.$inject = ['serviceStatusMonitorProvider'];

        function serviceStatusMonitorConfig(serviceStatusMonitorProvider) {
            var cfg = {
                pollingInterval: 600000
            }

            serviceStatusMonitorProvider.configure(cfg);
        }

        userIdleActivityMonitorConfig.$inject = ['userIdleActivityMonitorProvider', 'IdleProvider'];

        function userIdleActivityMonitorConfig(userIdleActivityMonitorProvider, idleProvider) {
            var cfg = {
                timeout: Number(config.app.sessionTimeout),
                idle: Number(config.app.sessionIdle),
                pageTitle: 'Data Interchange | Digital Invoice'
            }

            userIdleActivityMonitorProvider.configure(cfg, idleProvider);
        }

        forceUrlReloaderConfig.$inject = ['forceUrlReloaderProvider'];

        function forceUrlReloaderConfig(forceUrlReloaderProvider) {
            forceUrlReloaderProvider.configure({
                enableForceUrlReload: config.app.enableForceUrlReload,
                forceUrlReloadLimit: Number(config.app.forceUrlReloadLimit),
                stateNames: config.app.forceUrlStateNames
            });
        }
    };
});
