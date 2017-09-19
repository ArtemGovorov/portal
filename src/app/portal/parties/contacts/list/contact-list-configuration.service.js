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
var resource_list_configuration_base_service_1 = require('../../shared/resource-list-configuration-base.service');
var ContactListConfigurationService = (function (_super) {
    __extends(ContactListConfigurationService, _super);
    function ContactListConfigurationService() {
        _super.call(this);
        this._sortOptions = [
            {
                value: 7,
                key: "contactTypeAsc",
                label: "EINVOICING.PORTAL.PARTIES.CONTACTS.LIST.TABLE.SORT_OPTIONS.CONTACT_TYPE_ASC"
            },
            {
                value: 8,
                key: "contactTypeDesc",
                label: "EINVOICING.PORTAL.PARTIES.CONTACTS.LIST.TABLE.SORT_OPTIONS.CONTACT_TYPE_DESC"
            },
            {
                value: 3,
                key: "contactNameAsc",
                label: "EINVOICING.PORTAL.PARTIES.CONTACTS.LIST.TABLE.SORT_OPTIONS.CONTACT_NAME_ASC"
            },
            {
                value: 4,
                key: "contactNameDesc",
                label: "EINVOICING.PORTAL.PARTIES.CONTACTS.LIST.TABLE.SORT_OPTIONS.CONTACT_NAME_DESC"
            },
            {
                value: 1,
                key: "contactEmailAsc",
                label: "EINVOICING.PORTAL.PARTIES.CONTACTS.LIST.TABLE.SORT_OPTIONS.CONTACT_EMAIL_ASC"
            },
            {
                value: 2,
                key: "contactEmailDesc",
                label: "EINVOICING.PORTAL.PARTIES.CONTACTS.LIST.TABLE.SORT_OPTIONS.CONTACT_EMAIL_DESC"
            },
            {
                value: 5,
                key: "contactTelephoneAsc",
                label: "EINVOICING.PORTAL.PARTIES.CONTACTS.LIST.TABLE.SORT_OPTIONS.CONTACT_TELEPHONE_ASC"
            },
            {
                value: 6,
                key: "contactTelephoneDesc",
                label: "EINVOICING.PORTAL.PARTIES.CONTACTS.LIST.TABLE.SORT_OPTIONS.CONTACT_TELEPHONE_DESC"
            },
            {
                value: 9,
                key: "contactClassificationAsc",
                label: "EINVOICING.PORTAL.PARTIES.CONTACTS.LIST.TABLE.SORT_OPTIONS.CONTACT_CLASSIFICATION_ASC"
            },
            {
                value: 10,
                key: "contactClassificationDesc",
                label: "EINVOICING.PORTAL.PARTIES.CONTACTS.LIST.TABLE.SORT_OPTIONS.CONTACT_CLASSIFICATION_DESC"
            }
        ];
        this._columns = [
            {
                field: 'type',
                nameLanguageKey: 'EINVOICING.PORTAL.PARTIES.CONTACTS.LIST.TABLE.CONTACT_TYPE',
                template: '<span>{{binding.type}}</span>'
            },
            {
                field: 'name',
                nameLanguageKey: 'EINVOICING.PORTAL.PARTIES.CONTACTS.LIST.TABLE.CONTACT_NAME',
                template: '<span>{{binding.resource.name}}</span>'
            },
            {
                field: 'email',
                nameLanguageKey: 'EINVOICING.PORTAL.PARTIES.CONTACTS.LIST.TABLE.CONTACT_EMAIL',
                template: '<span>{{binding.resource.email}}</span>'
            },
            {
                field: 'telephoneNumber',
                nameLanguageKey: 'EINVOICING.PORTAL.PARTIES.CONTACTS.LIST.TABLE.CONTACT_TELEPHONE_NUMBER',
                template: '<span>{{binding.resource.telephoneNumber}}</span>'
            },
            {
                field: 'classification',
                nameLanguageKey: 'EINVOICING.PORTAL.PARTIES.CONTACTS.LIST.TABLE.CONTACT_CLASSIFICATION',
                template: '<span>{{binding.classification}}</span>'
            }
        ];
        this._actionColumns = [{
                field: 'actionButtons',
                template: '<di-button ng-if="controller.readonly || !binding.isEditable" image="view" image-colour="button" action="controller.viewContact(binding)"></di-button>\
                       <di-button ng-if="!controller.readonly && binding.isEditable" image="edit" image-colour="button" action="controller.viewContact(binding)"></di-button>',
                cellClass: 'cell-right'
            }];
    }
    ContactListConfigurationService.prototype.getSortOptions = function () {
        return Promise.resolve(this._sortOptions);
    };
    ContactListConfigurationService.prototype.getTableOptions = function () {
        var tableOptions = _super.prototype.tableOptions.call(this);
        tableOptions.columns = this._columns;
        tableOptions.actionColumns = this._actionColumns;
        return Promise.resolve(tableOptions);
    };
    ContactListConfigurationService = __decorate([
        core_1.Injectable()
    ], ContactListConfigurationService);
    return ContactListConfigurationService;
}(resource_list_configuration_base_service_1.ResourceListConfigurationServiceBase));
exports.ContactListConfigurationService = ContactListConfigurationService;
