"use strict";
var core_1 = require('ng-metadata/core');
var index_1 = require('./index');
function load(module) {
    module.directive.apply(module, core_1.provide(index_1.ContactListComponent));
}
exports.load = load;
