declare var $di: any;
declare var _: any;

let util = $di.utility.util;

import { Component, Inject, Input, Output, EventEmitter, OnChanges } from 'ng-metadata/core';

@Component({
    selector: 'diContactList',
    templateUrl: './contact-list.component.html'
})
export class ContactListComponent implements OnChanges {
    @Input() boundToObject;
    @Input() tableOptions;
    @Input() sortOptions;
    @Input() readonly;
    @Input() selectedSortItem;

    @Output() onSortByChanged = new EventEmitter<any>();
    @Output() addNew = new EventEmitter<any>();
    @Output() update = new EventEmitter<any>();
    @Output() remove = new EventEmitter<any>();
    @Output() reloadData = new EventEmitter<void>();
    
    public parties;
    public contacts;
    public sortBy;
    public selectedContact;
    public changed;

    constructor(
        @Inject('modalWindow') private modalWindow: any,
        @Inject('translator') private translator: any,
        @Inject('$stateParams') private stateParams: any
    ) {
        this.viewContact = this.viewContact.bind(this);
        this.sortByChanged = this.sortByChanged.bind(this);
    }

    ngOnChanges(changes) {
        if (changes.boundToObject && changes.boundToObject.currentValue) {
            this.translator.whenReady().then(() => {
                this.parties = changes.boundToObject.currentValue.parties;
                this.contacts = _.map(changes.boundToObject.currentValue.items,
                    item => {
                        let contact = _.extend({}, item);

                        contact.classification = this.getClasification(contact.isGlobal);
                        contact.type = this.getType(contact.party);
                        return contact;
                    });
            });
        }

        if (changes.sortOptions && changes.sortOptions.currentValue) {
            if (this.stateParams.contactSortOption) {
                this.sortBy = _.find(changes.sortOptions.currentValue,
                    (sortBy) => {
                        return sortBy.value === this.stateParams.contactSortOption;
                    });
            }
        }
    }

    getDefaultSortOption() {
        return _.find(this.sortOptions,
            (option) => {
                return option.key === 'contactEmailAsc';
            });
    }

    getClasification(isGlobal) {
        if (isGlobal) {
            return this.translator.instantTranslate('EINVOICING.PORTAL.PARTIES.CONTACTS.LIST.TABLE.PUBLIC');
        } else {
            return this.translator.instantTranslate('EINVOICING.PORTAL.PARTIES.CONTACTS.LIST.TABLE.PRIVATE');
        }
    }

    getType(party) {
        if (party.isAccountingCustomer) {
            return this.translator.instantTranslate('EINVOICING.PORTAL.PARTIES.CONTACTS.LIST.TABLE.FINANCIAL');
        } else {
            return this.translator.instantTranslate('EINVOICING.PORTAL.PARTIES.CONTACTS.LIST.TABLE.ORGANISATION');
        }
    }

    sortByChanged(value) {
        if (this.sortBy && this.sortBy.value === value) {
            return;
        }

        this.tableOptions.paginationPageNumber = 1;
        this.onSortByChanged.emit(value);
    }

    viewContact(obj) {
        let model = _.extend({}, obj);

        let typeOptions = [];

        if (model.party.isAccountingCustomer) {
            model.party.name = 'Financial';
            typeOptions.push(model.party);
        } else {
            model.party.name = 'Organisation';
            typeOptions.push(model.party);
        }

        model.allowedTypes = typeOptions;

        const options = {
            dataModel: model,
			controller: "ResourceController",
            //templateUrl: 'src/app/portal/parties/contacts/contact.component.html',
            onDataChanged: this.contactChanged,
            title: obj.isEditable ? 'Edit contact' : 'View contact',
            promptOnCancel: true
        };

        this.showPopup(options);
    }

    addContact() {
        this.selectedContact = {
            isUpdatable: true
        }

        let typeOptions = [];

        let financialAdded = false;

        _.each(this.parties,
            (item) => {
                if (item.isAccountingCustomer) {
                    if (financialAdded === false) {
                        item.name = 'Financial';
                        typeOptions.push(item);

                        financialAdded = true;
                    }
                } else {
                    item.name = 'Organisation';
                    typeOptions.push(item);
                }
            });

        this.selectedContact.partyId = typeOptions[0].id;

        const options = {
            dataModel: {
                isNew: true,
                isEditable: true,
                resource: this.selectedContact,
                party: typeOptions[0],
                allowedTypes: typeOptions
            },
			controller: "ResourceController",
            //templateUrl: 'src/app/portal/parties/contacts/contact.component.html',
            onDataChanged: this.contactChanged,
            title: 'Add contact',
            promptOnCancel: true
        };

        this.showPopup(options);
    }

    contactChanged() {
        this.changed = true;
    }

    showPopup(options) {
        this.modalWindow.show(options,
            (result) => {
                this.contactSaved(result);
            },
            () => {
                if (this.changed && this.reloadData) {
                    this.reloadData.emit(null);
                }
            },
            (result) => {
                this.contactDeleted(result);
            });
    }

    contactSaved(contact) {
        const resource = contact.resource;

        const existing = _.find(this.contacts,
            (item) => {
                return item.resource.id === resource.id;

            });

        if (util.isUndefined(existing) === false) {
            if (this.update) {
                this.update.emit(resource);
            }

        } else {
            if (this.addNew) {
                this.addNew.emit(resource);
            }
        }
    }

    contactDeleted(contact) {
        const resource = contact.resource;

        if (this.remove) {
            this.remove.emit(resource);
        }
    }
}
