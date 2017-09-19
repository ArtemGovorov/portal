"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var util = $di.utility.util;
var core_1 = require('ng-metadata/core');
var ContactListComponent = (function () {
    function ContactListComponent(modalWindow, translator, stateParams) {
        this.modalWindow = modalWindow;
        this.translator = translator;
        this.stateParams = stateParams;
        this.onSortByChanged = new core_1.EventEmitter();
        this.addNew = new core_1.EventEmitter();
        this.update = new core_1.EventEmitter();
        this.remove = new core_1.EventEmitter();
        this.reloadData = new core_1.EventEmitter();
        this.viewContact = this.viewContact.bind(this);
        this.sortByChanged = this.sortByChanged.bind(this);
    }
    ContactListComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes.boundToObject && changes.boundToObject.currentValue) {
            this.translator.whenReady().then(function () {
                _this.parties = changes.boundToObject.currentValue.parties;
                _this.contacts = _.map(changes.boundToObject.currentValue.items, function (item) {
                    var contact = _.extend({}, item);
                    contact.classification = _this.getClasification(contact.isGlobal);
                    contact.type = _this.getType(contact.party);
                    return contact;
                });
            });
        }
        if (changes.sortOptions && changes.sortOptions.currentValue) {
            if (this.stateParams.contactSortOption) {
                this.sortBy = _.find(changes.sortOptions.currentValue, function (sortBy) {
                    return sortBy.value === _this.stateParams.contactSortOption;
                });
            }
        }
    };
    ContactListComponent.prototype.getDefaultSortOption = function () {
        return _.find(this.sortOptions, function (option) {
            return option.key === 'contactEmailAsc';
        });
    };
    ContactListComponent.prototype.getClasification = function (isGlobal) {
        if (isGlobal) {
            return this.translator.instantTranslate('EINVOICING.PORTAL.PARTIES.CONTACTS.LIST.TABLE.PUBLIC');
        }
        else {
            return this.translator.instantTranslate('EINVOICING.PORTAL.PARTIES.CONTACTS.LIST.TABLE.PRIVATE');
        }
    };
    ContactListComponent.prototype.getType = function (party) {
        if (party.isAccountingCustomer) {
            return this.translator.instantTranslate('EINVOICING.PORTAL.PARTIES.CONTACTS.LIST.TABLE.FINANCIAL');
        }
        else {
            return this.translator.instantTranslate('EINVOICING.PORTAL.PARTIES.CONTACTS.LIST.TABLE.ORGANISATION');
        }
    };
    ContactListComponent.prototype.sortByChanged = function (value) {
        if (this.sortBy && this.sortBy.value === value) {
            return;
        }
        this.tableOptions.paginationPageNumber = 1;
        this.onSortByChanged.emit(value);
    };
    ContactListComponent.prototype.viewContact = function (obj) {
        var model = _.extend({}, obj);
        var typeOptions = [];
        if (model.party.isAccountingCustomer) {
            model.party.name = 'Financial';
            typeOptions.push(model.party);
        }
        else {
            model.party.name = 'Organisation';
            typeOptions.push(model.party);
        }
        model.allowedTypes = typeOptions;
        var options = {
            dataModel: model,
            controller: "ResourceController",
            templateUrl: 'src/app/portal/parties/contacts/contact.component.html',
            onDataChanged: this.contactChanged,
            title: obj.isEditable ? 'Edit contact' : 'View contact',
            promptOnCancel: true
        };
        this.showPopup(options);
    };
    ContactListComponent.prototype.addContact = function () {
        this.selectedContact = {
            isUpdatable: true
        };
        var typeOptions = [];
        var financialAdded = false;
        _.each(this.parties, function (item) {
            if (item.isAccountingCustomer) {
                if (financialAdded === false) {
                    item.name = 'Financial';
                    typeOptions.push(item);
                    financialAdded = true;
                }
            }
            else {
                item.name = 'Organisation';
                typeOptions.push(item);
            }
        });
        this.selectedContact.partyId = typeOptions[0].id;
        var options = {
            dataModel: {
                isNew: true,
                isEditable: true,
                resource: this.selectedContact,
                party: typeOptions[0],
                allowedTypes: typeOptions
            },
            controller: "ResourceController",
            templateUrl: 'src/app/portal/parties/contacts/contact.component.html',
            onDataChanged: this.contactChanged,
            title: 'Add contact',
            promptOnCancel: true
        };
        this.showPopup(options);
    };
    ContactListComponent.prototype.contactChanged = function () {
        this.changed = true;
    };
    ContactListComponent.prototype.showPopup = function (options) {
        var _this = this;
        this.modalWindow.show(options, function (result) {
            _this.contactSaved(result);
        }, function () {
            if (_this.changed && _this.reloadData) {
                _this.reloadData.emit(null);
            }
        }, function (result) {
            _this.contactDeleted(result);
        });
    };
    ContactListComponent.prototype.contactSaved = function (contact) {
        var resource = contact.resource;
        var existing = _.find(this.contacts, function (item) {
            return item.resource.id === resource.id;
        });
        if (util.isUndefined(existing) === false) {
            if (this.update) {
                this.update.emit(resource);
            }
        }
        else {
            if (this.addNew) {
                this.addNew.emit(resource);
            }
        }
    };
    ContactListComponent.prototype.contactDeleted = function (contact) {
        var resource = contact.resource;
        if (this.remove) {
            this.remove.emit(resource);
        }
    };
    __decorate([
        core_1.Input()
    ], ContactListComponent.prototype, "boundToObject", void 0);
    __decorate([
        core_1.Input()
    ], ContactListComponent.prototype, "tableOptions", void 0);
    __decorate([
        core_1.Input()
    ], ContactListComponent.prototype, "sortOptions", void 0);
    __decorate([
        core_1.Input()
    ], ContactListComponent.prototype, "readonly", void 0);
    __decorate([
        core_1.Input()
    ], ContactListComponent.prototype, "selectedSortItem", void 0);
    __decorate([
        core_1.Output()
    ], ContactListComponent.prototype, "onSortByChanged", void 0);
    __decorate([
        core_1.Output()
    ], ContactListComponent.prototype, "addNew", void 0);
    __decorate([
        core_1.Output()
    ], ContactListComponent.prototype, "update", void 0);
    __decorate([
        core_1.Output()
    ], ContactListComponent.prototype, "remove", void 0);
    __decorate([
        core_1.Output()
    ], ContactListComponent.prototype, "reloadData", void 0);
    ContactListComponent = __decorate([
        core_1.Component({
            selector: 'diContactList',
            templateUrl: './contact-list.component.html'
        }),
        __param(0, core_1.Inject('modalWindow')),
        __param(1, core_1.Inject('translator')),
        __param(2, core_1.Inject('$stateParams'))
    ], ContactListComponent);
    return ContactListComponent;
}());
exports.ContactListComponent = ContactListComponent;
