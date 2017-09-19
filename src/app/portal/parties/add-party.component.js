"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('ng-metadata/core');
var add_party_component_controller_1 = require('./add-party.component.controller');
var AddPartyComponent = (function (_super) {
    __extends(AddPartyComponent, _super);
    function AddPartyComponent() {
        _super.apply(this, arguments);
    }
    AddPartyComponent = __decorate([
        core_1.Component({
            selector: 'diAddParty',
            templateUrl: 'src/app/portal/parties/add-party.component.html'
        })
    ], AddPartyComponent);
    return AddPartyComponent;
}(add_party_component_controller_1.AddPartyComponentController));
exports.AddPartyComponent = AddPartyComponent;
