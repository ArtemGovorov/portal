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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('ng-metadata/core');
var modal_base_controller_1 = require('../../../../lib/di.core/spa/controls/modal/modal-base.controller');
var AddPartyComponentController = (function (_super) {
    __extends(AddPartyComponentController, _super);
    function AddPartyComponentController($element, promptWindow, options, close) {
        _super.call(this, $element, promptWindow, options, close);
        this.partyId = options.partyId;
        this.saveButtonText = options.saveButtonText;
        this.title = options.modalTitle;
    }
    AddPartyComponentController.prototype.tradingPartyIdChanged = function (tradingPartyId) {
        this.model = tradingPartyId;
    };
    AddPartyComponentController = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject('$element')),
        __param(1, core_1.Inject('promptWindow')),
        __param(2, core_1.Inject('options')),
        __param(3, core_1.Inject('close'))
    ], AddPartyComponentController);
    return AddPartyComponentController;
}(modal_base_controller_1.ModalControllerBase));
exports.AddPartyComponentController = AddPartyComponentController;
AddPartyComponentController.prototype.constructor.$inject = ['$element', 'promptWindow', 'options', 'close'];
