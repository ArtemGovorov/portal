//{CODE:EUP04}
// di.einvoicing.ui.portal
define([
    'require',
    'angular',
    // Non-angular libraries
    'moment',
    'jquery',
    'bootstrap',
    'underscore',
    'notify',
    'pikaday',
    '../../lib/di.core/di.core.global'
], function (r, ng, moment) {
    'use strict';

    //Valdr references moment globally so need to add it to the global window
    window.moment = window.moment || moment;

    //Set the locale for moment
    if (navigator.language) {
        window.moment.locale(navigator.language);
    } else if (navigator.languages) {
        window.moment.locale(navigator.languages);
    }
    else if (navigator.userLanguage) {
        window.moment.locale(navigator.userLanguage);
    }
    
    r([
        'domReady',
        'appModule'
    ], function (document, module) {
        ng.bootstrap(document, [module.name], {
            strictDi: true
        });
    });
});
