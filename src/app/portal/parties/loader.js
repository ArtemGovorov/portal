"use strict";
var party_component_1 = require('./party.component');
var add_party_component_1 = require('./add-party.component');
var core_1 = require('ng-metadata/core');
function load(module) {
    module.directive.apply(module, core_1.provide(add_party_component_1.AddPartyComponent));
    module.directive.apply(module, core_1.provide(party_component_1.PartyComponent));
}
exports.load = load;
